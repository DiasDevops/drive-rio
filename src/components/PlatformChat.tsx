import React, { useState, useEffect, useRef } from 'react';
import { 
  INITIAL_CHAT_THREADS, 
  INITIAL_MESSAGES_STORE, 
  DRIVERS_DATA 
} from '../data/rioData';
import { ChatThread, Message } from '../types';
import { 
  Send, 
  ShieldCheck, 
  Paperclip, 
  Mic, 
  Bot, 
  UserCheck, 
  MapPin, 
  Sparkles, 
  Check, 
  CheckCheck, 
  Clock, 
  DollarSign, 
  PhoneCall, 
  Info,
  Car,
  AlertCircle
} from 'lucide-react';

interface PlatformChatProps {
  initialPartnerId?: string;
  initialPromoCode?: string;
}

export const PlatformChat: React.FC<PlatformChatProps> = ({ 
  initialPartnerId,
  initialPromoCode 
}) => {
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>(() => {
    if (initialPartnerId) {
      const found = INITIAL_CHAT_THREADS.find(t => t.partnerId === initialPartnerId);
      if (found) return found.id;
    }
    return 'chat-drv-01';
  });

  const [messagesStore, setMessagesStore] = useState<Record<string, Message[]>>(INITIAL_MESSAGES_STORE);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const currentMessages = messagesStore[activeThread.id] || [];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  // Handle promo code injection if passed
  useEffect(() => {
    if (initialPromoCode) {
      setInputMessage(`Olá! Gostaria de aplicar o cupom de desconto ${initialPromoCode} no meu próximo passeio.`);
    }
  }, [initialPromoCode]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsgId = `m-${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: Message = {
      id: userMsgId,
      chatId: activeThread.id,
      senderId: 'user-123',
      senderName: 'Você',
      senderRole: 'client',
      content: text,
      timestamp: nowTime
    };

    // Update state
    setMessagesStore(prev => ({
      ...prev,
      [activeThread.id]: [...(prev[activeThread.id] || []), newUserMsg]
    }));

    setInputMessage('');
    setIsTyping(true);

    // Update last message in thread
    setThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          lastMessage: text,
          lastMessageTime: nowTime
        };
      }
      return t;
    }));

    // Trigger AI or simulated driver reply
    if (activeThread.partnerId === 'ginga-ai') {
      try {
        const response = await fetch('/api/chat/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: text })
        });
        const data = await response.json();

        const aiReplyMsg: Message = {
          id: `m-ai-${Date.now()}`,
          chatId: activeThread.id,
          senderId: 'ginga-ai',
          senderName: 'Ginga AI Concierge',
          senderRole: 'ai_assistant',
          content: data.answer || 'Como posso te ajudar com o Rio de Janeiro hoje?',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessagesStore(prev => ({
          ...prev,
          [activeThread.id]: [...(prev[activeThread.id] || []), aiReplyMsg]
        }));
      } catch (err) {
        console.error('Error in Ginga AI Chat:', err);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Driver reply simulation via server
      try {
        const response = await fetch('/api/messages/reply-simulation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            driverName: activeThread.partnerName,
            messageText: text
          })
        });
        const data = await response.json();

        const driverReplyMsg: Message = {
          id: `m-drv-${Date.now()}`,
          chatId: activeThread.id,
          senderId: activeThread.partnerId,
          senderName: activeThread.partnerName,
          senderRole: 'driver',
          content: data.reply,
          timestamp: data.timestamp || nowTime
        };

        setMessagesStore(prev => ({
          ...prev,
          [activeThread.id]: [...(prev[activeThread.id] || []), driverReplyMsg]
        }));
      } catch (err) {
        console.error('Error in reply simulation:', err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleQuoteAction = (msgId: string, status: 'accepted' | 'declined') => {
    setMessagesStore(prev => {
      const threadMsgs = prev[activeThread.id] || [];
      const updated = threadMsgs.map(m => {
        if (m.id === msgId && m.quote) {
          return {
            ...m,
            quote: { ...m.quote, status }
          };
        }
        return m;
      });
      return { ...prev, [activeThread.id]: updated };
    });
  };

  return (
    <section className="py-12 bg-slate-950 text-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Central Oficial de Comunicação na Plataforma</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Mensagens Diretas & Negociação
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Toda a conversa entre cliente e prestador de serviço permanece 100% gravada e protegida para a sua segurança.
          </p>
        </div>

        {/* Chat Window Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* Sidebar Threads List */}
          <div className="lg:col-span-4 border-r border-slate-800 bg-slate-950 flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                Conversas Ativas ({threads.length})
              </span>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                ● Criptografado
              </span>
            </div>

            <div className="divide-y divide-slate-800/80 overflow-y-auto flex-1">
              {threads.map((thread) => {
                const isActive = thread.id === activeThread.id;
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                      isActive 
                        ? 'bg-slate-800/90 border-l-4 border-amber-500' 
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img 
                        src={thread.partnerAvatar} 
                        alt={thread.partnerName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      {thread.isVerified && (
                        <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full text-[9px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {thread.partnerName}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {thread.lastMessageTime}
                        </span>
                      </div>

                      <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
                        {thread.partnerRole}
                      </p>

                      <p className="text-xs text-slate-300 truncate mt-1">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Safety Reminder Banner */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-left text-[11px] text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Segurança Rio Express
              </span>
              <p className="text-slate-400 leading-tight">
                Nunca realize pagamentos fora da plataforma para garantir seu reembolso em caso de imprevistos.
              </p>
            </div>
          </div>

          {/* Main Chat Conversation Area */}
          <div className="lg:col-span-8 flex flex-col bg-slate-900">
            
            {/* Active Thread Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 text-left">
                <img 
                  src={activeThread.partnerAvatar} 
                  alt={activeThread.partnerName}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeThread.partnerName}
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Online na Plataforma
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeThread.partnerRole} • Atendimento Monitorado
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-amber-300 font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Protegido</span>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-left max-h-[460px]">
              
              {/* Platform Security Welcome Bubble */}
              <div className="bg-slate-950/80 border border-amber-500/20 p-3 rounded-xl text-center max-w-lg mx-auto text-xs text-slate-300 space-y-1">
                <span className="text-amber-400 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Canal Oficial da Plataforma
                </span>
                <p className="text-[11px] text-slate-400">
                  Combine itinerários, tire dúvidas de bagagem e aceite propostas de traslado com suporte 24h.
                </p>
              </div>

              {currentMessages.map((msg) => {
                const isUser = msg.senderRole === 'client';
                const isAi = msg.senderRole === 'ai_assistant';

                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 shadow-md space-y-2 ${
                      isUser
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                        : isAi
                          ? 'bg-slate-950 border border-amber-500/30 text-slate-100 rounded-tl-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-none'
                    }`}>
                      
                      <div className="flex items-center justify-between text-[11px] font-bold opacity-80 pb-1 border-b border-current/10">
                        <span className={isUser ? 'text-slate-950' : isAi ? 'text-amber-400' : 'text-amber-300'}>
                          {msg.senderName}
                        </span>
                        <span className="text-[10px]">{msg.timestamp}</span>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>

                      {/* Attached Quote Card if present */}
                      {msg.quote && (
                        <div className="mt-3 bg-slate-900 border border-amber-500/40 p-3.5 rounded-xl text-slate-100 text-xs space-y-2">
                          <div className="flex items-center justify-between font-bold text-amber-300">
                            <span>{msg.quote.serviceName}</span>
                            <span className="text-emerald-400 text-sm">R$ {msg.quote.amount},00</span>
                          </div>
                          <div className="text-[11px] text-slate-300">
                            Data/Horário: <strong>{msg.quote.date}</strong>
                          </div>

                          {msg.quote.status === 'pending' ? (
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => handleQuoteAction(msg.id, 'accepted')}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
                              >
                                Accept Proposal
                              </button>
                              <button
                                onClick={() => handleQuoteAction(msg.id, 'declined')}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1.5 px-3 rounded-lg text-xs"
                              >
                                Recusar
                              </button>
                            </div>
                          ) : (
                            <div className={`text-[11px] font-bold p-1.5 rounded text-center ${
                              msg.quote.status === 'accepted'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}>
                              {msg.quote.status === 'accepted' ? '✓ Proposta Aceita na Plataforma' : '✕ Proposta Recusada'}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-950 border border-slate-800 text-slate-400 text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Digitando resposta...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-slate-400 font-bold shrink-0">Sugestões:</span>
              {[
                'Quanto fica o traslado para o Cristo Redentor?',
                'Gostaria do desconto de 20% no passeio.',
                'Você pode me buscar no hotel na Zona Sul?',
                'Quais os horários recomendados para o Pão de Açúcar?'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Escreva sua mensagem ou solicite um orçamento..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  id="btn-send-message"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { FREQUENT_QUESTIONS } from '../data/rioData';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Headphones
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    passengers: 2,
    serviceType: 'City Tour Privativo',
    notes: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Headphones className="w-4 h-4" />
            <span>Atendimento & Suporte ao Turista 24h</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Entre em Contato com Nossa Equipe
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Estamos prontos para atender você antes, durante e após a sua viagem no Rio de Janeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Support Information & Emergency Hotline */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                Canais Oficiais de Suporte
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">Atendimento & WhatsApp 24h</span>
                    <strong className="text-white text-base">+55 (21) 98888-2026</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">E-mail para Atendimento e Dúvidas</span>
                    <strong className="text-white text-sm">suporte@rioexpresstravel.com.br</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs">Ponto de Apoio Receptivo</span>
                    <strong className="text-white text-xs">Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Numbers Card for Tourists */}
            <div className="bg-slate-950 border border-amber-500/30 p-6 rounded-2xl shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Telefones Úteis de Emergência do Rio (Turista)
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">DEAT (Del. Atendimento Turista)</span>
                  <strong className="text-amber-300">(21) 2332-2924</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Polícia Militar</span>
                  <strong className="text-amber-300">190</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SAMU (Ambulância)</span>
                  <strong className="text-amber-300">192</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Bombeiros</span>
                  <strong className="text-amber-300">193</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl text-left">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              Envie sua Mensagem ou Solicitação
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Preencha os dados abaixo e nossa central de receptivo entrará em contato em menos de 15 minutos.
            </p>

            {formSubmitted ? (
              <div className="bg-slate-900 border border-emerald-500 p-6 rounded-xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Solicitação Recebida com Sucesso!</h4>
                <p className="text-xs text-slate-300">
                  Seu número de protocolo é <strong className="text-amber-300">#RIO-{Math.floor(100000 + Math.random() * 900000)}</strong>. 
                  Um atendente ou motorista credenciado responderá via WhatsApp e e-mail.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      E-mail de Contato
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: joao@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp / Telefone com DDD
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (21) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Data da Viagem no Rio
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Como Podemos te Ajudar?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva quais passeios você deseja fazer (Cristo, Pão de Açúcar, Praias), se precisa de aeroporto, etc..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-contact"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Enviar Solicitação de Atendimento</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            Dúvidas Frequentes sobre Nossos Serviços no Rio
          </h3>

          <div className="space-y-3">
            {FREQUENT_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

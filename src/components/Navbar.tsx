import React, { useState } from 'react';
import { 
  Compass, 
  Car, 
  Tag, 
  MessageSquare, 
  PhoneCall, 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
  openChatWithPartner?: (partnerId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  unreadCount,
  openChatWithPartner
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'PT' | 'EN' | 'ES'>('PT');

  const navItems = [
    { id: 'home', label: 'Início', icon: Compass },
    { id: 'attractions', label: 'Pontos Turísticos', icon: Tag },
    { id: 'drivers', label: 'Motoristas Indicados', icon: Car },
    { id: 'discounts', label: 'Descontos & Cupons', icon: Sparkles },
    { id: 'chat', label: 'Central de Mensagens', icon: MessageSquare, badge: unreadCount },
    { id: 'contact', label: 'Contato & Suporte', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-center md:text-left">
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            <ShieldCheck className="w-4 h-4 shrink-0 text-slate-950" />
            <span>100% Seguro: Comunicação e Agendamento Protegidos pela Plataforma Rio Express</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Motoristas Cadastur
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cupons até 25% OFF
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
                  Rio Express
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                  Travel
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 font-medium">
                Cidade Maravilhosa VIP
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-slate-950 animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-1 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 ml-1.5 text-amber-400" />
              {(['PT', 'EN', 'ES'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-2 py-1 rounded font-bold transition-colors ${
                    currentLang === lang
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Quick Action Chat */}
            <button
              id="nav-quick-chat-btn"
              onClick={() => {
                if (openChatWithPartner) openChatWithPartner('drv-01');
                else handleNavClick('chat');
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Atendimento Direto</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-amber-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-slate-950">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Idioma do Aplicativo</span>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
              {(['PT', 'EN', 'ES'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-2.5 py-1 rounded font-bold ${
                    currentLang === lang ? 'bg-amber-500 text-slate-950' : 'text-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

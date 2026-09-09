import React, { useState } from 'react';
import { 
  HERO_DETAILS, 
  ATTRACTIONS_DATA, 
  DRIVERS_DATA 
} from '../data/rioData';
import { 
  Sparkles, 
  ShieldCheck, 
  Car, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Users, 
  ArrowRight,
  Star,
  CheckCircle,
  Tag,
  Headphones
} from 'lucide-react';

interface HeroHeaderProps {
  onNavigateTab: (tab: string) => void;
  onRequestBooking: (attractionId: string, driverId?: string) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ 
  onNavigateTab, 
  onRequestBooking 
}) => {
  const [selectedAttraction, setSelectedAttraction] = useState('cristo-redentor');
  const [selectedVehicleType, setSelectedVehicleType] = useState('SUV Premium');
  const [passengersCount, setPassengersCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestBooking(selectedAttraction);
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-4 pb-16 lg:pb-24">
      {/* Background Hero Banner with High Contrast & Soft Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_DETAILS.heroImage}
          alt="Cristo Redentor e Pão de Açúcar no Rio de Janeiro"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform hover:scale-100 transition-transform duration-1000 filter contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent w-full md:w-3/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-lg shadow-amber-500/10 animate-bounce-slow">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{HERO_DETAILS.badgeText}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hook & Copywriting */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Descubra o Rio com{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/40 underline-offset-8">
                Cristo Redentor & Pão de Açúcar
              </span>
              {' '}sem Filas e sem Estresse!
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Viaje pela Cidade Maravilhosa com <strong className="text-amber-300 font-bold">motoristas credenciados Cadastur</strong>, 
              veículos novos com ar-condicionado, <strong className="text-emerald-400 font-bold">cupons de até 25% OFF</strong> nos pontos 
              turísticos e negociação direta 100% segura pela plataforma.
            </p>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span><strong>Comunicação Protegida:</strong> Toda conversa e agendamento passam pelo chat oficial.</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <Car className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Motoristas Indicados:</strong> Profissionais VIP com sedans, SUVs e vans executivas.</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <Tag className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Descontos Exclusivos:</strong> Cupons ativados direto no aplicativo para atrações.</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <Headphones className="w-5 h-5 text-sky-400 shrink-0" />
                <span><strong>Suporte 24h & Ginga AI:</strong> Concierge virtual com suporte no WhatsApp e app.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-cta-drivers"
                onClick={() => onNavigateTab('drivers')}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-base font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Car className="w-5 h-5 stroke-[2.5]" />
                <span>Ver Motoristas Indicados</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                id="hero-cta-attractions"
                onClick={() => onNavigateTab('attractions')}
                className="flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-white text-base font-bold px-6 py-4 rounded-xl transition-colors"
              >
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Explorar Guia do Rio</span>
              </button>
            </div>
          </div>

          {/* Quick Booking & Direct Inquiry Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                ★ 100% Garantido
              </div>

              <div className="mb-6 text-left">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  Solicite seu Transporte VIP no Rio
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Selecione o destino e envie uma proposta para os motoristas credenciados da plataforma.
                </p>
              </div>

              <form onSubmit={handleQuickQuoteSubmit} className="space-y-4 text-left">
                {/* Attraction Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Destino / Ponto Turístico</span>
                    <span className="text-[11px] text-amber-400 font-bold">Com Cupom Ativo</span>
                  </label>
                  <select
                    value={selectedAttraction}
                    onChange={(e) => setSelectedAttraction(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    {ATTRACTIONS_DATA.map((att) => (
                      <option key={att.id} value={att.id}>
                        {att.name} ({att.discountPercentage ? `-${att.discountPercentage}% OFF` : 'Atração Popular'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Categoria do Veículo
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'SUV Premium', label: 'SUV (4 Pessoas)' },
                      { type: 'Sedan Executivo', label: 'Sedan (4 Pessoas)' },
                      { type: 'Van Executiva', label: 'Van (15 Pessoas)' },
                    ].map((v) => (
                      <button
                        type="button"
                        key={v.type}
                        onClick={() => setSelectedVehicleType(v.type)}
                        className={`px-2.5 py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                          selectedVehicleType === v.type
                            ? 'bg-amber-500 border-amber-400 text-slate-950 font-black shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Passengers Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Data do Passeio
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Passageiros
                    </label>
                    <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                      <Users className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={passengersCount}
                        onChange={(e) => setPassengersCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-transparent text-xs font-bold focus:outline-none text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimated Rate Box */}
                <div className="bg-slate-950/80 border border-amber-500/20 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Estimativa Médica com Cupom</span>
                    <span className="text-amber-300 font-extrabold text-sm">R$ 160 ~ R$ 220</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[11px]">
                    Desconto de 20% Aplicado
                  </span>
                </div>

                {/* Direct Action Button */}
                <button
                  type="submit"
                  id="hero-quick-submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Solicitação no Chat Direto</span>
                </button>
              </form>

              <p className="text-[11px] text-slate-400 text-center mt-3">
                🔒 Sem compromisso inicial. Toda a negociação e confirmação são feitas pela plataforma.
              </p>
            </div>
          </div>

        </div>

        {/* Live Stats Row */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
          {HERO_DETAILS.stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.value}</div>
              <div className="text-xs text-slate-300 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

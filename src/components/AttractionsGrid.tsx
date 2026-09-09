import React, { useState } from 'react';
import { ATTRACTIONS_DATA } from '../data/rioData';
import { Attraction } from '../types';
import { 
  MapPin, 
  Clock, 
  Ticket, 
  Sparkles, 
  Car, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

interface AttractionsGridProps {
  onRequestBooking: (attractionId: string) => void;
  onSelectCoupon?: (code: string) => void;
}

export const AttractionsGrid: React.FC<AttractionsGridProps> = ({ 
  onRequestBooking,
  onSelectCoupon 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTipsId, setExpandedTipsId] = useState<string | null>('cristo-redentor');

  const categories = [
    { id: 'all', label: 'Todos os Pontos' },
    { id: 'monument', label: 'Monumentos Icônicos' },
    { id: 'beach', label: 'Praias & Orla' },
    { id: 'culture', label: 'Cultura & História' },
    { id: 'nature', label: 'Natureza & Parques' },
  ];

  const filteredAttractions = selectedCategory === 'all'
    ? ATTRACTIONS_DATA
    : ATTRACTIONS_DATA.filter(item => item.category === selectedCategory);

  const toggleExpandTips = (id: string) => {
    setExpandedTipsId(prev => prev === id ? null : id);
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Guia Completo de Acesso & Ingressos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pontos Turísticos do Rio de Janeiro
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Saiba como chegar com conforto, horários de funcionamento, ingressos com desconto e dicas essenciais para evitar filas no Cristo Redentor, Pão de Açúcar e muito mais.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((attraction) => {
            const isTipsExpanded = expandedTipsId === attraction.id;

            return (
              <div 
                key={attraction.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={attraction.imageUrl} 
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                    
                    {/* Highlight Badge */}
                    <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {attraction.highlightTag}
                    </span>

                    {/* Discount Badge */}
                    {attraction.discountAvailable && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                        <Tag className="w-3 h-3" />
                        -{attraction.discountPercentage}% OFF
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {attraction.operatingHours}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 text-left">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {attraction.name}
                      </h3>
                      <p className="text-xs text-amber-300 font-medium mt-0.5">
                        {attraction.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {attraction.description}
                    </p>

                    {/* Quick Access Info */}
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-200">Como Acessar: </span>
                          <span className="text-slate-300">{attraction.accessInfo}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5 text-sky-400" />
                          Valor Bilheteria:
                        </span>
                        <span className="font-bold text-amber-300">{attraction.ticketPrice}</span>
                      </div>
                    </div>

                    {/* Tips Accordion */}
                    <div>
                      <button
                        onClick={() => toggleExpandTips(attraction.id)}
                        className="w-full flex items-center justify-between text-xs font-semibold text-amber-300 hover:text-amber-200 py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Dicas de Especialista Rio Express ({attraction.tips.length})
                        </span>
                        {isTipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isTipsExpanded && (
                        <ul className="mt-2 space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                          {attraction.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    id={`btn-book-transfer-${attraction.id}`}
                    onClick={() => onRequestBooking(attraction.id)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all"
                  >
                    <Car className="w-4 h-4 stroke-[2.5]" />
                    <span>Reservar Transporte no Chat com Desconto</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

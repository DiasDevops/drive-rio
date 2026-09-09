import React, { useState } from 'react';
import { DRIVERS_DATA } from '../data/rioData';
import { Driver } from '../types';
import { 
  Car, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface DriversListProps {
  onOpenChatWithDriver: (driverId: string, driverName: string) => void;
}

export const DriversList: React.FC<DriversListProps> = ({ onOpenChatWithDriver }) => {
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');
  const [bilingualOnly, setBilingualOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredDrivers = DRIVERS_DATA.filter((driver) => {
    if (vehicleFilter !== 'all' && driver.vehicle.type !== vehicleFilter) return false;
    if (bilingualOnly && !driver.languages.some(l => l.includes('Inglês') || l.includes('Espanhol'))) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesName = driver.name.toLowerCase().includes(term);
      const matchesVehicle = driver.vehicle.model.toLowerCase().includes(term);
      const matchesBio = driver.bio.toLowerCase().includes(term);
      if (!matchesName && !matchesVehicle && !matchesBio) return false;
    }
    return true;
  });

  return (
    <section className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Motoristas Indicados & Credenciados Cadastur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Nossos Profissionais de Receptivo VIP
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Conheça os motoristas mais bem avaliados do Rio de Janeiro. Todos com antecedentes checados, veículos vistoriados com ar-condicionado e atendimento personalizado.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-10 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por nome, veículo (Corolla, SUV, Van)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Vehicle Type Select */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-3 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">Todas as Categorias</option>
              <option value="SUV Premium">SUV Premium</option>
              <option value="Sedan Executivo">Sedan Executivo</option>
              <option value="Van Executiva">Van Executiva (Grupos)</option>
            </select>
          </div>

          {/* Bilingual Toggle */}
          <label className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-3 rounded-xl cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={bilingualOnly}
              onChange={(e) => setBilingualOnly(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <span className="text-xs font-semibold text-slate-300">Motorista Bilingüe (Inglês/Espanhol)</span>
          </label>
        </div>

        {/* Drivers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDrivers.map((driver) => (
            <div 
              key={driver.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img 
                      src={driver.photoUrl} 
                      alt={driver.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-2 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full text-[10px] font-black shadow" title="Cadastur Ativo">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                        {driver.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-400/30 px-2 py-0.5 rounded-md text-amber-300 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{driver.rating}</span>
                        <span className="text-slate-400 font-normal">({driver.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Vehicle details */}
                    <p className="text-xs text-amber-300 font-semibold mt-1 flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-amber-400" />
                      {driver.vehicle.model} ({driver.vehicle.type})
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-sky-400" />
                        {driver.vehicle.capacity} passageiros
                      </span>
                      <span>•</span>
                      <span>Ano {driver.vehicle.year}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Ar-Condicionado</span>
                    </div>
                  </div>
                </div>

                {/* Badges Pill Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {driver.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Languages & Bio */}
                <div className="mt-4 text-xs text-slate-300 text-left space-y-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Idiomas: <strong className="text-slate-200">{driver.languages.join(', ')}</strong></span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    "{driver.bio}"
                  </p>
                </div>

                {/* Price Table */}
                <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Corcovado Transfer</span>
                    <span className="text-amber-300 font-bold text-xs">R$ {driver.corcovadoTransferRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hora Avulsa</span>
                    <span className="text-amber-300 font-bold text-xs">R$ {driver.hourlyRate}/h</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">City Tour (8h)</span>
                    <span className="text-emerald-400 font-extrabold text-xs">R$ {driver.cityTourRate}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  id={`btn-chat-driver-${driver.id}`}
                  onClick={() => onOpenChatWithDriver(driver.id, driver.name)}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Iniciar Conversa na Plataforma</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  🔒 Garantia Rio Express: Negocie valores, envie trajetos e tire dúvidas direto no aplicativo.
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

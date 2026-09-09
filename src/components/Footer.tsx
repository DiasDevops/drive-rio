import React from 'react';
import { Compass, ShieldCheck, Heart, MapPin, PhoneCall, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        
        {/* Brand & Cadastur Credentials */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-lg font-black text-white">Rio Express Travel</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            A plataforma oficial de transporte receptivo, guia e descontos exclusivos para o Cristo Redentor, Pão de Açúcar e orla do Rio de Janeiro.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cadastur MMT: 19.043.202/0001-88</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3">Navegação Rápida</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigateTab('home')} className="hover:text-amber-400 transition-colors">
                Início & Capa Principal
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('attractions')} className="hover:text-amber-400 transition-colors">
                Pontos Turísticos & Ingressos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('drivers')} className="hover:text-amber-400 transition-colors">
                Motoristas Indicados
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('discounts')} className="hover:text-amber-400 transition-colors">
                Cupons & Simulador de Descontos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('chat')} className="hover:text-amber-400 transition-colors">
                Central de Mensagens Direta
              </button>
            </li>
          </ul>
        </div>

        {/* Top Tourist Attractions */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3">Cartões-Postais do Rio</h4>
          <ul className="space-y-2 text-slate-400">
            <li>• Cristo Redentor (Corcovado)</li>
            <li>• Bondinho Pão de Açúcar (Urca)</li>
            <li>• Escadaria Selarón & Lapa</li>
            <li>• Praia de Copacabana & Ipanema</li>
            <li>• Parque Lage & Jardim Botânico</li>
            <li>• Maracanã & Sambódromo</li>
          </ul>
        </div>

        {/* Direct Contact & Support */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3">Suporte ao Passageiro</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>+55 (21) 98888-2026</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>suporte@rioexpresstravel.com.br</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Copacabana, Rio de Janeiro - RJ</span>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <p>© 2026 Rio Express Travel - Todos os direitos reservados. Feito com paixão pela Cidade Maravilhosa.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          <span>Segurança e Comunicação 100% Protegidas na Plataforma</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        </p>
      </div>
    </footer>
  );
};

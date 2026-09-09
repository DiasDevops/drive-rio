import React, { useState } from 'react';
import { DISCOUNTS_DATA } from '../data/rioData';
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  Percent, 
  Gift, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface DiscountsSectionProps {
  onOpenChatWithPromo?: (promoCode: string) => void;
}

export const DiscountsSection: React.FC<DiscountsSectionProps> = ({ onOpenChatWithPromo }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive Calculator State
  const [calcPassengers, setCalcPassengers] = useState<number>(2);
  const [calcTourType, setCalcTourType] = useState<string>('citytour');

  const categories = [
    { id: 'all', label: 'Todos os Descontos' },
    { id: 'Pontos Turísticos', label: 'Pontos Turísticos' },
    { id: 'Transfer & Motoristas', label: 'Transfers & City Tours' },
    { id: 'Passeios de Barco & Helicóptero', label: 'Barco & Helicóptero' },
    { id: 'Restaurantes', label: 'Restaurantes & Bares' },
  ];

  const filteredDiscounts = selectedCategory === 'all'
    ? DISCOUNTS_DATA
    : DISCOUNTS_DATA.filter(d => d.category === selectedCategory);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Calculator logic
  const calculateSavings = () => {
    let basePricePerPerson = 250; // standard full tour
    if (calcTourType === 'cristo_pao') basePricePerPerson = 180;
    if (calcTourType === 'helicóptero') basePricePerPerson = 650;

    const totalWithoutDiscount = basePricePerPerson * calcPassengers;
    const discountAmount = Math.round(totalWithoutDiscount * 0.20); // 20% average discount
    const finalPrice = totalWithoutDiscount - discountAmount;

    return { totalWithoutDiscount, discountAmount, finalPrice };
  };

  const { totalWithoutDiscount, discountAmount, finalPrice } = calculateSavings();

  return (
    <section className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-4 h-4" />
            <span>Descontos Exclusivos Rio Express</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Economize nos Principais Passeios do Rio
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Aproveite cupons validados para bilhetes do Trem do Corcovado, Bondinho Pão de Açúcar, traslados privativos e restaurantes parceiros.
          </p>
        </div>

        {/* Category Tabs */}
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

        {/* Coupon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredDiscounts.map((discount) => (
            <div 
              key={discount.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {discount.popular && (
                <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  ★ Mais Resgatado
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {discount.partnerName}
                  </span>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                    {discount.discountPercentage}% OFF
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {discount.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {discount.description}
                </p>

                <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800">
                  <strong>Regras:</strong> {discount.terms}
                </p>
              </div>

              {/* Code Box & Actions */}
              <div className="mt-6 space-y-3">
                <div className="bg-slate-900 border border-dashed border-amber-500/40 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Código do Cupom</span>
                    <span className="text-amber-300 font-mono font-bold text-sm tracking-widest">
                      {discount.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(discount.code)}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                  >
                    {copiedCode === discount.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {onOpenChatWithPromo && (
                  <button
                    onClick={() => onOpenChatWithPromo(discount.code)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Usar no Chat com Motorista</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Discount Calculator Widget */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Simulador de Economia de Viagem</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Calcule Quanto Você Economiza no Rio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Selecione o número de passageiros e o tipo de passeio para ver o valor final com desconto do aplicativo.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tipo de Passeio / Traslado
                  </label>
                  <select
                    value={calcTourType}
                    onChange={(e) => setCalcTourType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:border-amber-500"
                  >
                    <option value="citytour">City Tour Completo 8h (Cristo + Pão de Açúcar + Lapa)</option>
                    <option value="cristo_pao">Express Transfer (Cristo Redentor + Pão de Açúcar)</option>
                    <option value="helicóptero">Passeio Panorâmico de Helicóptero</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Número de Pessoas na Sua Comitiva
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 4, 6, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCalcPassengers(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          calcPassengers === num
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl text-left space-y-4">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                Resumo da Sua Economia Garantida
              </span>

              <div className="space-y-2 text-sm pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Valor Sem Desconto:</span>
                  <span className="line-through text-slate-500">R$ {totalWithoutDiscount},00</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Desconto Exclusivo Rio Express:</span>
                  <span>- R$ {discountAmount},00</span>
                </div>

                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-slate-800">
                  <span>Valor Final com Motorista VIP:</span>
                  <span className="text-amber-400 text-xl">R$ {finalPrice},00</span>
                </div>
              </div>

              {onOpenChatWithPromo && (
                <button
                  onClick={() => onOpenChatWithPromo('RIOMARAVILHA100')}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Garantir esta Economia no Chat Direto</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

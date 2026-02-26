import React from 'react';
import { User, ScreenName } from '../types';
import { Card } from '../components/Card';
import { getReceitasSemana, getSemanaAtual } from '../services/recipes';

interface PlanScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const PlanScreen: React.FC<PlanScreenProps> = ({ user, onNavigate }) => {
  const receitasSemana = getReceitasSemana();
  const semanaAtual = getSemanaAtual();

  return (
    <div className="flex flex-col p-5 pb-24 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div 
          className="flex items-center gap-2 font-display font-bold text-texto cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <span className="text-xl">←</span>
          <span>Voltar</span>
        </div>
        <div className="w-11 h-11 bg-verde-claro rounded-2xl flex items-center justify-center font-bold text-verde-escuro">
          {user.nome.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">🥗 Plano 7 Dias</h2>
        <p className="text-texto-medio">Refeições high protein</p>
      </div>

      <div className="bg-orange-50 p-3 rounded-xl mb-4 text-center font-semibold text-orange-800 text-sm">
        🔄 Cardápio renovado toda semana! · Semana {semanaAtual} de 14
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(receitasSemana).map(([dia, p]) => {
          const diaNum = parseInt(dia);
          const completo = user.progresso.some(d => d.dia === diaNum && d.completo);
          
          return (
            <Card 
              key={dia} 
              className={`border-l-[5px] ${completo ? 'border-l-verde' : 'border-l-laranja'}`}
            >
              <div className="flex justify-between mb-3">
                <span className="font-display font-extrabold text-lg">Dia {dia}</span>
                {completo && (
                  <span className="bg-verde-claro text-verde-escuro px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    ✅ Concluído
                  </span>
                )}
              </div>
              <div className="text-sm leading-relaxed space-y-1">
                <div>🌅 {p.cafe}</div>
                <div>☀️ {p.almoco}</div>
                <div>🌤️ {p.lanche}</div>
                <div>🌙 {p.jantar}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

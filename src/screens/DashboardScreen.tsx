import React, { useEffect, useState } from 'react';
import { User, ScreenName } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { aiService } from '../services/ai';

interface DashboardScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onNavigate }) => {
  const [motivation, setMotivation] = useState({
    title: "Carregando...",
    subtitle: "Consultando seu coach IA...",
    emoji: "⏳"
  });

  useEffect(() => {
    // Load motivation from AI
    const loadMotivation = async () => {
      const msg = await aiService.getMotivation(user);
      setMotivation(msg);
    };
    loadMotivation();
  }, [user]);

  const diasCompletos = user.progresso.filter(d => d.completo).length;
  const ultimoRegistro = user.progresso[user.progresso.length - 1];
  const pesoAtual = ultimoRegistro ? ultimoRegistro.peso : user.pesoInicial;
  const cinturaAtual = ultimoRegistro ? ultimoRegistro.cintura : user.cinturaInicial;
  const mediaProteina = user.progresso.length 
    ? Math.round(user.progresso.reduce((acc, d) => acc + d.proteina, 0) / user.progresso.length) 
    : 0;

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const hojeIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Adjust so Monday is 0

  return (
    <div className="flex flex-col p-5 pb-24 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 font-display font-extrabold text-lg">
          <span className="w-8 h-8 bg-verde-claro rounded-[10px] flex items-center justify-center text-lg">🌿</span>
          <span>Desinflame</span>
        </div>
        <div 
          className="w-11 h-11 bg-verde-claro rounded-2xl flex items-center justify-center font-bold text-verde-escuro cursor-pointer hover:border-2 hover:border-verde transition-all"
          onClick={() => onNavigate('config')}
        >
          {user.nome.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="bg-verde-claro rounded-full px-5 py-3 mb-5 flex items-center justify-between">
        <span className="font-bold text-verde-escuro text-sm">Dia {diasCompletos}/7 concluídos</span>
        <div className="w-[100px] h-2 bg-verde/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-verde rounded-full transition-all duration-500" 
            style={{ width: `${(diasCompletos / 7) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
        {Array.from({ length: 7 }).map((_, i) => {
          const diaNum = i + 1;
          const completo = user.progresso.some(d => d.dia === diaNum && d.completo);
          const isHoje = i === hojeIndex;
          
          return (
            <div 
              key={i}
              className={cn(
                "min-w-[52px] h-16 rounded-[20px] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all border-2",
                completo 
                  ? "bg-verde-claro border-verde text-verde-escuro" 
                  : isHoje 
                    ? "bg-verde text-white border-verde" 
                    : "bg-bg border-transparent text-texto-medio"
              )}
              onClick={() => onNavigate('registro')}
            >
              <span className="text-xs font-semibold">{diasSemana[i]}</span>
              <span className="text-lg font-extrabold">{diaNum}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2.5 my-5">
        <div className="bg-bg rounded-2xl p-3 text-center">
          <div className="font-display text-[22px] font-extrabold leading-tight">{pesoAtual.toFixed(1)}</div>
          <div className="text-[11px] font-semibold text-texto-medio uppercase tracking-wide">Peso kg</div>
        </div>
        <div className="bg-bg rounded-2xl p-3 text-center">
          <div className="font-display text-[22px] font-extrabold leading-tight">{cinturaAtual}</div>
          <div className="text-[11px] font-semibold text-texto-medio uppercase tracking-wide">Cintura</div>
        </div>
        <div className="bg-bg rounded-2xl p-3 text-center">
          <div className="font-display text-[22px] font-extrabold leading-tight">{mediaProteina}</div>
          <div className="text-[11px] font-semibold text-texto-medio uppercase tracking-wide">Proteína</div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-verde-claro to-white border-none">
        <div className="flex items-center gap-3">
          <div className="text-[32px]">{motivation.emoji}</div>
          <div>
            <div className="font-bold text-base">{motivation.title}</div>
            <div className="text-[13px] text-texto-medio">{motivation.subtitle}</div>
          </div>
        </div>
      </Card>

      <Button variant="secondary" onClick={() => onNavigate('registro')} className="mt-2">
        📝 Registrar hoje
      </Button>

      <Button variant="outline" onClick={() => onNavigate('chat')} className="mt-4 border-dashed">
        🤖 Falar com Coach IA
      </Button>
    </div>
  );
};

import { cn } from '../lib/utils';

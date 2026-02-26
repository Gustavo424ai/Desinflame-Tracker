import React from 'react';
import { ScreenName } from '../types';
import { Home, Edit3, Calendar, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomMenuProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ currentScreen, onNavigate }) => {
  const items = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'registro', label: 'Registrar', icon: Edit3 },
    { id: 'plano', label: 'Plano', icon: Calendar },
    { id: 'historico', label: 'Histórico', icon: BarChart2 },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 pb-5 flex justify-around z-40">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        
        return (
          <div 
            key={item.id}
            className={cn(
              "flex flex-col items-center gap-1 cursor-pointer transition-colors",
              isActive ? "text-verde" : "text-texto-medio"
            )}
            onClick={() => onNavigate(item.id as ScreenName)}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { User, ScreenName } from '../types';
import { Card } from '../components/Card';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '../components/Button';
import { Share2, FileText } from 'lucide-react';

interface HistoryScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ user, onNavigate }) => {
  const data = user.progresso.map(d => ({
    name: `D${d.dia}`,
    peso: d.peso,
    full: d
  }));

  const diasCompletos = user.progresso.filter(d => d.completo).length;

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

      <div className="flex gap-3 mb-5">
        <Button variant="outline" className="flex-1 py-3 text-sm h-auto" onClick={() => alert('PDF gerado!')}>
          <FileText size={16} /> PDF
        </Button>
        <Button variant="outline" className="flex-1 py-3 text-sm h-auto" onClick={() => alert('Texto copiado!')}>
          <Share2 size={16} /> Compartilhar
        </Button>
      </div>

      <Card title="📊 Evolução do peso">
        <div className="h-[200px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="peso" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4CAF50" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-texto-medio text-sm">
              Nenhum registro ainda
            </div>
          )}
        </div>
      </Card>

      <Card title="🏆 Conquistas">
        <div className="flex flex-col gap-2">
          {diasCompletos >= 3 ? (
            <div className="flex items-center gap-3 p-3 bg-verde-claro rounded-xl">
              <span className="text-2xl">🥉</span>
              <span className="font-bold text-sm text-verde-escuro">3 dias seguidos</span>
            </div>
          ) : (
             <div className="text-center text-sm text-texto-medio py-4">Complete 3 dias para ganhar sua primeira medalha</div>
          )}
          {diasCompletos >= 5 && (
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
              <span className="text-2xl">🥈</span>
              <span className="font-bold text-sm text-gray-700">5 dias seguidos</span>
            </div>
          )}
          {diasCompletos >= 7 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
              <span className="text-2xl">🥇</span>
              <span className="font-bold text-sm text-yellow-700">Semana completa</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

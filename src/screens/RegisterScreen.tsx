import React, { useState, useEffect } from 'react';
import { User, ScreenName } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { storage } from '../services/storage';
import { getReceitasSemana } from '../services/recipes';

interface RegisterScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
  onUpdateUser: (user: User) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ user, onNavigate, onUpdateUser }) => {
  const hoje = new Date().getDay() === 0 ? 7 : new Date().getDay(); // 1 (Mon) - 7 (Sun)
  
  const [formData, setFormData] = useState({
    peso: '',
    cintura: '',
    proteina: '',
    energia: 5,
    leveza: 5,
    completo: false
  });

  useEffect(() => {
    const registroHoje = user.progresso.find(d => d.dia === hoje);
    if (registroHoje) {
      setFormData({
        peso: registroHoje.peso.toString(),
        cintura: registroHoje.cintura.toString(),
        proteina: registroHoje.proteina.toString(),
        energia: registroHoje.energia,
        leveza: registroHoje.leveza,
        completo: registroHoje.completo
      });
    }
  }, [user, hoje]);

  const handleSave = () => {
    if (!formData.peso || !formData.cintura || !formData.proteina) {
      alert('Preencha todos os campos numéricos');
      return;
    }

    const newLog = {
      dia: hoje,
      peso: parseFloat(formData.peso),
      cintura: parseFloat(formData.cintura),
      proteina: parseFloat(formData.proteina),
      energia: formData.energia,
      leveza: formData.leveza,
      completo: formData.completo,
      data: new Date().toISOString()
    };

    const newProgresso = user.progresso.filter(d => d.dia !== hoje);
    newProgresso.push(newLog);
    newProgresso.sort((a, b) => a.dia - b.dia);

    const updatedUser = { ...user, progresso: newProgresso };
    storage.updateUser(updatedUser);
    onUpdateUser(updatedUser);
    onNavigate('dashboard');
  };

  const receitasSemana = getReceitasSemana();
  const receitaHoje = receitasSemana[hoje] || receitasSemana[1];

  const refeicoes = [
    receitaHoje.cafe,
    receitaHoje.almoco,
    receitaHoje.lanche,
    receitaHoje.jantar
  ];

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

      <h2 className="font-display text-2xl font-bold mb-2">📝 Registrar Dia {hoje}</h2>
      <p className="text-texto-medio mb-6">Hoje</p>

      <Card>
        <div className="grid grid-cols-2 gap-3">
          <Input 
            label="Peso (kg)" 
            icon="⚖️" 
            type="number" 
            step="0.1"
            value={formData.peso}
            onChange={e => setFormData({...formData, peso: e.target.value})}
          />
          <Input 
            label="Cintura (cm)" 
            icon="📏" 
            type="number"
            value={formData.cintura}
            onChange={e => setFormData({...formData, cintura: e.target.value})}
          />
        </div>

        <Input 
          label="Proteína (gramas)" 
          icon="🥩" 
          type="number"
          value={formData.proteina}
          onChange={e => setFormData({...formData, proteina: e.target.value})}
        />

        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-semibold text-texto-medio flex gap-1">⚡ Energia</span>
            <span className="font-display text-xl font-extrabold text-laranja">{formData.energia}</span>
          </div>
          <input 
            type="range" 
            min="1" max="10" 
            value={formData.energia}
            onChange={e => setFormData({...formData, energia: parseInt(e.target.value)})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-laranja"
          />
        </div>

        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-semibold text-texto-medio flex gap-1">🌸 Leveza</span>
            <span className="font-display text-xl font-extrabold text-verde">{formData.leveza}</span>
          </div>
          <input 
            type="range" 
            min="1" max="10" 
            value={formData.leveza}
            onChange={e => setFormData({...formData, leveza: parseInt(e.target.value)})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-verde"
          />
        </div>

        <div 
          className="flex items-center gap-3 p-4 bg-verde-claro rounded-2xl mb-5 cursor-pointer"
          onClick={() => setFormData({...formData, completo: !formData.completo})}
        >
          <input 
            type="checkbox" 
            checked={formData.completo}
            readOnly
            className="w-6 h-6 accent-verde rounded"
          />
          <span className="font-semibold text-sm">✅ Concluí o plano de refeições</span>
        </div>

        <Button fullWidth onClick={handleSave}>💾 Salvar dia</Button>
      </Card>

      <Card title="🍽️ Refeições de hoje">
        <div className="flex flex-col divide-y divide-gray-100">
          {refeicoes.map((ref, i) => (
            <div key={i} className="py-3 text-sm">{ref}</div>
          ))}
        </div>
      </Card>
    </div>
  );
};

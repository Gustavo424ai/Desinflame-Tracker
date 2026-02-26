import React, { useState } from 'react';
import { User, ScreenName } from '../types';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Input';
import { Card } from '../components/Card';
import { storage } from '../services/storage';

interface ConfigScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export const ConfigScreen: React.FC<ConfigScreenProps> = ({ user, onNavigate, onUpdateUser, onLogout }) => {
  const [formData, setFormData] = useState({
    objetivo: user.objetivo,
    metaPeso: user.configuracoes.metaPeso,
    metaProteina: user.configuracoes.metaProteina,
    notificacoes: user.configuracoes.notificacoes
  });

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      objetivo: formData.objetivo,
      configuracoes: {
        ...user.configuracoes,
        metaPeso: formData.metaPeso,
        metaProteina: formData.metaProteina,
        notificacoes: formData.notificacoes
      }
    };
    storage.updateUser(updatedUser);
    onUpdateUser(updatedUser);
    onNavigate('dashboard');
  };

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
        <div></div>
      </div>

      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-verde-claro rounded-[24px] flex items-center justify-center text-[32px] mx-auto mb-3 text-verde-escuro font-bold">
          {user.nome.charAt(0).toUpperCase()}
        </div>
        <h3 className="font-display font-bold text-xl">{user.nome}</h3>
        <p className="text-texto-medio text-sm">{user.email}</p>
      </div>

      <Card title="⚙️ Configurações">
        <Select 
          label="Objetivo"
          value={formData.objetivo}
          onChange={e => setFormData({...formData, objetivo: e.target.value as any})}
        >
          <option value="emagrecer">🔥 Emagrecer</option>
          <option value="desinchar">🌊 Desinchar</option>
          <option value="definir">💪 Definir</option>
          <option value="saude">🌱 Saúde</option>
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Input 
            label="Meta peso (kg)"
            type="number"
            value={formData.metaPeso}
            onChange={e => setFormData({...formData, metaPeso: parseFloat(e.target.value)})}
          />
          <Input 
            label="Meta proteína (g)"
            type="number"
            value={formData.metaProteina}
            onChange={e => setFormData({...formData, metaProteina: parseFloat(e.target.value)})}
          />
        </div>

        <div className="my-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <input 
              type="checkbox" 
              checked={formData.notificacoes}
              onChange={e => setFormData({...formData, notificacoes: e.target.checked})}
              className="w-5 h-5 accent-verde rounded"
            />
            <span className="font-semibold text-sm">🔔 Lembrar de registrar diariamente</span>
          </label>
        </div>

        <Button fullWidth onClick={handleSave} className="mb-3">Salvar alterações</Button>
        <Button fullWidth variant="outline" onClick={onLogout} className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300">Sair da conta</Button>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Input';
import { storage } from '../services/storage';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    peso: '70.0',
    cintura: '80',
    proteina: '120',
    objetivo: 'emagrecer' as User['objetivo']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = () => {
    const users = storage.getUsers();
    const user = Object.values(users).find(
      u => u.email === formData.email && u.senha === formData.senha
    );

    if (user) {
      storage.setSession(user);
      onLogin(user);
    } else {
      alert('Email ou senha inválidos');
    }
  };

  const handleRegister = () => {
    if (!formData.nome || !formData.email || !formData.senha) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const id = 'user_' + Date.now();
    const newUser: User = {
      id,
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      pesoInicial: parseFloat(formData.peso),
      cinturaInicial: parseFloat(formData.cintura),
      metaProteina: parseFloat(formData.proteina),
      objetivo: formData.objetivo,
      dataCriacao: new Date().toISOString(),
      progresso: [],
      tutorialVisto: false,
      configuracoes: {
        notificacoes: true,
        metaPeso: parseFloat(formData.peso) - 5,
        metaProteina: parseFloat(formData.proteina)
      }
    };

    storage.updateUser(newUser);
    storage.setSession(newUser);
    onLogin(newUser);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="text-center mb-5">
          <div className="flex justify-center mb-4">
            <div className="w-[60px] h-[60px] bg-verde-claro rounded-[10px] flex items-center justify-center text-[32px]">
              🌿
            </div>
          </div>
          <h1 className="text-[28px] font-extrabold leading-tight mb-2">Desinflame<br/>Tracker</h1>
          <p className="text-texto-medio">Sua jornada de 7 dias</p>
        </div>

        <div className="bg-bg p-6 rounded-[32px]">
          <div className="flex gap-2 mb-6">
            <Button 
              variant={mode === 'login' ? 'primary' : 'ghost'} 
              onClick={() => setMode('login')}
              className={mode === 'login' ? '' : 'bg-white'}
              fullWidth
            >
              Entrar
            </Button>
            <Button 
              variant={mode === 'register' ? 'primary' : 'ghost'} 
              onClick={() => setMode('register')}
              className={mode === 'register' ? '' : 'bg-white'}
              fullWidth
            >
              Criar conta
            </Button>
          </div>

          {mode === 'login' ? (
            <div className="animate-fade-in">
              <Input 
                id="email" 
                label="Email" 
                icon="📧" 
                type="email" 
                placeholder="seu@email.com" 
                value={formData.email}
                onChange={handleChange}
              />
              <Input 
                id="senha" 
                label="Senha" 
                icon="🔒" 
                type="password" 
                placeholder="••••••••" 
                value={formData.senha}
                onChange={handleChange}
              />
              <Button fullWidth onClick={handleLogin} className="mt-2">Entrar</Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <Input 
                id="nome" 
                label="Nome" 
                icon="👤" 
                placeholder="Seu nome" 
                value={formData.nome}
                onChange={handleChange}
              />
              <Input 
                id="email" 
                label="Email" 
                icon="📧" 
                type="email" 
                placeholder="seu@email.com" 
                value={formData.email}
                onChange={handleChange}
              />
              <Input 
                id="senha" 
                label="Senha" 
                icon="🔒" 
                type="password" 
                placeholder="mínimo 6 caracteres" 
                value={formData.senha}
                onChange={handleChange}
              />

              <div className="font-display font-bold my-4 text-texto">📊 Dados iniciais</div>

              <div className="grid grid-cols-2 gap-3">
                <Input 
                  id="peso" 
                  label="Peso (kg)" 
                  icon="⚖️" 
                  type="number" 
                  step="0.1" 
                  value={formData.peso}
                  onChange={handleChange}
                />
                <Input 
                  id="cintura" 
                  label="Cintura (cm)" 
                  icon="📏" 
                  type="number" 
                  value={formData.cintura}
                  onChange={handleChange}
                />
              </div>

              <Input 
                id="proteina" 
                label="Meta proteína (g/dia)" 
                icon="🎯" 
                type="number" 
                value={formData.proteina}
                onChange={handleChange}
              />

              <Select 
                id="objetivo" 
                label="Qual seu principal objetivo?" 
                icon="🎯"
                value={formData.objetivo}
                onChange={handleChange}
              >
                <option value="emagrecer">🔥 Emagrecer</option>
                <option value="desinchar">🌊 Desinchar</option>
                <option value="definir">💪 Definir músculos</option>
                <option value="saude">🌱 Saúde</option>
              </Select>

              <Button fullWidth onClick={handleRegister} className="mt-4">Criar minha conta</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

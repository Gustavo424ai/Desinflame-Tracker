import React, { useState } from 'react';
import { Button } from '../components/Button';

interface TutorialScreenProps {
  onComplete: () => void;
}

export const TutorialScreen: React.FC<TutorialScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      emoji: '🌿',
      title: 'Bem-vindo!',
      desc: 'Você está prestes a começar uma jornada de 7 dias para desinchar e queimar gordura.'
    },
    {
      emoji: '📝',
      title: 'Registre seu progresso',
      desc: 'Todos os dias, registre peso, cintura, proteína e como está se sentindo.'
    },
    {
      emoji: '📊',
      title: 'Acompanhe sua evolução',
      desc: 'Veja gráficos, conquistas e compartilhe seu progresso com amigos.'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 items-center justify-center bg-black/80 fixed inset-0 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] p-8 text-center w-full max-w-[380px] animate-fade-in">
        <div className="text-[48px] mb-5">{steps[step].emoji}</div>
        <h2 className="text-2xl font-extrabold mb-3">{steps[step].title}</h2>
        <p className="text-texto-medio mb-8 leading-relaxed">{steps[step].desc}</p>

        <div className="flex gap-2 justify-center mb-6">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === step ? "bg-verde" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        <Button fullWidth onClick={handleNext}>
          {step === steps.length - 1 ? 'Começar!' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';

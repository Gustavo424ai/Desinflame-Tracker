import React, { useState, useRef, useEffect } from 'react';
import { User, ScreenName } from '../types';
import { aiService } from '../services/ai';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatScreenProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ user, onNavigate }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: `Olá ${user.nome}! Sou seu Coach Desinflame. Como posso te ajudar hoje?` }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await aiService.chat(userMsg, history, user);

    setMessages(prev => [...prev, { role: 'model', text: response || "Erro ao responder." }]);
    setLoading(false);
  };

  const suggestions = [
    "O que comer no café da manhã?",
    "Como desinchar rápido?",
    "Me dê uma dica de treino."
  ];

  return (
    <div className="flex flex-col h-screen bg-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm z-10">
        <div 
          className="flex items-center gap-2 font-display font-bold text-texto cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <span className="text-xl">←</span>
          <span>Voltar</span>
        </div>
        <div className="font-display font-bold">Coach IA 🤖</div>
        <div className="w-8"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center shrink-0
              ${msg.role === 'model' ? 'bg-verde text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              {msg.role === 'model' ? <Bot size={18} /> : <UserIcon size={18} />}
            </div>
            <div className={`
              max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'model' 
                ? 'bg-white text-texto rounded-tl-none' 
                : 'bg-verde text-white rounded-tr-none'}
            `}>
              <ReactMarkdown
                components={{
                  ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-verde text-white flex items-center justify-center shrink-0">
               <Bot size={18} />
             </div>
             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center">
               <Loader2 className="animate-spin text-verde" size={20} />
             </div>
          </div>
        )}
        
        {messages.length === 1 && !loading && (
          <div className="mt-auto mb-4 flex flex-col gap-2">
            <p className="text-xs text-center text-texto-medio mb-2">Sugestões de perguntas:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="bg-white border border-verde/30 text-verde-escuro text-xs px-3 py-2 rounded-full hover:bg-verde-claro transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre dieta, treino..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-verde/20 transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-verde text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-verde-escuro disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

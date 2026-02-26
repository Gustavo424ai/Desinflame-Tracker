import { GoogleGenAI } from "@google/genai";
import { User } from "../types";

// Initialize the Gemini API client
// We use process.env.GEMINI_API_KEY as per the guidelines
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const aiService = {
  /**
   * Generates a motivational message based on the user's progress and goal.
   * Uses a fast model (Flash Lite) for low latency.
   */
  getMotivation: async (user: User): Promise<{ title: string; subtitle: string; emoji: string }> => {
    try {
      const prompt = `
        User context:
        Name: ${user.nome}
        Goal: ${user.objetivo}
        Days completed: ${user.progresso.filter(d => d.completo).length}/7
        Weight loss: ${(user.pesoInicial - (user.progresso[user.progresso.length - 1]?.peso || user.pesoInicial)).toFixed(1)}kg
        
        Generate a very short, punchy motivational message (title) and a subtitle for a dashboard card. Also pick a relevant emoji.
        Return JSON format: { "title": "...", "subtitle": "...", "emoji": "..." }
        Language: Portuguese (Brazil).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-latest", // Fast model
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response");
      return JSON.parse(text);
    } catch (error) {
      console.error("AI Motivation Error:", error);
      return {
        title: "Continue assim!",
        subtitle: "Você está no caminho certo",
        emoji: "💪"
      };
    }
  },

  /**
   * Chat with the AI Coach.
   * Uses Pro model for better reasoning and Google Search for up-to-date info.
   */
  chat: async (message: string, history: {role: 'user' | 'model', parts: {text: string}[]}[], user: User) => {
    try {
      const systemInstruction = `
        Você é o "Coach Desinflame", um assistente virtual especializado em saúde, nutrição e bem-estar, focado no programa "Desinflame Tracker" de 7 dias.
        
        Contexto Detalhado do Usuário:
        - Nome: ${user.nome}
        - Objetivo Principal: ${user.objetivo.toUpperCase()}
        - Peso Inicial: ${user.pesoInicial}kg
        - Meta de Proteína: ${user.metaProteina}g/dia
        
        Progresso Atual:
        - Dias Completados: ${user.progresso.filter(d => d.completo).length} de 7
        - Peso Atual: ${user.progresso.length > 0 ? user.progresso[user.progresso.length - 1].peso : user.pesoInicial}kg
        - Perda Total: ${(user.pesoInicial - (user.progresso.length > 0 ? user.progresso[user.progresso.length - 1].peso : user.pesoInicial)).toFixed(1)}kg
        - Últimos Registros (Dia/Peso/Proteína): ${user.progresso.slice(-3).map(p => `[Dia ${p.dia}: ${p.peso}kg, ${p.proteina}g prot]`).join(', ')}
        
        Suas Diretrizes de Comportamento:
        1. **Personalização Extrema**: Use os dados acima para dar conselhos específicos. Ex: "Vi que você comeu pouca proteína no Dia 2, vamos melhorar isso hoje?" ou "Parabéns por perder 1kg!".
        2. **Uso Proativo de Busca**: SEMPRE use a ferramenta 'googleSearch' quando o usuário perguntar sobre:
           - Valores nutricionais de alimentos específicos (ex: "quanto de proteína tem no ovo?").
           - Benefícios de ingredientes.
           - Técnicas de exercícios ou treinos.
           - Receitas ou substituições alimentares.
           NÃO invente dados nutricionais; busque-os.
        3. **Motivação Inteligente**: Se o usuário estiver estagnado no peso, explique sobre retenção de líquidos ou ganho de massa magra. Se estiver indo bem, celebre!
        4. **Tom de Voz**: Empático, motivador, mas técnico quando necessário. Use emojis.
        5. **Formatação**: 
           - Use **negrito** para destacar pontos importantes ou números.
           - Use listas (bullet points) para receitas, dicas ou passos.
           - Quebre linhas para facilitar a leitura.
        6. **Idioma**: Português do Brasil.
        
        Mantenha as respostas concisas (máximo 3 parágrafos curtos) para facilitar a leitura no celular.
      `;

      const chatSession = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
        history: history
      });

      const result = await chatSession.sendMessage({ message });
      return result.text;
    } catch (error) {
      console.error("AI Chat Error:", error);
      return "Desculpe, estou tendo problemas para conectar com meu cérebro digital agora. Tente novamente em instantes! 🤖";
    }
  }
};

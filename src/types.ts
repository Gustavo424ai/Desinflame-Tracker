export interface DailyLog {
  dia: number;
  peso: number;
  cintura: number;
  proteina: number;
  energia: number;
  leveza: number;
  completo: boolean;
  data: string;
}

export interface UserConfig {
  notificacoes: boolean;
  metaPeso: number;
  metaProteina: number;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  senha?: string; // In a real app, never store plain passwords. For this demo, we follow the prototype.
  pesoInicial: number;
  cinturaInicial: number;
  metaProteina: number;
  objetivo: 'emagrecer' | 'desinchar' | 'definir' | 'saude';
  dataCriacao: string;
  progresso: DailyLog[];
  tutorialVisto: boolean;
  configuracoes: UserConfig;
}

export type ScreenName = 'login' | 'tutorial' | 'dashboard' | 'registro' | 'plano' | 'historico' | 'config' | 'chat';

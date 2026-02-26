import { User } from '../types';

const STORAGE_KEY_USERS = 'desinflame_usuarios';
const STORAGE_KEY_SESSION = 'desinflame_sessao';

export const storage = {
  getUsers: (): Record<string, User> => {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : {};
  },

  saveUsers: (users: Record<string, User>) => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },

  getSession: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY_SESSION);
    return data ? JSON.parse(data) : null;
  },

  setSession: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  },

  updateUser: (user: User) => {
    const users = storage.getUsers();
    users[user.id] = user;
    storage.saveUsers(users);
    
    // Update session if it's the current user
    const session = storage.getSession();
    if (session && session.id === user.id) {
      storage.setSession(user);
    }
  }
};

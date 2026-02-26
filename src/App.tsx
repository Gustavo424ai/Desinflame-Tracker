import { useState, useEffect } from 'react';
import { User, ScreenName } from './types';
import { storage } from './services/storage';
import { LoginScreen } from './screens/LoginScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { PlanScreen } from './screens/PlanScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ConfigScreen } from './screens/ConfigScreen';
import { ChatScreen } from './screens/ChatScreen';
import { BottomMenu } from './components/BottomMenu';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      setUser(session);
      if (!session.tutorialVisto) {
        setCurrentScreen('tutorial');
      } else {
        setCurrentScreen('dashboard');
      }
    } else {
      setCurrentScreen('login');
    }
    setLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (!loggedInUser.tutorialVisto) {
      setCurrentScreen('tutorial');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleTutorialComplete = () => {
    if (user) {
      const updatedUser = { ...user, tutorialVisto: true };
      storage.updateUser(updatedUser);
      setUser(updatedUser);
      setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    storage.setSession(null);
    setUser(null);
    setCurrentScreen('login');
  };

  if (loading) return null;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-[420px] min-h-screen bg-white shadow-2xl relative overflow-x-hidden">
        {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
        
        {currentScreen === 'tutorial' && <TutorialScreen onComplete={handleTutorialComplete} />}
        
        {user && (
          <>
            {currentScreen === 'dashboard' && <DashboardScreen user={user} onNavigate={setCurrentScreen} />}
            {currentScreen === 'registro' && <RegisterScreen user={user} onNavigate={setCurrentScreen} onUpdateUser={setUser} />}
            {currentScreen === 'plano' && <PlanScreen user={user} onNavigate={setCurrentScreen} />}
            {currentScreen === 'historico' && <HistoryScreen user={user} onNavigate={setCurrentScreen} />}
            {currentScreen === 'config' && <ConfigScreen user={user} onNavigate={setCurrentScreen} onUpdateUser={setUser} onLogout={handleLogout} />}
            {currentScreen === 'chat' && <ChatScreen user={user} onNavigate={setCurrentScreen} />}

            {/* Show Bottom Menu on main screens */}
            {['dashboard', 'registro', 'plano', 'historico'].includes(currentScreen) && (
              <BottomMenu currentScreen={currentScreen} onNavigate={setCurrentScreen} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

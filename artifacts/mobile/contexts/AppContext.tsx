import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Activity, Notification } from '@/constants/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  authLoading: boolean;
  isFirstLaunch: boolean;
  setIsFirstLaunch: (v: boolean) => void;
  xp: number;
  coins: number;
  streak: number;
  level: number;
  currentActivity: Partial<Activity> | null;
  setCurrentActivity: (a: Partial<Activity> | null) => void;
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  logout: () => void;
  login: (user: User) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const MOCK_USER: User = {
  id: 'user-1',
  username: 'gridseizer',
  displayName: 'Alex Rivera',
  level: 24,
  xp: 8450,
  rank: 'Territory King',
  territories: 47,
  followers: 1203,
  following: 342,
  isVerified: true,
  isPremium: true,
  bio: 'Conquering cities one hex at a time',
  location: 'San Francisco, CA',
};

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'territory', title: 'Territory Under Attack!', body: 'Your hex at Market St is being attacked', isRead: false, createdAt: new Date().toISOString() },
  { id: '2', type: 'challenge', title: 'Challenge Complete!', body: 'You completed the Morning Warrior challenge', isRead: false, createdAt: new Date().toISOString() },
  { id: '3', type: 'social', title: 'New Follower', body: 'TerritoryHunter started following you', isRead: true, createdAt: new Date().toISOString() },
];

const AUTH_STORAGE_KEY = '@gridseize_auth_user';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity> | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [coins, setCoins] = useState(3200);
  const [xp] = useState(8450);
  const [streak] = useState(12);
  const [level] = useState(24);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_STORAGE_KEY).then(stored => {
      if (stored) {
        try {
          const savedUser = JSON.parse(stored) as User;
          setUserState(savedUser);
          setIsAuthenticated(true);
        } catch {}
      }
      setAuthLoading(false);
    }).catch(() => setAuthLoading(false));
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const setUser = (u: User | null) => { setUserState(u); setIsAuthenticated(!!u); };
  const login = (u: User) => {
    setUserState(u);
    setIsAuthenticated(true);
    AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u)).catch(() => {});
  };
  const logout = async () => {
    setUserState(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY).catch(() => {});
  };
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const addCoins = (amount: number) => setCoins(p => p + amount);
  const spendCoins = (amount: number) => setCoins(p => Math.max(0, p - amount));

  return (
    <AppContext.Provider value={{
      user, setUser, isAuthenticated, authLoading, isFirstLaunch, setIsFirstLaunch,
      xp, coins, streak, level, currentActivity, setCurrentActivity,
      notifications, unreadCount, markAllRead, logout, login,
      addCoins, spendCoins,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

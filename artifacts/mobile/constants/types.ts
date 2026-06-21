export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  level: number;
  xp: number;
  rank: string;
  territories: number;
  followers: number;
  following: number;
  isVerified: boolean;
  isPremium: boolean;
  teamId?: string;
  allianceId?: string;
  bio?: string;
  location?: string;
}

export interface Territory {
  id: string;
  name: string;
  ownerId?: string;
  ownerName?: string;
  color: string;
  size: number;
  income: number;
  level: number;
  capturedAt?: string;
  isUnderAttack?: boolean;
  coordinates: { lat: number; lng: number };
}

export interface Activity {
  id: string;
  type: 'run' | 'walk' | 'cycle';
  distance: number;
  duration: number;
  calories: number;
  pace: number;
  startedAt: string;
  endedAt: string;
  route?: { lat: number; lng: number }[];
  xpEarned: number;
  territoriesCaptured: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'city' | 'state' | 'national' | 'global' | 'team' | 'landmark';
  progress: number;
  target: number;
  reward: { xp: number; coins: number; badge?: string };
  expiresAt: string;
  isCompleted: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: { xp: number; coins: number };
  isCompleted: boolean;
  category: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  memberCount: number;
  rank: number;
  totalXP: number;
  territoriesOwned: number;
  isOpen: boolean;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants?: number;
  distance?: number;
  isRegistered?: boolean;
  coverImage?: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: string;
  activityData?: Partial<Activity>;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'location' | 'route' | 'voice';
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'direct' | 'group' | 'team' | 'alliance';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  earnedAt?: string;
  isEarned: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  image?: string;
  cost: number;
  currency: 'coins' | 'xp' | 'premium';
  category: string;
  isAvailable: boolean;
  expiresAt?: string;
  sponsorName?: string;
}

export interface SafetyAlert {
  id: string;
  type: string;
  message: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  airQuality: number;
  runningScore: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  change: number;
  isCurrentUser?: boolean;
}

export interface Route {
  id: string;
  name: string;
  distance: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  safetyScore: number;
  rating: number;
  reviews: number;
  estimatedTime: number;
  createdBy?: string;
  isSaved?: boolean;
  isFavorite?: boolean;
  tags: string[];
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, string>;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  isFirstLaunch: boolean;
  currentActivity: Partial<Activity> | null;
  xp: number;
  coins: number;
  streak: number;
  level: number;
  notifications: Notification[];
}

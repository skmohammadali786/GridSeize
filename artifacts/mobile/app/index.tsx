import { Redirect } from 'expo-router';
import { View } from 'react-native';
import { useApp } from '@/contexts/AppContext';

export default function Index() {
  const { isAuthenticated, authLoading } = useApp();

  if (authLoading) {
    return <View style={{ flex: 1, backgroundColor: '#0F172A' }} />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/splash" />;
  }

  return <Redirect href="/(tabs)" />;
}

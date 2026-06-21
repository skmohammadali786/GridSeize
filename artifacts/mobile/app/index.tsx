import { Redirect } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

export default function Index() {
  const { isAuthenticated, isFirstLaunch } = useApp();
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/splash" />;
  }
  return <Redirect href="/(tabs)" />;
}

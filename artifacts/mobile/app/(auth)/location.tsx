import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

export default function LocationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const handleEnable = async () => {
    setLoading(true);
    if (Platform.OS !== 'web') {
      try {
        const { requestForegroundPermissionsAsync } = await import('expo-location');
        await requestForegroundPermissionsAsync();
      } catch {}
    }
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push('/(auth)/permissions');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
          <Ionicons name="location-outline" size={52} color={colors.accent} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Enable Location</Text>
        <Text style={[styles.desc, { color: colors.mutedForeground }]}>
          GridSeize uses your location to capture territories, track your routes, and find nearby players and events.
        </Text>
        <View style={styles.features}>
          {[
            { icon: 'grid-outline', label: 'Capture territories as you move' },
            { icon: 'map-outline', label: 'Track your running routes' },
            { icon: 'people-outline', label: 'Find nearby players' },
            { icon: 'shield-checkmark-outline', label: 'Safety and live tracking' },
          ].map(f => (
            <View key={f.label} style={styles.feature}>
              <View style={[styles.featIcon, { backgroundColor: colors.muted }]}>
                <Ionicons name={f.icon as any} size={18} color={colors.accent} />
              </View>
              <Text style={[styles.featLabel, { color: colors.foreground }]}>{f.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="Enable Location" onPress={handleEnable} loading={loading} variant="primary" size="lg" fullWidth />
        <Button title="Not Now" onPress={() => router.push('/(auth)/permissions')} variant="ghost" size="lg" fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  desc: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 22 },
  features: { alignSelf: 'stretch', gap: 12 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featLabel: { fontSize: 14, fontFamily: 'Inter_500Medium', flex: 1 },
  buttons: { gap: 8 },
});

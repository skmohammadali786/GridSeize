import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/Button';

const PERMS = [
  { id: 'location', icon: 'location-outline', label: 'Location', desc: 'Required for territory capture and tracking', required: true },
  { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', desc: 'Battle alerts, mission updates, friend activity', required: false },
  { id: 'camera', icon: 'camera-outline', label: 'Camera', desc: 'Upload activity photos and profile picture', required: false },
  { id: 'health', icon: 'heart-outline', label: 'Health Data', desc: 'Sync heart rate and fitness data', required: false },
];

export default function PermissionsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { login } = useApp();
  const [loading, setLoading] = useState(false);

  const handleDone = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login({ id: 'user-1', username: 'gridseizer', displayName: 'Alex Rivera', level: 1, xp: 0, rank: 'Rookie', territories: 0, followers: 0, following: 0, isVerified: false, isPremium: false });
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>App permissions</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Grant these permissions for the best experience</Text>
      </View>
      <View style={styles.perms}>
        {PERMS.map(p => (
          <View key={p.id} style={[styles.perm, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
            <View style={[styles.permIcon, { backgroundColor: colors.tintBackground }]}>
              <Ionicons name={p.icon as any} size={22} color={colors.accent} />
            </View>
            <View style={styles.permContent}>
              <View style={styles.permRow}>
                <Text style={[styles.permLabel, { color: colors.foreground }]}>{p.label}</Text>
                {p.required && <View style={[styles.reqBadge, { backgroundColor: colors.destructive + '18' }]}><Text style={[styles.reqText, { color: colors.destructive }]}>Required</Text></View>}
              </View>
              <Text style={[styles.permDesc, { color: colors.mutedForeground }]}>{p.desc}</Text>
            </View>
          </View>
        ))}
      </View>
      <Button title="Allow & Continue" onPress={handleDone} loading={loading} variant="primary" size="lg" fullWidth />
      <Button title="Skip for now" onPress={() => router.replace('/(tabs)')} variant="ghost" size="md" fullWidth style={{ marginTop: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { marginBottom: 32, gap: 8 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  sub: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  perms: { flex: 1, gap: 12 },
  perm: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, gap: 12 },
  permIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  permContent: { flex: 1 },
  permRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  permLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  reqBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  reqText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  permDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

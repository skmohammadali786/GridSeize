import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const INTEGRATIONS = [
  { name: 'Apple Health', icon: 'heart-outline', color: '#EF4444', desc: 'Sync steps, calories, heart rate from Health app', connected: true },
  { name: 'Google Fit', icon: 'fitness-outline', color: '#22C55E', desc: 'Import activities and health metrics from Google Fit', connected: false },
  { name: 'Strava', icon: 'bicycle-outline', color: '#F97316', desc: 'Sync runs and rides from your Strava account', connected: false },
  { name: 'Garmin Connect', icon: 'watch-outline', color: '#0EA5E9', desc: 'Import workouts from Garmin devices', connected: false },
];

export default function WearablesScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Wearables & Health" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          Connect health apps and wearable devices to automatically import your fitness data into GridSeize.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>CONNECTED APPS</Text>
        <View style={styles.cards}>
          {INTEGRATIONS.map(app => (
            <View key={app.name} style={[styles.card, { backgroundColor: colors.card, borderColor: app.connected ? app.color + '40' : colors.border }]}>
              <View style={[styles.appIcon, { backgroundColor: app.color + '18' }]}>
                <Ionicons name={app.icon as any} size={24} color={app.color} />
              </View>
              <View style={styles.appInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.appName, { color: colors.foreground }]}>{app.name}</Text>
                  {app.connected && (
                    <View style={[styles.connTag, { backgroundColor: colors.success + '18' }]}>
                      <Text style={[styles.connTagText, { color: colors.success }]}>Connected</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.appDesc, { color: colors.mutedForeground }]}>{app.desc}</Text>
              </View>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: app.connected ? colors.muted : app.color, borderWidth: app.connected ? 1 : 0, borderColor: colors.border }]}>
                <Text style={[styles.actionText, { color: app.connected ? colors.mutedForeground : '#FFF' }]}>
                  {app.connected ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => router.push('/settings/devices' as any)} style={[styles.devicesBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="bluetooth-outline" size={22} color={colors.accent} />
          <View style={styles.devBtnText}>
            <Text style={[styles.devBtnLabel, { color: colors.foreground }]}>Bluetooth Devices</Text>
            <Text style={[styles.devBtnDesc, { color: colors.mutedForeground }]}>Pair smartwatches, chest straps, and sensors</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hint: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: -8 },
  cards: { gap: 10 },
  card: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  appIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  appInfo: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  connTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  connTagText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  appDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  actionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  actionText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  devicesBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 16, borderWidth: 1 },
  devBtnText: { flex: 1 },
  devBtnLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  devBtnDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

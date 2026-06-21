import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FinishActivityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: insets.top + 20, gap: 20 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Ionicons name="trophy" size={48} color="#F59E0B" />
          <Text style={styles.heroTitle}>Great Run!</Text>
          <View style={styles.heroStats}>
            {[
              { label: 'Distance', value: '5.24 km' },
              { label: 'Time', value: '32:08' },
              { label: 'Pace', value: '6:08/km' },
            ].map(s => (
              <View key={s.label} style={styles.heroStat}>
                <Text style={styles.heroStatVal}>{s.value}</Text>
                <Text style={styles.heroStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.xpBanner, { backgroundColor: colors.accent + '22' }]}>
            <Ionicons name="star" size={16} color={colors.accent} />
            <Text style={[styles.xpBannerText, { color: colors.accent }]}>+340 XP earned · 7 hexes captured</Text>
          </View>
        </View>
        <View style={styles.grid}>
          {[
            { label: 'Calories', value: '412', icon: 'flame-outline', color: '#F59E0B' },
            { label: 'Elevation', value: '+84m', icon: 'trending-up-outline', color: '#0EA5E9' },
            { label: 'Avg HR', value: '158 bpm', icon: 'heart-outline', color: '#EF4444' },
            { label: 'Max Speed', value: '13.4 km/h', icon: 'speedometer-outline', color: '#22C55E' },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={s.icon as any} size={20} color={s.color} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
        <Button title="View Full Summary" onPress={() => router.push('/activity/summary')} variant="primary" size="lg" fullWidth />
        <Button title="Share" onPress={() => router.push('/activity/share')} variant="outline" size="lg" fullWidth />
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.homeLink}>
          <Text style={[styles.homeLinkText, { color: colors.mutedForeground }]}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 20, padding: 24, alignItems: 'center', gap: 16 },
  heroTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroStats: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  heroStat: { alignItems: 'center', gap: 4 },
  heroStatVal: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  xpBanner: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: 8 },
  xpBannerText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 14, borderWidth: 1, gap: 6 },
  statVal: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  homeLink: { alignItems: 'center', paddingVertical: 8 },
  homeLinkText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});

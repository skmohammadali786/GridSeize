import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { Ionicons } from '@expo/vector-icons';

const STATS = [
  { label: 'Distance', value: '4.2 km', icon: 'navigate-outline', color: '#22C55E' },
  { label: 'Duration', value: '38 min', icon: 'time-outline', color: '#0EA5E9' },
  { label: 'Calories', value: '312 cal', icon: 'flame-outline', color: '#F59E0B' },
  { label: 'Steps', value: '6,240', icon: 'footsteps-outline', color: '#8B5CF6' },
  { label: 'XP Earned', value: '+340', icon: 'star-outline', color: '#22C55E' },
  { label: 'Hexes Captured', value: '7 new', icon: 'grid-outline', color: '#EF4444' },
];

export default function DailySummaryScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Daily Summary" subtitle="Today's Activity" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroLabel}>Today's Score</Text>
          <Text style={styles.heroValue}>87</Text>
          <Text style={styles.heroSub}>Above average for you</Text>
        </View>
        <View style={styles.grid}>
          {STATS.map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={s.icon as any} size={22} color={s.color} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
        <Card title="Best Moment">
          <Text style={[styles.body, { color: colors.mutedForeground }]}>You captured 3 hexes in the Financial District in under 10 minutes — your fastest capture streak this week!</Text>
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 6 },
  heroLabel: { fontSize: 14, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.7)' },
  heroValue: { fontSize: 64, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  heroSub: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 14, borderWidth: 1, gap: 6 },
  statVal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  body: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },
});

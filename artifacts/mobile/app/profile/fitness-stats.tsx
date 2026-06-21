import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@/components/ui/ProgressBar';

const STATS = [
  { label: 'Total Distance', value: '487 km', icon: 'navigate-outline', color: '#22C55E' },
  { label: 'Total Time', value: '64h 32m', icon: 'time-outline', color: '#0EA5E9' },
  { label: 'Total Calories', value: '38,420', icon: 'flame-outline', color: '#F59E0B' },
  { label: 'Total XP', value: '84,500', icon: 'star-outline', color: '#8B5CF6' },
  { label: 'Total Activities', value: '142', icon: 'fitness-outline', color: '#10B981' },
  { label: 'Avg Pace', value: '5:48/km', icon: 'speedometer-outline', color: '#EC4899' },
];

const MONTHLY = [
  { month: 'Jan', km: 42 }, { month: 'Feb', km: 68 }, { month: 'Mar', km: 55 },
  { month: 'Apr', km: 91 }, { month: 'May', km: 78 }, { month: 'Jun', km: 153 },
];

export default function FitnessStatsScreen() {
  const colors = useColors();
  const max = Math.max(...MONTHLY.map(m => m.km));
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Fitness Stats" subtitle="All-time statistics" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={styles.grid}>
          {STATS.map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={s.icon as any} size={20} color={s.color} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.chartTitle, { color: colors.foreground }]}>Monthly Distance</Text>
          <View style={styles.chart}>
            {MONTHLY.map(m => (
              <View key={m.month} style={styles.bar}>
                <Text style={[styles.barVal, { color: colors.accent }]}>{m.km}</Text>
                <View style={[styles.barFill, { height: (m.km / max) * 100, backgroundColor: colors.accent }]} />
                <Text style={[styles.barLabel, { color: colors.mutedForeground }]}>{m.month}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 14, borderWidth: 1, gap: 6 },
  statVal: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  chartCard: { padding: 16, borderRadius: 14, borderWidth: 1 },
  chartTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 16 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  bar: { alignItems: 'center', gap: 4 },
  barVal: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  barFill: { width: 28, borderRadius: 6, minHeight: 4 },
  barLabel: { fontSize: 10, fontFamily: 'Inter_500Medium' },
});

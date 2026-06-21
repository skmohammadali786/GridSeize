import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const RECORDS = [
  { label: 'Fastest 1 km', value: '4:12', icon: 'speedometer-outline', color: '#22C55E', date: 'Mar 8, 2026' },
  { label: 'Fastest 5 km', value: '22:34', icon: 'trophy-outline', color: '#F59E0B', date: 'Apr 15, 2026' },
  { label: 'Longest Run', value: '21.1 km', icon: 'navigate-outline', color: '#0EA5E9', date: 'May 2, 2026' },
  { label: 'Max Territories', value: '47 at once', icon: 'grid-outline', color: '#8B5CF6', date: 'Jun 10, 2026' },
  { label: 'Best Day XP', value: '2,340 XP', icon: 'star-outline', color: '#F59E0B', date: 'Feb 28, 2026' },
  { label: 'Longest Streak', value: '42 days', icon: 'flame-outline', color: '#EF4444', date: 'Apr 30, 2026' },
  { label: 'Highest Elevation', value: '+680m', icon: 'trending-up-outline', color: '#10B981', date: 'May 20, 2026' },
  { label: 'Most Battles Won', value: '12 in one day', icon: 'flash-outline', color: '#EF4444', date: 'Jun 1, 2026' },
];

export default function PersonalRecordsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Personal Records" subtitle="Your all-time bests" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {RECORDS.map(r => (
          <View key={r.label} style={[styles.record, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.recordIcon, { backgroundColor: r.color + '18' }]}>
              <Ionicons name={r.icon as any} size={22} color={r.color} />
            </View>
            <View style={styles.recordContent}>
              <Text style={[styles.recordLabel, { color: colors.mutedForeground }]}>{r.label}</Text>
              <Text style={[styles.recordDate, { color: colors.mutedForeground }]}>{r.date}</Text>
            </View>
            <Text style={[styles.recordValue, { color: colors.foreground }]}>{r.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  record: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  recordIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  recordContent: { flex: 1, gap: 2 },
  recordLabel: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  recordDate: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  recordValue: { fontSize: 18, fontFamily: 'Inter_700Bold' },
});

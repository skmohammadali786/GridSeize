import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function ActivitySummaryScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Activity Summary" rightIcon="share-outline" onRightPress={() => router.push('/activity/share')} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.type}>Morning Run</Text>
          <Text style={styles.date}>Today, 7:32 AM</Text>
          <View style={styles.mainStats}>
            <Text style={styles.distance}>5.24</Text>
            <Text style={styles.unit}>km</Text>
          </View>
          <View style={styles.subStats}>
            <Text style={styles.subStat}>32:08</Text>
            <Text style={styles.subDot}>·</Text>
            <Text style={styles.subStat}>6:08/km</Text>
            <Text style={styles.subDot}>·</Text>
            <Text style={styles.subStat}>412 cal</Text>
          </View>
        </View>
        {[
          { label: 'Elevation Gain', value: '84m', icon: 'trending-up-outline', color: '#0EA5E9' },
          { label: 'Average HR', value: '158 bpm', icon: 'heart-outline', color: '#EF4444' },
          { label: 'Max HR', value: '176 bpm', icon: 'heart-outline', color: '#EF4444' },
          { label: 'Cadence', value: '162 spm', icon: 'musical-notes-outline', color: '#8B5CF6' },
          { label: 'XP Earned', value: '+340 XP', icon: 'star-outline', color: '#F59E0B' },
          { label: 'Territories', value: '7 captured', icon: 'grid-outline', color: '#22C55E' },
        ].map(s => (
          <View key={s.label} style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.rowIcon, { backgroundColor: s.color + '18' }]}>
              <Ionicons name={s.icon as any} size={18} color={s.color} />
            </View>
            <Text style={[styles.rowLabel, { color: colors.foreground }]}>{s.label}</Text>
            <Text style={[styles.rowValue, { color: colors.foreground }]}>{s.value}</Text>
          </View>
        ))}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Lap Splits</Text>
          {[
            { lap: 1, time: '6:04', dist: '1 km', pace: '6:04' },
            { lap: 2, time: '6:12', dist: '1 km', pace: '6:12' },
            { lap: 3, time: '6:08', dist: '1 km', pace: '6:08' },
            { lap: 4, time: '6:18', dist: '1 km', pace: '6:18' },
            { lap: 5, time: '7:26', dist: '1.24 km', pace: '5:59' },
          ].map(l => (
            <View key={l.lap} style={[styles.lapRow, { borderColor: colors.border }]}>
              <Text style={[styles.lapNum, { color: colors.mutedForeground }]}>Lap {l.lap}</Text>
              <Text style={[styles.lapTime, { color: colors.foreground }]}>{l.time}</Text>
              <Text style={[styles.lapPace, { color: colors.accent }]}>{l.pace}/km</Text>
            </View>
          ))}
        </View>
        <Button title="Share Activity" onPress={() => router.push('/activity/share')} variant="outline" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderRadius: 16, padding: 20, alignItems: 'center', gap: 6 },
  type: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_500Medium' },
  date: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter_400Regular' },
  mainStats: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  distance: { fontSize: 52, fontFamily: 'Inter_700Bold', color: '#FFF' },
  unit: { fontSize: 20, color: 'rgba(255,255,255,0.7)', marginBottom: 8 },
  subStats: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  subStat: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter_500Medium' },
  subDot: { color: 'rgba(255,255,255,0.3)' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 12 },
  rowIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  rowValue: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 10 },
  lapRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, gap: 12 },
  lapNum: { width: 50, fontSize: 13, fontFamily: 'Inter_400Regular' },
  lapTime: { flex: 1, fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  lapPace: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});

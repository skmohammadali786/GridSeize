import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COMPLETED = [true, true, true, true, true, false, false];

export default function StreakScreen() {
  const colors = useColors();
  const { streak } = useApp();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Streak" subtitle="Keep it going!" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 24, alignItems: 'center' }}>
        <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="flame" size={56} color="#F59E0B" />
          <Text style={[styles.streakNum, { color: colors.foreground }]}>{streak}</Text>
          <Text style={[styles.streakLabel, { color: colors.mutedForeground }]}>Day Streak</Text>
        </View>
        <View style={styles.weekRow}>
          {DAYS.map((d, i) => (
            <View key={d} style={styles.dayCol}>
              <View style={[styles.dayCircle, { backgroundColor: COMPLETED[i] ? '#F59E0B' : colors.muted, borderColor: COMPLETED[i] ? '#F59E0B' : colors.border }]}>
                {COMPLETED[i] && <Ionicons name="flame" size={14} color="#FFF" />}
              </View>
              <Text style={[styles.dayLabel, { color: COMPLETED[i] ? colors.foreground : colors.mutedForeground }]}>{d}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.foreground }]}>Streak Rewards</Text>
          {[7, 14, 30, 60, 100].map(days => (
            <View key={days} style={styles.rewardRow}>
              <Ionicons name={streak >= days ? 'checkmark-circle' : 'lock-closed-outline'} size={18} color={streak >= days ? colors.accent : colors.mutedForeground} />
              <Text style={[styles.rewardText, { color: colors.foreground }]}>{days} Day Streak</Text>
              <Text style={[styles.rewardXP, { color: colors.accent }]}>+{days * 50} XP</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 3, gap: 4 },
  streakNum: { fontSize: 40, fontFamily: 'Inter_700Bold' },
  streakLabel: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  weekRow: { flexDirection: 'row', gap: 8 },
  dayCol: { alignItems: 'center', gap: 6 },
  dayCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  dayLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  infoCard: { width: '100%', padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  infoTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  rewardRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rewardText: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  rewardXP: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});

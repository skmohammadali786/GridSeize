import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const ACHIEVEMENTS = [
  { id: '1', icon: '🏆', title: 'First Capture', desc: 'Captured your first territory', xp: 100, earned: true, date: 'Jan 15, 2026' },
  { id: '2', icon: '⚡', title: 'Speed Demon', desc: 'Ran 5km under 25 minutes', xp: 300, earned: true, date: 'Feb 8, 2026' },
  { id: '3', icon: '🗺️', title: 'City Explorer', desc: 'Visited all city districts', xp: 1000, earned: true, date: 'Mar 22, 2026' },
  { id: '4', icon: '🔥', title: 'Streak Master', desc: 'Maintained 30-day streak', xp: 500, earned: true, date: 'Apr 30, 2026' },
  { id: '5', icon: '👑', title: 'Territory King', desc: 'Own 50+ territories at once', xp: 2000, earned: false, date: null },
  { id: '6', icon: '🌍', title: 'Global Conqueror', desc: 'Reach top 100 globally', xp: 5000, earned: false, date: null },
];

export default function AchievementsScreen() {
  const colors = useColors();
  const earned = ACHIEVEMENTS.filter(a => a.earned);
  const locked = ACHIEVEMENTS.filter(a => !a.earned);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Achievements" subtitle={`${earned.length} / ${ACHIEVEMENTS.length} unlocked`} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.summaryNum}>{earned.length}</Text>
          <Text style={styles.summaryLabel}>Achievements Unlocked</Text>
          <Text style={styles.summaryXP}>{earned.reduce((a, b) => a + b.xp, 0).toLocaleString()} XP earned</Text>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Unlocked</Text>
        {earned.map(a => (
          <View key={a.id} style={[styles.achieveCard, { backgroundColor: colors.card, borderColor: colors.accent + '33' }]}>
            <Text style={styles.achieveIcon}>{a.icon}</Text>
            <View style={styles.achieveContent}>
              <Text style={[styles.achieveTitle, { color: colors.foreground }]}>{a.title}</Text>
              <Text style={[styles.achieveDesc, { color: colors.mutedForeground }]}>{a.desc}</Text>
              {a.date && <Text style={[styles.achieveDate, { color: colors.mutedForeground }]}>{a.date}</Text>}
            </View>
            <Text style={[styles.achieveXP, { color: colors.accent }]}>+{a.xp} XP</Text>
          </View>
        ))}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Locked</Text>
        {locked.map(a => (
          <View key={a.id} style={[styles.achieveCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.6 }]}>
            <Text style={[styles.achieveIcon, { opacity: 0.4 }]}>{a.icon}</Text>
            <View style={styles.achieveContent}>
              <Text style={[styles.achieveTitle, { color: colors.foreground }]}>{a.title}</Text>
              <Text style={[styles.achieveDesc, { color: colors.mutedForeground }]}>{a.desc}</Text>
            </View>
            <Text style={[styles.achieveXP, { color: colors.mutedForeground }]}>+{a.xp} XP</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  summaryCard: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 6 },
  summaryNum: { fontSize: 48, fontFamily: 'Inter_700Bold', color: '#F59E0B' },
  summaryLabel: { fontSize: 14, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.8)' },
  summaryXP: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  achieveCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  achieveIcon: { fontSize: 32 },
  achieveContent: { flex: 1, gap: 2 },
  achieveTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  achieveDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  achieveDate: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },
  achieveXP: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@/components/ui/ProgressBar';

const LEVEL_REWARDS = [
  { level: 1, title: 'Rookie', reward: 'Basic features unlocked', color: '#94A3B8' },
  { level: 5, title: 'Explorer', reward: 'Team joining unlocked', color: '#22C55E' },
  { level: 10, title: 'Capturer', reward: 'Alliance access', color: '#0EA5E9' },
  { level: 20, title: 'Warlord', reward: 'Alliance creation', color: '#8B5CF6' },
  { level: 30, title: 'Conqueror', reward: 'Custom territory skins', color: '#F59E0B' },
  { level: 50, title: 'Legend', reward: 'Special event access', color: '#EF4444' },
  { level: 100, title: 'Mythic', reward: 'All features unlocked', color: '#EC4899' },
];

export default function LevelsScreen() {
  const colors = useColors();
  const { level, xp } = useApp();
  const xpProgress = (xp % 10000) / 10000;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Levels & XP" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.currentCard, { backgroundColor: colors.primary }]}>
          <View style={styles.levelBadge}><Text style={styles.levelNum}>{level}</Text></View>
          <View>
            <Text style={styles.currentTitle}>Level {level}</Text>
            <Text style={styles.currentXP}>{xp.toLocaleString()} XP total</Text>
          </View>
          <Text style={[styles.nextLevel, { color: 'rgba(255,255,255,0.6)' }]}>Next: Level {level + 1}</Text>
          <ProgressBar progress={xpProgress} color={colors.accent} height={8} style={{ width: '100%' }} />
          <Text style={[styles.xpNeeded, { color: 'rgba(255,255,255,0.5)' }]}>{(10000 - (xp % 10000)).toLocaleString()} XP to next level</Text>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Level Milestones</Text>
        {LEVEL_REWARDS.map(l => (
          <View key={l.level} style={[styles.milestone, { backgroundColor: colors.card, borderColor: level >= l.level ? l.color + '44' : colors.border }]}>
            <View style={[styles.milestoneLevel, { backgroundColor: l.color + '18', borderColor: l.color + '33' }]}>
              <Text style={[styles.milestoneLevelText, { color: l.color }]}>{l.level}</Text>
            </View>
            <View style={styles.milestoneContent}>
              <Text style={[styles.milestoneTitle, { color: colors.foreground }]}>{l.title}</Text>
              <Text style={[styles.milestoneReward, { color: colors.mutedForeground }]}>{l.reward}</Text>
            </View>
            {level >= l.level && <Ionicons name="checkmark-circle" size={22} color={colors.accent} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  currentCard: { borderRadius: 16, padding: 20, gap: 10, alignItems: 'center' },
  levelBadge: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  levelNum: { fontSize: 30, fontFamily: 'Inter_700Bold', color: '#FFF' },
  currentTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFF', textAlign: 'center' },
  currentXP: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  nextLevel: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  xpNeeded: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  milestone: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  milestoneLevel: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  milestoneLevelText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  milestoneContent: { flex: 1 },
  milestoneTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  milestoneReward: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

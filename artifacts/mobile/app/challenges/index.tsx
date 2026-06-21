import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Active', 'Daily', 'Weekly', 'Team', 'Global'];
const CHALLENGES = [
  { id: '1', title: 'Sprint King', desc: 'Run 5km in under 25 minutes', type: 'daily', xp: 300, progress: 0.65, difficulty: 'Hard', color: '#EF4444' },
  { id: '2', title: 'Territory Baron', desc: 'Own 50 territories simultaneously', type: 'weekly', xp: 1000, progress: 0.94, difficulty: 'Epic', color: '#8B5CF6' },
  { id: '3', title: 'Social Star', desc: 'Get 100 likes on your activity posts', type: 'weekly', xp: 200, progress: 0.45, difficulty: 'Easy', color: '#22C55E' },
  { id: '4', title: 'City Explorer', desc: 'Visit all city districts', type: 'monthly', xp: 2000, progress: 0.3, difficulty: 'Legendary', color: '#F59E0B' },
];

export default function ChallengesScreen() {
  const colors = useColors();
  const [tab, setTab] = useState('Active');
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Challenges" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabsScroll, { borderBottomColor: colors.border }]} contentContainerStyle={{ paddingHorizontal: 16, gap: 4 }}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, { borderBottomColor: tab === t ? colors.accent : 'transparent' }]}>
            <Text style={[styles.tabText, { color: tab === t ? colors.accent : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {CHALLENGES.map(c => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/challenges/${c.id}` as any)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={styles.cardTop}>
              <View>
                <View style={styles.titleRow}>
                  <Text style={[styles.cardTitle, { color: colors.foreground }]}>{c.title}</Text>
                  <View style={[styles.diffBadge, { backgroundColor: c.color + '18' }]}>
                    <Text style={[styles.diffText, { color: c.color }]}>{c.difficulty}</Text>
                  </View>
                </View>
                <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>{c.desc}</Text>
              </View>
              <Badge label={`+${c.xp} XP`} variant="success" />
            </View>
            <View style={styles.progressRow}>
              <ProgressBar progress={c.progress} height={6} style={{ flex: 1 }} />
              <Text style={[styles.progressText, { color: colors.mutedForeground }]}>{Math.round(c.progress * 100)}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsScroll: { borderBottomWidth: 1 },
  tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  card: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  cardTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  diffText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  cardDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 3 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressText: { fontSize: 12, fontFamily: 'Inter_600SemiBold', width: 36 },
});

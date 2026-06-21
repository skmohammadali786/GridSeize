import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { LeaderboardRow } from '@/components/ui/LeaderboardRow';
import { LeaderboardEntry } from '@/constants/types';

const TABS = ['Global', 'City', 'Friends', 'Team'];
const LEADERS: LeaderboardEntry[] = [
  { id: '1', rank: 1, username: 'TerritoryKing', score: 284500, change: 0, isCurrentUser: false },
  { id: '2', rank: 2, username: 'HexMaster', score: 267200, change: 1, isCurrentUser: false },
  { id: '3', rank: 3, username: 'CityConqueror', score: 251800, change: -1, isCurrentUser: false },
  { id: '4', rank: 4, username: 'RunQueen', score: 234100, change: 2, isCurrentUser: false },
  { id: '142', rank: 142, username: 'gridseizer', score: 84500, change: 3, isCurrentUser: true },
];

export default function RankingsScreen() {
  const colors = useColors();
  const [tab, setTab] = useState('Global');
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Rankings" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabs, { borderBottomColor: colors.border }]} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, { borderBottomColor: tab === t ? colors.accent : 'transparent' }]}>
            <Text style={[styles.tabText, { color: tab === t ? colors.accent : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={[styles.myRank, { backgroundColor: colors.tintBackground, borderColor: colors.accent }]}>
        <Text style={[styles.myRankLabel, { color: colors.mutedForeground }]}>Your Rank</Text>
        <Text style={[styles.myRankVal, { color: colors.accent }]}>#142</Text>
        <Text style={[styles.myRankScore, { color: colors.foreground }]}>84,500 pts</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 6 }}>
        {LEADERS.map(l => <LeaderboardRow key={l.id} entry={l} />)}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: { borderBottomWidth: 1 },
  tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  myRank: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16, padding: 14, borderRadius: 12, borderWidth: 1.5 },
  myRankLabel: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  myRankVal: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  myRankScore: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { Activity } from '@/constants/types';

const ACTIVITIES: Activity[] = [
  { id: '1', type: 'run', distance: 5.2, duration: 1920, calories: 412, pace: 369, startedAt: new Date(Date.now() - 86400000).toISOString(), endedAt: new Date(Date.now() - 84480000).toISOString(), xpEarned: 340, territoriesCaptured: 7 },
  { id: '2', type: 'cycle', distance: 12.8, duration: 2700, calories: 380, pace: 211, startedAt: new Date(Date.now() - 172800000).toISOString(), endedAt: new Date(Date.now() - 170100000).toISOString(), xpEarned: 280, territoriesCaptured: 12 },
  { id: '3', type: 'walk', distance: 3.1, duration: 2400, calories: 185, pace: 774, startedAt: new Date(Date.now() - 259200000).toISOString(), endedAt: new Date(Date.now() - 256800000).toISOString(), xpEarned: 120, territoriesCaptured: 3 },
  { id: '4', type: 'run', distance: 8.4, duration: 3120, calories: 680, pace: 371, startedAt: new Date(Date.now() - 345600000).toISOString(), endedAt: new Date(Date.now() - 342480000).toISOString(), xpEarned: 520, territoriesCaptured: 14 },
];

export default function ActivityHistoryScreen() {
  const colors = useColors();
  const [filter, setFilter] = useState('All');
  const types = ['All', 'Run', 'Walk', 'Cycle'];
  const filtered = filter === 'All' ? ACTIVITIES : ACTIVITIES.filter(a => a.type === filter.toLowerCase());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Activity History" subtitle={`${ACTIVITIES.length} activities`} />
      <View style={styles.filters}>
        {types.map(t => (
          <TouchableOpacity key={t} onPress={() => setFilter(t)} style={[styles.filterChip, { backgroundColor: filter === t ? colors.accent : colors.muted, borderColor: filter === t ? colors.accent : colors.border }]}>
            <Text style={[styles.filterText, { color: filter === t ? '#FFF' : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <ActivityCard activity={item} onPress={() => router.push('/activity/summary')} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: { flexDirection: 'row', padding: 16, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100, borderWidth: 1 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});

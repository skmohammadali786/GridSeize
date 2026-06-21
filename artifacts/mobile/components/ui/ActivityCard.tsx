import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Activity } from '@/constants/types';

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
}

const TYPE_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  run: 'fitness-outline',
  walk: 'walk-outline',
  cycle: 'bicycle-outline',
};

const TYPE_LABEL: Record<string, string> = { run: 'Run', walk: 'Walk', cycle: 'Cycle' };

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  return `${m}m`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  const colors = useColors();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
      <View style={[styles.iconBox, { backgroundColor: colors.accent + '18' }]}>
        <Ionicons name={TYPE_ICON[activity.type]} size={22} color={colors.accent} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.type, { color: colors.foreground }]}>{TYPE_LABEL[activity.type]}</Text>
        <Text style={[styles.date, { color: colors.mutedForeground }]}>{formatDate(activity.startedAt)}</Text>
        <View style={styles.stats}>
          <Text style={[styles.stat, { color: colors.foreground }]}>{activity.distance.toFixed(2)} km</Text>
          <Text style={[styles.dot, { color: colors.border }]}>·</Text>
          <Text style={[styles.stat, { color: colors.foreground }]}>{formatDuration(activity.duration)}</Text>
          <Text style={[styles.dot, { color: colors.border }]}>·</Text>
          <Text style={[styles.stat, { color: colors.foreground }]}>{activity.calories} cal</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={[styles.xp, { color: colors.accent }]}>+{activity.xpEarned} XP</Text>
        <Text style={[styles.territories, { color: colors.mutedForeground }]}>{activity.territoriesCaptured} hex</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1 },
  type: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  date: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 },
  stat: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  dot: { fontSize: 13 },
  right: { alignItems: 'flex-end' },
  xp: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  territories: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

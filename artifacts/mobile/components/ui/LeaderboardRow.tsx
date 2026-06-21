import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { LeaderboardEntry } from '@/constants/types';
import { Avatar } from './Avatar';

interface LeaderboardRowProps { entry: LeaderboardEntry; onPress?: () => void; }

export function LeaderboardRow({ entry, onPress }: LeaderboardRowProps) {
  const colors = useColors();
  const isTop3 = entry.rank <= 3;
  const rankColors = ['#F59E0B', '#94A3B8', '#CD7C2F'];
  const rankColor = isTop3 ? rankColors[entry.rank - 1] : colors.mutedForeground;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={[styles.row, { backgroundColor: entry.isCurrentUser ? colors.tintBackground : colors.card, borderColor: entry.isCurrentUser ? colors.accent : colors.border, borderRadius: colors.radius }]}>
      <Text style={[styles.rank, { color: rankColor, fontFamily: isTop3 ? 'Inter_700Bold' : 'Inter_600SemiBold' }]}>{entry.rank}</Text>
      <Avatar name={entry.username} uri={entry.avatar} size={36} />
      <Text style={[styles.name, { color: colors.foreground }]}>{entry.username}{entry.isCurrentUser ? ' (You)' : ''}</Text>
      <View style={styles.right}>
        <Text style={[styles.score, { color: colors.foreground }]}>{entry.score.toLocaleString()}</Text>
        {entry.change !== 0 && (
          <Text style={[styles.change, { color: entry.change > 0 ? colors.success : colors.destructive }]}>
            {entry.change > 0 ? '▲' : '▼'} {Math.abs(entry.change)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, marginBottom: 6, gap: 10 },
  rank: { width: 28, fontSize: 15, textAlign: 'center' },
  name: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  right: { alignItems: 'flex-end' },
  score: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  change: { fontSize: 11, fontFamily: 'Inter_500Medium' },
});

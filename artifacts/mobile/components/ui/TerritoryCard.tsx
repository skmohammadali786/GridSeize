import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Territory } from '@/constants/types';
import { Badge } from './Badge';

interface TerritoryCardProps { territory: Territory; onPress?: () => void; }

export function TerritoryCard({ territory, onPress }: TerritoryCardProps) {
  const colors = useColors();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[styles.card, { backgroundColor: colors.card, borderColor: territory.isUnderAttack ? colors.destructive : colors.border, borderRadius: colors.radius }]}>
      <View style={[styles.colorDot, { backgroundColor: territory.color || colors.accent }]} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: colors.foreground }]}>{territory.name}</Text>
          {territory.isUnderAttack && <Badge label="Under Attack" variant="danger" />}
        </View>
        <Text style={[styles.owner, { color: colors.mutedForeground }]}>{territory.ownerName || 'Uncaptured'}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}><Ionicons name="resize-outline" size={12} color={colors.mutedForeground} /><Text style={[styles.statText, { color: colors.mutedForeground }]}> Lv {territory.level}</Text></View>
          <View style={styles.statItem}><Ionicons name="cash-outline" size={12} color={colors.accent} /><Text style={[styles.statText, { color: colors.accent }]}> {territory.income}/hr</Text></View>
          <View style={styles.statItem}><Ionicons name="grid-outline" size={12} color={colors.mutedForeground} /><Text style={[styles.statText, { color: colors.mutedForeground }]}> {territory.size} hex</Text></View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  colorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  content: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  owner: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  stats: { flexDirection: 'row', gap: 12, marginTop: 6 },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  statText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
});

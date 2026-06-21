import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Ionicons } from '@expo/vector-icons';

const PLAYERS = [
  { id: '1', name: 'TerritoryKing', dist: '0.3 km', level: 31, territories: 124, isOnline: true },
  { id: '2', name: 'RunQueen', dist: '0.7 km', level: 28, territories: 89, isOnline: true },
  { id: '3', name: 'HexMaster', dist: '1.1 km', level: 24, territories: 67, isOnline: false },
  { id: '4', name: 'SpeedDemon', dist: '1.4 km', level: 19, territories: 43, isOnline: true },
];

export default function NearbyPlayersScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Nearby Players" subtitle={`${PLAYERS.filter(p => p.isOnline).length} active now`} />
      <FlatList
        data={PLAYERS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/community/user/${item.id}` as any)} style={[styles.playerCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <Avatar name={item.name} size={48} isOnline={item.isOnline} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.foreground }]}>{item.name}</Text>
              <Text style={[styles.meta, { color: colors.mutedForeground }]}>Level {item.level} · {item.territories} territories</Text>
            </View>
            <View style={styles.right}>
              <Text style={[styles.dist, { color: colors.accent }]}>{item.dist}</Text>
              <TouchableOpacity onPress={() => router.push('/map/battle')} style={[styles.battleBtn, { backgroundColor: colors.destructive }]}>
                <Ionicons name="flash" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  playerCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  meta: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 8 },
  dist: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  battleBtn: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const HISTORY = [
  { id: '1', action: 'Captured', territory: 'Financial District Alpha', time: '2h ago', xp: 80, color: '#22C55E', icon: 'add-circle' },
  { id: '2', action: 'Defended', territory: 'Union Square Beta', time: '5h ago', xp: 40, color: '#0EA5E9', icon: 'shield' },
  { id: '3', action: 'Lost', territory: 'North Beach Gamma', time: '1d ago', xp: -20, color: '#EF4444', icon: 'remove-circle' },
  { id: '4', action: 'Upgraded', territory: 'Marina Green', time: '2d ago', xp: 100, color: '#8B5CF6', icon: 'arrow-up-circle' },
  { id: '5', action: 'Captured', territory: 'Castro District', time: '3d ago', xp: 75, color: '#22C55E', icon: 'add-circle' },
];

export default function TerritoryHistoryScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Territory History" subtitle="All territory events" />
      <FlatList
        data={HISTORY}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/map/territory-details')} style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>
            <View style={styles.content}>
              <Text style={[styles.action, { color: colors.foreground }]}>{item.action}</Text>
              <Text style={[styles.territory, { color: colors.mutedForeground }]}>{item.territory}</Text>
              <Text style={[styles.time, { color: colors.mutedForeground }]}>{item.time}</Text>
            </View>
            <Text style={[styles.xp, { color: item.xp > 0 ? colors.accent : colors.destructive }]}>{item.xp > 0 ? '+' : ''}{item.xp} XP</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, gap: 2 },
  action: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  territory: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  time: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  xp: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});

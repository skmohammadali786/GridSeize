import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';

const LANDMARKS = [
  { id: '1', name: 'Golden Gate Bridge', type: 'Iconic', bonus: '500 XP', dist: '2.1 km', captured: true, color: '#F59E0B' },
  { id: '2', name: 'Coit Tower', type: 'Historic', bonus: '300 XP', dist: '0.8 km', captured: false, color: '#8B5CF6' },
  { id: '3', name: 'Transamerica Pyramid', type: 'Business', bonus: '400 XP', dist: '0.5 km', captured: true, color: '#0EA5E9' },
  { id: '4', name: 'Alcatraz Island', type: 'Special', bonus: '1000 XP', dist: '3.4 km', captured: false, color: '#EF4444' },
];

export default function LandmarksScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Landmarks" subtitle="Special capture zones" />
      <FlatList
        data={LANDMARKS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/map/territory-details')} style={[styles.card, { backgroundColor: colors.card, borderColor: item.captured ? colors.accent + '44' : colors.border }]} activeOpacity={0.85}>
            <View style={[styles.icon, { backgroundColor: item.color + '18', borderColor: item.color + '33' }]}>
              <Ionicons name="location" size={24} color={item.color} />
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.foreground }]}>{item.name}</Text>
              <View style={styles.meta}>
                <Badge label={item.type} variant="info" size="sm" />
                <Text style={[styles.dist, { color: colors.mutedForeground }]}>{item.dist} away</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={[styles.bonus, { color: '#F59E0B' }]}>{item.bonus}</Text>
              {item.captured ? (
                <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              ) : (
                <Ionicons name="lock-closed-outline" size={18} color={colors.mutedForeground} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  icon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  info: { flex: 1, gap: 6 },
  name: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dist: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  right: { alignItems: 'flex-end', gap: 6 },
  bonus: { fontSize: 13, fontFamily: 'Inter_700Bold' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';

const ROUTES = [
  { id: '1', name: 'Golden Gate Loop', dist: '8.2 km', elev: '+120m', diff: 'Moderate', safety: 92, type: 'run', rating: 4.8, reviews: 234, hexes: 18 },
  { id: '2', name: 'Bay Bridge Coastal', dist: '5.6 km', elev: '+45m', diff: 'Easy', safety: 95, type: 'walk', rating: 4.6, reviews: 187, hexes: 11 },
  { id: '3', name: 'Twin Peaks Challenge', dist: '11.3 km', elev: '+380m', diff: 'Hard', safety: 78, type: 'run', rating: 4.9, reviews: 312, hexes: 24 },
  { id: '4', name: 'Embarcadero Sprint', dist: '3.2 km', elev: '+12m', diff: 'Easy', safety: 97, type: 'run', rating: 4.4, reviews: 98, hexes: 7 },
];

const diffColor: Record<string, string> = { Easy: '#22C55E', Moderate: '#F59E0B', Hard: '#EF4444' };

export default function RoutesScreen() {
  const colors = useColors();
  const [search, setSearch] = useState('');
  const filtered = ROUTES.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Routes" rightIcon="add-outline" onRightPress={() => router.push('/routes/builder')} />
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search routes..." />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {['All', 'Run', 'Walk', 'Cycle', 'Saved', 'AI Generated'].map(f => (
          <TouchableOpacity key={f} style={[styles.filterChip, { backgroundColor: f === 'All' ? colors.accent : colors.muted, borderColor: colors.border }]}>
            <Text style={[styles.filterText, { color: f === 'All' ? '#FFF' : colors.mutedForeground }]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {filtered.map(r => (
          <TouchableOpacity key={r.id} onPress={() => router.push('/routes/preview')} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={[styles.mapThumb, { backgroundColor: colors.muted }]}>
              <Ionicons name="map-outline" size={24} color={colors.mutedForeground} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <Text style={[styles.cardName, { color: colors.foreground }]}>{r.name}</Text>
                <View style={[styles.diffBadge, { backgroundColor: diffColor[r.diff] + '18' }]}>
                  <Text style={[styles.diffText, { color: diffColor[r.diff] }]}>{r.diff}</Text>
                </View>
              </View>
              <View style={styles.cardMeta}>
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{r.dist}</Text>
                <Text style={[styles.dot, { color: colors.border }]}>·</Text>
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{r.elev}</Text>
                <Text style={[styles.dot, { color: colors.border }]}>·</Text>
                <Ionicons name="grid-outline" size={12} color={colors.accent} />
                <Text style={[styles.metaText, { color: colors.accent }]}>{r.hexes} hexes</Text>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.rating}>
                  <Ionicons name="star" size={13} color="#F59E0B" />
                  <Text style={[styles.ratingText, { color: colors.foreground }]}>{r.rating} ({r.reviews})</Text>
                </View>
                <View style={styles.safety}>
                  <Ionicons name="shield-checkmark-outline" size={13} color="#22C55E" />
                  <Text style={[styles.safetyText, { color: '#22C55E' }]}>{r.safety}% safe</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  filterScroll: { paddingVertical: 4 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100, borderWidth: 1 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  card: { flexDirection: 'row', borderRadius: 14, borderWidth: 1, overflow: 'hidden', gap: 12 },
  mapThumb: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  cardContent: { flex: 1, padding: 12, gap: 5 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', flex: 1, marginRight: 8 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  diffText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  dot: { fontSize: 12 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  safety: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  safetyText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';

const ROUTES = [
  { id: '1', name: 'Waterfront Safety Loop', dist: '4.2 km', safety: 98, lit: true, cameras: 24, type: 'run' },
  { id: '2', name: 'Park Avenue Walk', dist: '2.8 km', safety: 95, lit: true, cameras: 12, type: 'walk' },
  { id: '3', name: 'Downtown Patrol Route', dist: '6.1 km', safety: 87, lit: true, cameras: 18, type: 'cycle' },
];

export default function SafeRoutesScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Safe Routes" subtitle="Verified safety data" />
      <MapPlaceholder style={styles.map} />
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {ROUTES.map(r => (
          <TouchableOpacity key={r.id} onPress={() => router.push('/safety/safe-route')} style={[styles.routeCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={[styles.safetyScore, { backgroundColor: '#22C55E' }]}>
              <Text style={styles.safetyNum}>{r.safety}</Text>
            </View>
            <View style={styles.routeInfo}>
              <Text style={[styles.routeName, { color: colors.foreground }]}>{r.name}</Text>
              <Text style={[styles.routeDist, { color: colors.mutedForeground }]}>{r.dist}</Text>
              <View style={styles.safeBadges}>
                {r.lit && <View style={[styles.safeBadge, { backgroundColor: '#F59E0B' + '18' }]}><Ionicons name="bulb-outline" size={11} color="#F59E0B" /><Text style={[styles.safeBadgeText, { color: '#F59E0B' }]}>Well lit</Text></View>}
                <View style={[styles.safeBadge, { backgroundColor: '#0EA5E9' + '18' }]}><Ionicons name="camera-outline" size={11} color="#0EA5E9" /><Text style={[styles.safeBadgeText, { color: '#0EA5E9' }]}>{r.cameras} cameras</Text></View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: 200 },
  content: {},
  routeCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 12 },
  safetyScore: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  safetyNum: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  routeInfo: { flex: 1, gap: 4 },
  routeName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  routeDist: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  safeBadges: { flexDirection: 'row', gap: 6 },
  safeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 100 },
  safeBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
});

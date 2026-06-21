import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';

const MAP_FILTERS = ['All', 'My Zone', 'Battles', 'Landmarks', 'Events'];
const LEGEND = [
  { color: '#22C55E', label: 'My Territory' },
  { color: '#EF4444', label: 'Under Attack' },
  { color: '#F59E0B', label: 'Neutral' },
  { color: '#8B5CF6', label: 'Landmark' },
  { color: '#0EA5E9', label: 'Event Zone' },
];

const QUICK_ACTIONS = [
  { label: 'Rankings', icon: 'trophy-outline', route: '/map/rankings' },
  { label: 'Economy', icon: 'cash-outline', route: '/map/economy' },
  { label: 'Landmarks', icon: 'location-outline', route: '/map/landmarks' },
  { label: 'Battle', icon: 'flash-outline', route: '/map/battle' },
  { label: 'Safe Routes', icon: 'shield-checkmark-outline', route: '/map/safe-routes' },
  { label: 'Nearby', icon: 'people-outline', route: '/map/nearby-players' },
];

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLegend, setShowLegend] = useState(false);

  const topOffset = insets.top + (Platform.OS === 'web' ? 67 : 8);
  const bottomOffset = insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 80;

  return (
    <View style={styles.container}>
      <MapPlaceholder style={StyleSheet.absoluteFillObject} />

      {/* Top: filter chips */}
      <View style={[styles.topBar, { top: topOffset }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {MAP_FILTERS.map(f => (
            <TouchableOpacity key={f} onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, {
                backgroundColor: activeFilter === f ? colors.accent : 'rgba(255,255,255,0.92)',
                borderColor: activeFilter === f ? colors.accent : 'rgba(0,0,0,0.1)',
              }]}>
              <Text style={[styles.filterText, { color: activeFilter === f ? '#FFF' : '#1E293B' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Right side: vertical controls */}
      <View style={[styles.rightControls, { top: topOffset + 56, right: 12 }]}>
        <TouchableOpacity onPress={() => setShowLegend(v => !v)} style={[styles.ctrlBtn, { backgroundColor: showLegend ? colors.accent : 'rgba(255,255,255,0.92)' }]}>
          <Ionicons name="layers-outline" size={20} color={showLegend ? '#FFF' : '#1E293B'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/map/nearby-players' as any)} style={[styles.ctrlBtn, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
          <Ionicons name="people-outline" size={20} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
          <Ionicons name="navigate-outline" size={20} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
          <Ionicons name="add-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
          <Ionicons name="remove-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Legend panel */}
      {showLegend && (
        <View style={[styles.legend, { top: topOffset + 56, left: 12, backgroundColor: 'rgba(255,255,255,0.95)' }]}>
          <Text style={styles.legendTitle}>Map Legend</Text>
          {LEGEND.map(l => (
            <View key={l.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: l.color }]} />
              <Text style={styles.legendText}>{l.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Bottom area */}
      <View style={[styles.bottomArea, { bottom: bottomOffset }]}>
        {/* Quick action pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 10 }}>
          {QUICK_ACTIONS.map(n => (
            <TouchableOpacity key={n.label} onPress={() => router.push(n.route as any)}
              style={[styles.quickBtn, { backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.1)' }]}>
              <Ionicons name={n.icon as any} size={15} color="#1E293B" />
              <Text style={styles.quickLabel}>{n.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Capture button row */}
        <View style={[styles.captureRow, { paddingHorizontal: 16 }]}>
          {/* Mini stats */}
          <View style={[styles.statsCard, { backgroundColor: 'rgba(15,23,42,0.88)' }]}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>47</Text>
              <Text style={styles.statLabel}>Zones</Text>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Battles</Text>
            </View>
          </View>
          {/* Capture */}
          <TouchableOpacity onPress={() => router.push('/activity/start-run')} style={[styles.captureBtn, { backgroundColor: colors.accent }]}>
            <Ionicons name="grid-outline" size={22} color="#FFF" />
            <Text style={styles.captureBtnText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0E9' },
  topBar: { position: 'absolute', left: 12, right: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  rightControls: { position: 'absolute', gap: 8 },
  ctrlBtn: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  legend: { position: 'absolute', padding: 12, borderRadius: 14, gap: 7, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  legendTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', color: '#64748B', letterSpacing: 0.5, marginBottom: 2 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#1E293B' },
  bottomArea: { position: 'absolute', left: 0, right: 0 },
  quickBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  quickLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: '#1E293B' },
  captureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  statsCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, gap: 12 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#FFF' },
  statLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' },
  captureBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 28, shadowColor: '#22C55E', shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  captureBtnText: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#FFF' },
});

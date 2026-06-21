import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Badge } from '@/components/ui/Badge';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';

const MAP_FILTERS = ['All', 'My Territory', 'Battles', 'Landmarks', 'Events'];
const LEGEND = [
  { color: '#22C55E', label: 'My Territory' },
  { color: '#EF4444', label: 'Under Attack' },
  { color: '#F59E0B', label: 'Neutral' },
  { color: '#8B5CF6', label: 'Landmark' },
];

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLegend, setShowLegend] = useState(false);

  return (
    <View style={styles.container}>
      <MapPlaceholder style={styles.map} />

      {/* Header overlay */}
      <View style={[styles.header, { top: insets.top + (Platform.OS === 'web' ? 67 : 8) }]}>
        <View style={styles.filterScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {MAP_FILTERS.map(f => (
              <TouchableOpacity key={f} onPress={() => setActiveFilter(f)}
                style={[styles.filterChip, { backgroundColor: activeFilter === f ? colors.accent : colors.glass, borderColor: activeFilter === f ? colors.accent : colors.glassBorder }]}>
                <Text style={[styles.filterText, { color: activeFilter === f ? '#FFF' : colors.foreground }]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => router.push('/map/filters')} style={[styles.filterBtn, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <Ionicons name="options-outline" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomControls, { bottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 80 }]}>
        <View style={styles.controlsLeft}>
          <TouchableOpacity onPress={() => setShowLegend(!showLegend)} style={[styles.ctrlBtn, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Ionicons name="layers-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/map/heatmap')} style={[styles.ctrlBtn, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Ionicons name="analytics-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/map/nearby-players')} style={[styles.ctrlBtn, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Ionicons name="people-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/activity/start-run')} style={[styles.captureBtn, { backgroundColor: colors.accent }]}>
          <Ionicons name="grid-outline" size={22} color="#FFF" />
          <Text style={styles.captureBtnText}>Capture</Text>
        </TouchableOpacity>
      </View>

      {/* Legend */}
      {showLegend && (
        <View style={[styles.legend, { backgroundColor: colors.glass, borderColor: colors.glassBorder, bottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 160 }]}>
          {LEGEND.map(l => (
            <View key={l.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: l.color }]} />
              <Text style={[styles.legendText, { color: colors.foreground }]}>{l.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Quick nav to sub-screens */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={[styles.quickNav, { bottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 78 }]}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {[
          { label: 'Rankings', icon: 'trophy-outline', route: '/map/rankings' },
          { label: 'Economy', icon: 'cash-outline', route: '/map/economy' },
          { label: 'Landmarks', icon: 'location-outline', route: '/map/landmarks' },
          { label: 'Battle', icon: 'flash-outline', route: '/map/battle' },
          { label: 'Safe Routes', icon: 'shield-checkmark-outline', route: '/map/safe-routes' },
          { label: 'Market', icon: 'storefront-outline', route: '/map/market' },
        ].map(n => (
          <TouchableOpacity key={n.label} onPress={() => router.push(n.route as any)} style={[styles.quickBtn, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Ionicons name={n.icon as any} size={16} color={colors.foreground} />
            <Text style={[styles.quickLabel, { color: colors.foreground }]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  header: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  filterScroll: { flex: 1 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  filterBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  bottomControls: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  controlsLeft: { gap: 8 },
  ctrlBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  captureBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 28 },
  captureBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  legend: { position: 'absolute', left: 16, padding: 12, borderRadius: 12, borderWidth: 1, gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  quickNav: { position: 'absolute', left: 0, right: 0 },
  quickBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  quickLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
});

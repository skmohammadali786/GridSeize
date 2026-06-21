import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const MAP_STYLES = [
  { id: 'standard', label: 'Standard', desc: 'Default road map' },
  { id: 'satellite', label: 'Satellite', desc: 'Aerial imagery' },
  { id: 'terrain', label: 'Terrain', desc: 'Topographic lines' },
  { id: 'dark', label: 'Dark', desc: 'Dark-themed map' },
] as const;

export default function MapSettingsScreen() {
  const colors = useColors();
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite' | 'terrain' | 'dark'>('standard');
  const [settings, setSettings] = useState({
    showHexGrid: true,
    showPlayerDots: true,
    showLandmarks: true,
    showBattleZones: true,
    showHeatmap: false,
    animateCaptures: true,
    highDetail: false,
  });

  const toggle = (k: keyof typeof settings) =>
    setSettings(p => ({ ...p, [k]: !p[k] }));

  const SWITCHES = [
    { key: 'showHexGrid', label: 'Show hex grid', desc: 'Overlay territory hexagons on map' },
    { key: 'showPlayerDots', label: 'Show players', desc: 'Show nearby players on the map' },
    { key: 'showLandmarks', label: 'Show landmarks', desc: 'Display special locations' },
    { key: 'showBattleZones', label: 'Show battle zones', desc: 'Highlight territories under attack' },
    { key: 'showHeatmap', label: 'Activity heatmap', desc: 'Your most-visited routes' },
    { key: 'animateCaptures', label: 'Capture animations', desc: 'Animate hex captures' },
    { key: 'highDetail', label: 'High detail mode', desc: 'More detail (uses more battery)' },
  ] as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Map Settings" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>MAP STYLE</Text>
        <View style={styles.styleGrid}>
          {MAP_STYLES.map(s => (
            <TouchableOpacity key={s.id} onPress={() => setMapStyle(s.id)}
              style={[styles.styleCard, {
                backgroundColor: mapStyle === s.id ? colors.tintBackground : colors.card,
                borderColor: mapStyle === s.id ? colors.accent : colors.border,
                borderWidth: mapStyle === s.id ? 2 : 1,
              }]}>
              <Ionicons name="map-outline" size={24} color={mapStyle === s.id ? colors.accent : colors.mutedForeground} />
              <Text style={[styles.styleName, { color: colors.foreground }]}>{s.label}</Text>
              <Text style={[styles.styleDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>OVERLAYS</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {SWITCHES.map((s, i) => (
            <View key={s.key}>
              <View style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={[styles.label, { color: colors.foreground }]}>{s.label}</Text>
                  <Text style={[styles.desc, { color: colors.mutedForeground }]}>{s.desc}</Text>
                </View>
                <Switch value={!!settings[s.key]} onValueChange={() => toggle(s.key)}
                  trackColor={{ false: colors.border, true: colors.accent + '80' }}
                  thumbColor={settings[s.key] ? colors.accent : colors.mutedForeground} />
              </View>
              {i < SWITCHES.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleCard: { width: '47%', borderRadius: 14, padding: 14, alignItems: 'center', gap: 6 },
  styleName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  styleDesc: { fontSize: 11, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowText: { flex: 1 },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  divider: { height: 1, marginLeft: 16 },
});

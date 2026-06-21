import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const EXPORT_TYPES = [
  { key: 'activities', label: 'Activities', desc: 'All workouts with GPS routes, distance, pace', icon: 'fitness-outline', color: '#22C55E', size: '~2.4 MB' },
  { key: 'territories', label: 'Territory History', desc: 'Captured & lost hexes with timestamps', icon: 'grid-outline', color: '#8B5CF6', size: '~1.1 MB' },
  { key: 'health', label: 'Health Data', desc: 'Heart rate, calories, step counts', icon: 'heart-outline', color: '#EF4444', size: '~0.8 MB' },
  { key: 'social', label: 'Social Data', desc: 'Posts, comments, followers list', icon: 'people-outline', color: '#0EA5E9', size: '~0.3 MB' },
  { key: 'account', label: 'Account Data', desc: 'Profile, settings, preferences', icon: 'person-outline', color: '#F59E0B', size: '~0.1 MB' },
];

const FORMATS = ['JSON', 'CSV', 'GPX'] as const;
type Format = typeof FORMATS[number];

export default function DataExportScreen() {
  const colors = useColors();
  const [selected, setSelected] = useState<Record<string, boolean>>({ activities: true });
  const [format, setFormat] = useState<Format>('JSON');
  const [loading, setLoading] = useState(false);

  const toggle = (key: string) => setSelected(p => ({ ...p, [key]: !p[key] }));
  const anySelected = Object.values(selected).some(Boolean);

  async function handleExport() {
    if (!anySelected) { Alert.alert('Select data', 'Choose at least one data type to export.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    const types = EXPORT_TYPES.filter(t => selected[t.key]).map(t => t.label).join(', ');
    Alert.alert(
      'Export ready',
      `Your ${types} data in ${format} format has been prepared. In a connected app, this would open a share sheet.`,
      [{ text: 'OK' }],
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Export Data" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SELECT DATA TO EXPORT</Text>
          <View style={styles.cards}>
            {EXPORT_TYPES.map(t => {
              const isOn = !!selected[t.key];
              return (
                <TouchableOpacity key={t.key} onPress={() => toggle(t.key)}
                  style={[styles.exportCard, {
                    backgroundColor: isOn ? t.color + '10' : colors.card,
                    borderColor: isOn ? t.color : colors.border,
                    borderWidth: isOn ? 2 : 1,
                  }]}>
                  <View style={[styles.exportIcon, { backgroundColor: t.color + '18' }]}>
                    <Ionicons name={t.icon as any} size={22} color={t.color} />
                  </View>
                  <View style={styles.exportText}>
                    <Text style={[styles.exportLabel, { color: colors.foreground }]}>{t.label}</Text>
                    <Text style={[styles.exportDesc, { color: colors.mutedForeground }]}>{t.desc}</Text>
                    <Text style={[styles.exportSize, { color: t.color }]}>{t.size}</Text>
                  </View>
                  <Ionicons name={isOn ? 'checkbox' : 'square-outline'} size={22} color={isOn ? t.color : colors.mutedForeground} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>FORMAT</Text>
          <View style={[styles.formatRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {FORMATS.map((f, i) => (
              <TouchableOpacity key={f} onPress={() => setFormat(f)}
                style={[styles.formatBtn, { backgroundColor: format === f ? colors.accent : 'transparent' }, i < FORMATS.length - 1 && { borderRightWidth: 1, borderRightColor: colors.border }]}>
                <Text style={[styles.formatText, { color: format === f ? '#FFF' : colors.mutedForeground }]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.formatHint, { color: colors.mutedForeground }]}>
            {format === 'GPX' ? 'GPX is best for route data and GPS apps.' : format === 'CSV' ? 'CSV opens easily in Excel or Google Sheets.' : 'JSON includes all raw data fields.'}
          </Text>
        </View>

        <TouchableOpacity onPress={handleExport} disabled={loading}
          style={[styles.exportBtn, { backgroundColor: anySelected ? colors.accent : colors.muted }]}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Ionicons name="download-outline" size={20} color="#FFF" />}
          <Text style={styles.exportBtnText}>{loading ? 'Preparing export…' : 'Export Data'}</Text>
        </TouchableOpacity>

        <Text style={[styles.legalNote, { color: colors.mutedForeground }]}>
          Exported data is provided in accordance with GDPR and CCPA regulations. Your data belongs to you.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 10 },
  cards: { gap: 10 },
  exportCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, gap: 12 },
  exportIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  exportText: { flex: 1, gap: 2 },
  exportLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  exportDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', lineHeight: 17 },
  exportSize: { fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 2 },
  formatRow: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  formatBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  formatText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  formatHint: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 8 },
  exportBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14 },
  exportBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  legalNote: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 18 },
});

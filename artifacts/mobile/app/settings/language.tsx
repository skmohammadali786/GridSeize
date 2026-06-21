import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
];

const UNITS = [
  { id: 'metric', label: 'Metric', desc: 'km, kg, °C' },
  { id: 'imperial', label: 'Imperial', desc: 'mi, lb, °F' },
] as const;

export default function LanguageScreen() {
  const colors = useColors();
  const [selectedLang, setSelectedLang] = useState('en');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Language & Units" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>LANGUAGE</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {LANGUAGES.map((lang, i) => (
            <View key={lang.code}>
              <TouchableOpacity onPress={() => setSelectedLang(lang.code)} style={styles.row}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <View style={styles.langText}>
                  <Text style={[styles.langLabel, { color: colors.foreground }]}>{lang.label}</Text>
                  <Text style={[styles.langNative, { color: colors.mutedForeground }]}>{lang.native}</Text>
                </View>
                {selectedLang === lang.code && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
                )}
              </TouchableOpacity>
              {i < LANGUAGES.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>UNITS OF MEASUREMENT</Text>
        <View style={[styles.unitRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {UNITS.map((u, i) => (
            <TouchableOpacity key={u.id} onPress={() => setUnits(u.id)}
              style={[styles.unitBtn, { backgroundColor: units === u.id ? colors.accent : 'transparent' }, i === 0 && { borderRightWidth: 1, borderRightColor: colors.border }]}>
              <Text style={[styles.unitLabel, { color: units === u.id ? '#FFF' : colors.foreground }]}>{u.label}</Text>
              <Text style={[styles.unitDesc, { color: units === u.id ? 'rgba(255,255,255,0.7)' : colors.mutedForeground }]}>{u.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  flag: { fontSize: 24, width: 36, textAlign: 'center' },
  langText: { flex: 1 },
  langLabel: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  langNative: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  divider: { height: 1, marginLeft: 16 },
  unitRow: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  unitBtn: { flex: 1, padding: 16, alignItems: 'center', gap: 4 },
  unitLabel: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  unitDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});

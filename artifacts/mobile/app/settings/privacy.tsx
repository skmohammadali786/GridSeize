import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyScreen() {
  const colors = useColors();
  const [settings, setSettings] = useState({
    publicProfile: true,
    showLocation: true,
    showActivity: true,
    showTerritories: true,
    allowFollowers: true,
    showOnLeaderboard: true,
    shareWithTeam: true,
    locationPrecision: 'exact' as 'exact' | 'approximate' | 'city',
  });

  const toggle = (k: keyof typeof settings) =>
    setSettings(p => ({ ...p, [k]: !p[k as keyof typeof settings] }));

  const SWITCHES = [
    { key: 'publicProfile', label: 'Public profile', desc: 'Anyone can see your profile' },
    { key: 'showActivity', label: 'Show activities', desc: 'Your workouts appear in the feed' },
    { key: 'showTerritories', label: 'Show territories', desc: 'Your hexes are visible on the map' },
    { key: 'allowFollowers', label: 'Allow followers', desc: 'Others can follow your account' },
    { key: 'showOnLeaderboard', label: 'Appear on leaderboards', desc: 'Show your rank publicly' },
    { key: 'shareWithTeam', label: 'Share data with clubs', desc: 'Clubs can see your detailed stats' },
  ] as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Privacy" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {SWITCHES.map((s, i) => (
            <View key={s.key}>
              <View style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={[styles.label, { color: colors.foreground }]}>{s.label}</Text>
                  <Text style={[styles.desc, { color: colors.mutedForeground }]}>{s.desc}</Text>
                </View>
                <Switch
                  value={!!(settings as any)[s.key]}
                  onValueChange={() => toggle(s.key as any)}
                  trackColor={{ false: colors.border, true: colors.accent + '80' }}
                  thumbColor={(settings as any)[s.key] ? colors.accent : colors.mutedForeground}
                />
              </View>
              {i < SWITCHES.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>LOCATION PRECISION</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {(['exact', 'approximate', 'city'] as const).map((opt, i) => (
            <View key={opt}>
              <TouchableOpacity
                onPress={() => setSettings(p => ({ ...p, locationPrecision: opt }))}
                style={styles.row}
              >
                <View style={styles.rowText}>
                  <Text style={[styles.label, { color: colors.foreground }]}>
                    {opt === 'exact' ? 'Exact location' : opt === 'approximate' ? 'Approximate (±500m)' : 'City only'}
                  </Text>
                </View>
                {settings.locationPrecision === opt && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
                )}
              </TouchableOpacity>
              {i < 2 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.dangerBtn, { borderColor: colors.destructive + '40' }]}>
          <Ionicons name="trash-outline" size={18} color={colors.destructive} />
          <Text style={[styles.dangerText, { color: colors.destructive }]}>Delete My Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: -10 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowText: { flex: 1 },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  divider: { height: 1, marginLeft: 16 },
  dangerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 14, borderWidth: 1 },
  dangerText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

const GOALS = [
  { id: 'free', label: 'Free Run', icon: 'navigate-outline', desc: 'No limits, just run' },
  { id: 'distance', label: 'Distance Goal', icon: 'footsteps-outline', desc: '5 km, 10 km, half marathon...' },
  { id: 'time', label: 'Time Goal', icon: 'time-outline', desc: '20 min, 45 min, 1 hour...' },
  { id: 'territory', label: 'Territory Mode', icon: 'grid-outline', desc: 'Capture as many hexes as possible' },
];

export default function StartRunScreen() {
  const colors = useColors();
  const [selectedGoal, setSelectedGoal] = useState('free');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Start Run" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={[styles.mapPreview, { backgroundColor: colors.muted }]}>
          <Ionicons name="map-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.mapText, { color: colors.mutedForeground }]}>Map Preview</Text>
        </View>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Choose Goal</Text>
          <View style={styles.goals}>
            {GOALS.map(g => (
              <TouchableOpacity key={g.id} onPress={() => setSelectedGoal(g.id)}
                style={[styles.goalCard, { backgroundColor: selectedGoal === g.id ? colors.tintBackground : colors.card, borderColor: selectedGoal === g.id ? colors.accent : colors.border }]} activeOpacity={0.8}>
                <Ionicons name={g.icon as any} size={20} color={selectedGoal === g.id ? colors.accent : colors.mutedForeground} />
                <View style={styles.goalInfo}>
                  <Text style={[styles.goalLabel, { color: colors.foreground }]}>{g.label}</Text>
                  <Text style={[styles.goalDesc, { color: colors.mutedForeground }]}>{g.desc}</Text>
                </View>
                {selectedGoal === g.id && <Ionicons name="checkmark-circle" size={20} color={colors.accent} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.settings}>
          {[
            { label: 'Audio Cues', value: 'Every 1 km', icon: 'volume-medium-outline' },
            { label: 'Auto-pause', value: 'Enabled', icon: 'pause-circle-outline' },
            { label: 'GPS Accuracy', value: 'High', icon: 'locate-outline' },
          ].map(s => (
            <View key={s.label} style={[styles.setting, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={s.icon as any} size={18} color={colors.mutedForeground} />
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>{s.label}</Text>
              <Text style={[styles.settingValue, { color: colors.accent }]}>{s.value}</Text>
            </View>
          ))}
        </View>
        <Button title="Start Run" onPress={() => router.push('/activity/active')} variant="success" size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  mapPreview: { height: 180, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  mapText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  goals: { gap: 8 },
  goalCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1.5, gap: 12 },
  goalInfo: { flex: 1 },
  goalLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  goalDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  settings: { gap: 8 },
  setting: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 10 },
  settingLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  settingValue: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

const INTERESTS = [
  { id: 'running', label: 'Running', icon: 'fitness-outline' },
  { id: 'cycling', label: 'Cycling', icon: 'bicycle-outline' },
  { id: 'walking', label: 'Walking', icon: 'walk-outline' },
  { id: 'territory', label: 'Territory Wars', icon: 'grid-outline' },
  { id: 'social', label: 'Social Challenges', icon: 'people-outline' },
  { id: 'exploration', label: 'City Exploration', icon: 'map-outline' },
  { id: 'competition', label: 'Competitive Play', icon: 'trophy-outline' },
  { id: 'fitness', label: 'Fitness Goals', icon: 'barbell-outline' },
  { id: 'ai', label: 'AI Coaching', icon: 'sparkles-outline' },
  { id: 'rewards', label: 'Rewards & Coins', icon: 'gift-outline' },
  { id: 'events', label: 'Local Events', icon: 'calendar-outline' },
  { id: 'safety', label: 'Safe Routes', icon: 'shield-checkmark-outline' },
] as const;

export default function InterestsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    router.push('/(auth)/fitness-goals');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.inner, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.progress}>
          {[true, true, false].map((active, i) => (
            <React.Fragment key={i}>
              <View style={[styles.progDot, { backgroundColor: active ? colors.accent : colors.border }]} />
              {i < 2 && <View style={[styles.progLine, { backgroundColor: i < 1 ? colors.accent : colors.border }]} />}
            </React.Fragment>
          ))}
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>What interests you?</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Select at least 3 to personalize your experience</Text>
        <View style={styles.grid}>
          {INTERESTS.map(item => {
            const sel = selected.includes(item.id);
            return (
              <TouchableOpacity key={item.id} onPress={() => toggle(item.id)} activeOpacity={0.8}
                style={[styles.chip, { backgroundColor: sel ? colors.accent : colors.card, borderColor: sel ? colors.accent : colors.border, borderRadius: colors.radius }]}>
                <Ionicons name={item.icon as any} size={20} color={sel ? '#FFF' : colors.mutedForeground} />
                <Text style={[styles.chipLabel, { color: sel ? '#FFF' : colors.foreground }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button title={`Continue${selected.length > 0 ? ` (${selected.length})` : ''}`} onPress={handle} loading={loading} disabled={selected.length < 3} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24 },
  progress: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  progDot: { width: 10, height: 10, borderRadius: 5 },
  progLine: { flex: 1, height: 2, marginHorizontal: 4 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', marginBottom: 8 },
  sub: { fontSize: 15, fontFamily: 'Inter_400Regular', marginBottom: 24, lineHeight: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1.5 },
  chipLabel: { fontSize: 13, fontFamily: 'Inter_500Medium' },
});

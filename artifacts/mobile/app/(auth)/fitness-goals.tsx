import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

const GOALS = [
  { id: 'lose_weight', label: 'Lose Weight', icon: 'trending-down-outline', desc: 'Burn calories and slim down' },
  { id: 'build_fitness', label: 'Build Fitness', icon: 'barbell-outline', desc: 'Get stronger and fitter' },
  { id: 'run_5k', label: 'Run a 5K', icon: 'trophy-outline', desc: 'Complete your first 5K race' },
  { id: 'daily_active', label: 'Stay Active Daily', icon: 'calendar-outline', desc: 'Move every day' },
  { id: 'explore_city', label: 'Explore the City', icon: 'map-outline', desc: 'Discover new places' },
  { id: 'conquer_territory', label: 'Conquer Territory', icon: 'grid-outline', desc: 'Dominate your neighborhood' },
];

export default function FitnessGoalsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    router.push('/(auth)/location');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.inner, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.progress}>
          {[true, true, true].map((active, i) => (
            <React.Fragment key={i}>
              <View style={[styles.progDot, { backgroundColor: colors.accent }]} />
              {i < 2 && <View style={[styles.progLine, { backgroundColor: colors.accent }]} />}
            </React.Fragment>
          ))}
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>What's your main goal?</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Your AI coach will personalize everything for you</Text>
        <View style={styles.goals}>
          {GOALS.map(g => (
            <TouchableOpacity key={g.id} onPress={() => setSelected(g.id)} activeOpacity={0.8}
              style={[styles.goal, { backgroundColor: selected === g.id ? colors.tintBackground : colors.card, borderColor: selected === g.id ? colors.accent : colors.border, borderRadius: colors.radius }]}>
              <View style={[styles.goalIcon, { backgroundColor: selected === g.id ? colors.accent : colors.muted }]}>
                <Ionicons name={g.icon as any} size={22} color={selected === g.id ? '#FFF' : colors.mutedForeground} />
              </View>
              <View style={styles.goalContent}>
                <Text style={[styles.goalLabel, { color: colors.foreground }]}>{g.label}</Text>
                <Text style={[styles.goalDesc, { color: colors.mutedForeground }]}>{g.desc}</Text>
              </View>
              {selected === g.id && <Ionicons name="checkmark-circle" size={22} color={colors.accent} />}
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Continue" onPress={handle} loading={loading} disabled={!selected} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
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
  sub: { fontSize: 15, fontFamily: 'Inter_400Regular', marginBottom: 24 },
  goals: { gap: 12 },
  goal: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1.5, gap: 12 },
  goalIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  goalContent: { flex: 1 },
  goalLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  goalDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function StartWalkScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Start Walk" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={[styles.mapPreview, { backgroundColor: colors.muted }]}>
          <Ionicons name="walk-outline" size={48} color={colors.accent} />
          <Text style={[styles.mapText, { color: colors.foreground }]}>Ready to Walk</Text>
          <Text style={[styles.mapSub, { color: colors.mutedForeground }]}>Every step captures territory</Text>
        </View>
        {[
          { label: 'Daily Step Goal', value: '10,000 steps', icon: 'footsteps-outline' },
          { label: 'Current Steps', value: '6,240 steps', icon: 'trending-up-outline' },
          { label: 'Calories per step', value: '~0.05 cal', icon: 'flame-outline' },
        ].map(s => (
          <View key={s.label} style={[styles.infoRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name={s.icon as any} size={20} color={colors.accent} />
            <Text style={[styles.infoLabel, { color: colors.foreground }]}>{s.label}</Text>
            <Text style={[styles.infoVal, { color: colors.mutedForeground }]}>{s.value}</Text>
          </View>
        ))}
        <Button title="Start Walk" onPress={() => router.push('/activity/active')} variant="primary" size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  mapPreview: { height: 200, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  mapText: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  mapSub: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, gap: 12 },
  infoLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  infoVal: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});

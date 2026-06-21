import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function StartCycleScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Start Cycle" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={[styles.mapPreview, { backgroundColor: colors.muted }]}>
          <Ionicons name="bicycle-outline" size={48} color="#F59E0B" />
          <Text style={[styles.mapText, { color: colors.foreground }]}>Ready to Ride</Text>
          <Text style={[styles.mapSub, { color: colors.mutedForeground }]}>Faster speed, more territory</Text>
        </View>
        {[
          { label: 'Average Speed', value: '18 km/h', icon: 'speedometer-outline' },
          { label: 'Calories/hr', value: '~450 cal', icon: 'flame-outline' },
          { label: 'Capture Rate', value: '2× territory', icon: 'grid-outline' },
        ].map(s => (
          <View key={s.label} style={[styles.infoRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name={s.icon as any} size={20} color="#F59E0B" />
            <Text style={[styles.infoLabel, { color: colors.foreground }]}>{s.label}</Text>
            <Text style={[styles.infoVal, { color: colors.mutedForeground }]}>{s.value}</Text>
          </View>
        ))}
        <Button title="Start Cycle" onPress={() => router.push('/activity/active')} variant="primary" size="lg" fullWidth style={{ backgroundColor: '#F59E0B' }} />
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

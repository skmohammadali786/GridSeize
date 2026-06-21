import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

export default function EventDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [joined, setJoined] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Event Details" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.hero, { backgroundColor: '#22C55E' }]}>
          <Text style={styles.heroTitle}>SF City Conquest Night</Text>
          <Text style={styles.heroSub}>Team Battle · Jun 28, 8PM</Text>
        </View>
        <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: 'calendar-outline' as const, label: 'Date', value: 'Jun 28, 2026, 8:00 PM' },
            { icon: 'location-outline' as const, label: 'Location', value: 'Downtown SF' },
            { icon: 'people-outline' as const, label: 'Participants', value: '142 joined' },
            { icon: 'trophy-outline' as const, label: 'Prize', value: '5,000 coins + Trophy Badge' },
          ].map(d => (
            <View key={d.label} style={styles.detailRow}>
              <View style={[styles.detailIcon, { backgroundColor: '#22C55E' + '18' }]}>
                <Ionicons name={d.icon} size={16} color="#22C55E" />
              </View>
              <View>
                <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>{d.label}</Text>
                <Text style={[styles.detailValue, { color: colors.foreground }]}>{d.value}</Text>
              </View>
            </View>
          ))}
        </View>
        <Button title={joined ? 'Joined ✓' : 'Join Event'} onPress={() => setJoined(true)} variant={joined ? 'outline' : 'primary'} size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 24, gap: 6 },
  heroTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  detailCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  detailIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  detailLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  detailValue: { fontSize: 14, fontFamily: 'Inter_500Medium', marginTop: 1 },
});

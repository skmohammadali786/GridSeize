import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Challenge" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Ionicons name="trophy" size={48} color="#F59E0B" />
          <Text style={styles.heroTitle}>Sprint King</Text>
          <Text style={styles.heroDiff}>Hard · 300 XP Prize</Text>
          <Text style={styles.heroDesc}>Run 5km in under 25 minutes to complete this challenge</Text>
        </View>
        <ProgressBar progress={0.65} height={10} showLabel label="Progress" />
        <View style={[styles.statsRow, { gap: 10 }]}>
          {[
            { label: 'Participants', value: '342' },
            { label: 'Time Left', value: '18h' },
            { label: 'Your Rank', value: '#47' },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
        <Button title="Start Challenge Run" onPress={() => router.push('/activity/start-run')} variant="primary" size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 10 },
  heroTitle: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroDiff: { fontSize: 14, color: '#F59E0B', fontFamily: 'Inter_600SemiBold' },
  heroDesc: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 21 },
  statsRow: { flexDirection: 'row' },
  statCard: { flex: 1, padding: 14, borderRadius: 14, borderWidth: 1, alignItems: 'center', gap: 4 },
  statVal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function AllianceDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Alliance" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroEmoji}>🌍</Text>
          <Text style={styles.heroName}>Western League</Text>
          <Text style={styles.heroRank}>Rank #3 · 8 Teams</Text>
          <View style={styles.statsRow}>
            {[{ label: 'Territories', val: '1,240' }, { label: 'Total XP', val: '2.4M' }, { label: 'Wars Won', val: '12' }].map(s => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <Button title="War Room" onPress={() => router.push('/alliances/war-room')} variant="primary" fullWidth />
        <View style={[styles.teamsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Member Teams</Text>
          {['GridSeizers', 'Bay Warriors', 'Mission Force', 'Haight Hunters'].map(t => (
            <View key={t} style={styles.teamRow}>
              <Ionicons name="shield-outline" size={16} color={colors.accent} />
              <Text style={[styles.teamName, { color: colors.foreground }]}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 10 },
  heroEmoji: { fontSize: 48 },
  heroName: { fontSize: 24, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroRank: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  statsRow: { flexDirection: 'row', gap: 28 },
  stat: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  teamsCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  cardTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  teamRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  teamName: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});

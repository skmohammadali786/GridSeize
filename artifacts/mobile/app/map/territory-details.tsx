import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function TerritoryDetailsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Territory Details" rightIcon="share-outline" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroName}>Financial District Alpha</Text>
              <Text style={styles.heroOwner}>Owned by: You</Text>
            </View>
            <Badge label="Level 4" variant="success" />
          </View>
          <View style={styles.heroStats}>
            {[
              { label: 'Hexes', value: '12', icon: 'grid-outline' },
              { label: 'Income', value: '340/hr', icon: 'cash-outline' },
              { label: 'Defense', value: '87%', icon: 'shield-outline' },
            ].map(s => (
              <View key={s.label} style={styles.heroStat}>
                <Ionicons name={s.icon as any} size={14} color="rgba(255,255,255,0.7)" />
                <Text style={styles.heroStatVal}>{s.value}</Text>
                <Text style={styles.heroStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Defense Level</Text>
        <ProgressBar progress={0.87} height={8} showLabel color={colors.accent} />
        <View style={styles.actions}>
          <Button title="Upgrade Territory" onPress={() => {}} variant="primary" style={{ flex: 1 }} />
          <Button title="View on Map" onPress={() => router.push('/(tabs)/map')} variant="outline" style={{ flex: 1 }} />
        </View>
        <View style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Activity</Text>
          {['Defended from HexRaider', 'Upgraded to Level 4', 'Captured 2 new hexes'].map(h => (
            <View key={h} style={styles.historyRow}>
              <Ionicons name="ellipse" size={8} color={colors.accent} />
              <Text style={[styles.historyText, { color: colors.mutedForeground }]}>{h}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 18, gap: 16 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroName: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroOwner: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between' },
  heroStat: { alignItems: 'center', gap: 4 },
  heroStatVal: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  actions: { flexDirection: 'row', gap: 10 },
  historyCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  historyText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
});

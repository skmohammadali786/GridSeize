import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

const ALLIANCES = [
  { id: '1', name: 'Western League', members: 8, territories: 1240, rank: 3, isMyAlliance: true },
  { id: '2', name: 'Eastern Front', members: 12, territories: 1890, rank: 1, isMyAlliance: false },
  { id: '3', name: 'Southern Bloc', members: 6, territories: 980, rank: 5, isMyAlliance: false },
];

export default function AlliancesScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Alliances" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.warCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="flame" size={32} color="#EF4444" />
          <View>
            <Text style={styles.warTitle}>Alliance War Active!</Text>
            <Text style={styles.warSub}>Western League vs Eastern Front · 18h remaining</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/alliances/1')} style={[styles.warBtn, { backgroundColor: colors.accent }]}>
            <Text style={styles.warBtnText}>War Room</Text>
          </TouchableOpacity>
        </View>
        {ALLIANCES.map(a => (
          <TouchableOpacity key={a.id} onPress={() => router.push(`/alliances/${a.id}` as any)} style={[styles.allianceCard, { backgroundColor: colors.card, borderColor: a.isMyAlliance ? colors.accent : colors.border }]} activeOpacity={0.85}>
            <View style={styles.allianceIcon}><Text style={{ fontSize: 28 }}>🌍</Text></View>
            <View style={styles.allianceContent}>
              <View style={styles.nameRow}>
                <Text style={[styles.allianceName, { color: colors.foreground }]}>{a.name}</Text>
                {a.isMyAlliance && <View style={[styles.myBadge, { backgroundColor: colors.accent }]}><Text style={styles.myBadgeText}>My Alliance</Text></View>}
              </View>
              <Text style={[styles.allianceMeta, { color: colors.mutedForeground }]}>Rank #{a.rank} · {a.members} teams · {a.territories.toLocaleString()} territories</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
        <Button title="Explore Alliances" onPress={() => {}} variant="outline" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  warCard: { borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  warTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#FFF' },
  warSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2, fontFamily: 'Inter_400Regular' },
  warBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  warBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  allianceCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1.5, gap: 12 },
  allianceIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  allianceContent: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  allianceName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  myBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  myBadgeText: { fontSize: 10, fontFamily: 'Inter_700Bold', color: '#FFF' },
  allianceMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});

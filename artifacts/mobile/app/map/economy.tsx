import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

export default function EconomyScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Territory Economy" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.summaryRow, { gap: 10 }]}>
          {[
            { label: 'Daily Income', value: '28,800', icon: 'cash-outline', color: '#22C55E' },
            { label: 'Total Earned', value: '1.2M', icon: 'trending-up-outline', color: '#0EA5E9' },
          ].map(s => (
            <View key={s.label} style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={s.icon as any} size={22} color={s.color} />
              <Text style={[styles.sumVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.sumLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Top Earning Territories</Text>
        {[
          { name: 'Financial District Alpha', income: 1200, level: 4 },
          { name: 'Union Square Beta', income: 980, level: 3 },
          { name: 'Marina Green Gamma', income: 760, level: 3 },
          { name: 'Embarcadero Delta', income: 640, level: 2 },
        ].map(t => (
          <TouchableOpacity key={t.name} onPress={() => router.push('/map/territory-details')} style={[styles.terrRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.terrDot, { backgroundColor: '#22C55E' }]} />
            <View style={styles.terrInfo}>
              <Text style={[styles.terrName, { color: colors.foreground }]}>{t.name}</Text>
              <Text style={[styles.terrMeta, { color: colors.mutedForeground }]}>Level {t.level}</Text>
            </View>
            <Text style={[styles.terrIncome, { color: colors.accent }]}>+{t.income}/hr</Text>
          </TouchableOpacity>
        ))}
        <View style={[styles.tipsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.tipsTitle, { color: colors.foreground }]}>💡 Economy Tips</Text>
          {['Upgrade territories to Level 3+ for 2× income', 'Defend high-value territories first', 'Form alliances to protect income streams'].map(tip => (
            <Text key={tip} style={[styles.tip, { color: colors.mutedForeground }]}>• {tip}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  summaryRow: { flexDirection: 'row' },
  summaryCard: { flex: 1, padding: 16, borderRadius: 14, borderWidth: 1, gap: 6 },
  sumVal: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  sumLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  terrRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 10 },
  terrDot: { width: 10, height: 10, borderRadius: 5 },
  terrInfo: { flex: 1 },
  terrName: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  terrMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  terrIncome: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  tipsCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 8 },
  tipsTitle: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  tip: { fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 20 },
});

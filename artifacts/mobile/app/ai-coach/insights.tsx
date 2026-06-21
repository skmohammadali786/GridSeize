import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function AIInsightsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="AI Insights" subtitle="Powered by your data" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {[
          { label: 'Fitness Score', value: 78, max: 100, color: '#22C55E', trend: '▲ +3 this week' },
          { label: 'Recovery Score', value: 82, max: 100, color: '#0EA5E9', trend: '▲ +5 today' },
          { label: 'Training Load', value: 65, max: 100, color: '#F59E0B', trend: '↔ Balanced' },
        ].map(s => (
          <View key={s.label} style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.metricTop}>
              <Text style={[styles.metricLabel, { color: colors.foreground }]}>{s.label}</Text>
              <View style={styles.metricRight}>
                <Text style={[styles.metricVal, { color: s.color }]}>{s.value}</Text>
                <Text style={[styles.metricTrend, { color: colors.mutedForeground }]}>{s.trend}</Text>
              </View>
            </View>
            <ProgressBar progress={s.value / s.max} color={s.color} height={8} />
          </View>
        ))}
        <View style={[styles.insightCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="sparkles" size={22} color={colors.accent} />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Weekly Analysis</Text>
            <Text style={styles.insightText}>Your consistency is excellent! You've completed 5 of 7 planned sessions. Focus on recovery tonight — your heart rate variability suggests mild fatigue.</Text>
          </View>
        </View>
        {['Best performance: Tuesday morning runs', 'Optimal distance: 5-8km range', 'Heart rate zone: 75-85% max', 'Recovery needs: 7-8 hours sleep'].map(i => (
          <View key={i} style={[styles.insightRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="bulb-outline" size={16} color={colors.warning} />
            <Text style={[styles.insightRowText, { color: colors.foreground }]}>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  metricCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  metricTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  metricRight: { alignItems: 'flex-end' },
  metricVal: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  metricTrend: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  insightCard: { borderRadius: 14, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  insightContent: { flex: 1, gap: 6 },
  insightTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#FFF' },
  insightText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  insightRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, borderWidth: 1 },
  insightRowText: { fontSize: 14, fontFamily: 'Inter_400Regular', flex: 1 },
});

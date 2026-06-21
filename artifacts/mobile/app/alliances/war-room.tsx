import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function WarRoomScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="War Room" subtitle="Active Alliance War" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.warHeader, { backgroundColor: '#7F1D1D' }]}>
          <Ionicons name="flame" size={32} color="#EF4444" />
          <Text style={styles.warTitle}>Western League vs Eastern Front</Text>
          <Text style={styles.warTimer}>18h 24m remaining</Text>
        </View>
        <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Territory Control</Text>
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreTeam, { color: '#22C55E' }]}>Western</Text>
            <Text style={[styles.scoreNum, { color: colors.foreground }]}>342 : 298</Text>
            <Text style={[styles.scoreTeam, { color: '#EF4444' }]}>Eastern</Text>
          </View>
          <ProgressBar progress={0.53} color="#22C55E" height={10} />
          <Text style={[styles.scoreNote, { color: colors.mutedForeground }]}>Western League leading by 44 territories</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Alliance Commands</Text>
          {['Defend Eastern District', 'Attack Market Street Cluster', 'Rally all teams at Union Square'].map(cmd => (
            <View key={cmd} style={[styles.cmdRow, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive + '22' }]}>
              <Ionicons name="megaphone-outline" size={16} color={colors.destructive} />
              <Text style={[styles.cmdText, { color: colors.foreground }]}>{cmd}</Text>
            </View>
          ))}
        </View>
        <Button title="Capture Territory for Alliance" onPress={() => {}} variant="primary" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  warHeader: { borderRadius: 16, padding: 20, alignItems: 'center', gap: 8 },
  warTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#FFF', textAlign: 'center' },
  warTimer: { fontSize: 14, color: '#FCA5A5', fontFamily: 'Inter_600SemiBold' },
  scoreCard: { padding: 16, borderRadius: 14, borderWidth: 1, gap: 12 },
  cardTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreTeam: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  scoreNum: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  scoreNote: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  commandCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  cmdRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1 },
  cmdText: { fontSize: 13, fontFamily: 'Inter_500Medium', flex: 1 },
});

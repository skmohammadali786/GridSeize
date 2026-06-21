import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/Avatar';

export default function BattleScreen() {
  const colors = useColors();
  const [phase, setPhase] = useState<'prep' | 'battle' | 'result'>('prep');
  const [myScore, setMyScore] = useState(0);
  const [opScore, setOpScore] = useState(0);

  const startBattle = () => {
    setPhase('battle');
    const interval = setInterval(() => {
      setMyScore(p => Math.min(100, p + Math.floor(Math.random() * 8) + 3));
      setOpScore(p => Math.min(100, p + Math.floor(Math.random() * 6) + 2));
    }, 300);
    setTimeout(() => { clearInterval(interval); setPhase('result'); }, 4000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Territory Battle" />
      {phase === 'prep' && (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <View style={[styles.battleCard, { backgroundColor: colors.primary }]}>
            <View style={styles.fighters}>
              <View style={styles.fighter}>
                <Avatar name="You" size={56} />
                <Text style={styles.fighterName}>You</Text>
                <Text style={styles.fighterLevel}>Level 24</Text>
              </View>
              <View style={styles.vsBox}><Text style={styles.vs}>VS</Text></View>
              <View style={styles.fighter}>
                <Avatar name="HexRaider" size={56} />
                <Text style={styles.fighterName}>HexRaider</Text>
                <Text style={styles.fighterLevel}>Level 19</Text>
              </View>
            </View>
            <Text style={styles.stakeText}>Prize: Financial District Alpha</Text>
          </View>
          <View style={[styles.rulesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.rulesTitle, { color: colors.foreground }]}>Battle Rules</Text>
            {['Run fastest in the territory', 'Capture more hexes = more points', 'Battle lasts 30 minutes', 'Winner takes the territory'].map(r => (
              <View key={r} style={styles.ruleRow}><Ionicons name="checkmark-circle-outline" size={16} color={colors.accent} /><Text style={[styles.ruleText, { color: colors.mutedForeground }]}>{r}</Text></View>
            ))}
          </View>
          <Button title="Accept Battle" onPress={startBattle} variant="primary" size="lg" fullWidth />
          <Button title="Decline" onPress={() => {}} variant="outline" size="lg" fullWidth />
        </ScrollView>
      )}
      {phase === 'battle' && (
        <View style={styles.battlePhase}>
          <Text style={[styles.battlingText, { color: colors.foreground }]}>Battle in Progress!</Text>
          <View style={styles.scoreboard}>
            <Text style={[styles.score, { color: colors.accent }]}>{myScore}</Text>
            <Text style={[styles.scoreDivider, { color: colors.mutedForeground }]}>:</Text>
            <Text style={[styles.score, { color: colors.destructive }]}>{opScore}</Text>
          </View>
          <Text style={[styles.runMsg, { color: colors.mutedForeground }]}>Run to capture hexes!</Text>
        </View>
      )}
      {phase === 'result' && (
        <View style={styles.resultPhase}>
          <Ionicons name={myScore > opScore ? 'trophy' : 'sad-outline'} size={64} color={myScore > opScore ? '#F59E0B' : colors.destructive} />
          <Text style={[styles.resultText, { color: colors.foreground }]}>{myScore > opScore ? 'Victory!' : 'Defeated'}</Text>
          <Text style={[styles.finalScore, { color: colors.mutedForeground }]}>{myScore} – {opScore}</Text>
          {myScore > opScore && <Text style={[styles.prize, { color: colors.accent }]}>You captured Financial District Alpha!</Text>}
          <Button title="Back to Map" onPress={() => {}} variant="primary" size="lg" fullWidth />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  battleCard: { borderRadius: 16, padding: 20, gap: 16 },
  fighters: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fighter: { alignItems: 'center', gap: 6 },
  fighterName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  fighterLevel: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  vsBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  vs: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  stakeText: { textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Inter_500Medium' },
  rulesCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  rulesTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ruleText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  battlePhase: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  battlingText: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  scoreboard: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  score: { fontSize: 64, fontFamily: 'Inter_700Bold' },
  scoreDivider: { fontSize: 40, fontFamily: 'Inter_300Light' },
  runMsg: { fontSize: 16, fontFamily: 'Inter_400Regular' },
  resultPhase: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  resultText: { fontSize: 32, fontFamily: 'Inter_700Bold' },
  finalScore: { fontSize: 24, fontFamily: 'Inter_600SemiBold' },
  prize: { fontSize: 16, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
});

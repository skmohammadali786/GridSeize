import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/contexts/AppContext';

const REWARDS = [
  { day: 1, label: '100 Coins', icon: '🪙', done: true },
  { day: 2, label: '150 Coins', icon: '🪙', done: true },
  { day: 3, label: '200 XP', icon: '⭐', done: true },
  { day: 4, label: '300 Coins', icon: '🪙', done: true },
  { day: 5, label: '500 XP', icon: '⭐', done: false, today: true },
  { day: 6, label: '1 Gem', icon: '💎', done: false },
  { day: 7, label: '1000 Coins + Rare Badge', icon: '🏆', done: false },
];

export default function DailyRewardScreen() {
  const colors = useColors();
  const { addCoins } = useApp();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    addCoins(500);
    setClaimed(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Daily Reward" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroEmoji}>🎁</Text>
          <Text style={styles.heroTitle}>Day 5 Reward!</Text>
          <Text style={styles.heroSub}>Keep your streak going</Text>
        </View>
        <View style={styles.grid}>
          {REWARDS.map(r => (
            <View key={r.day} style={[styles.rewardBox, { backgroundColor: r.done ? colors.tintBackground : r.today ? colors.card : colors.muted, borderColor: r.today ? colors.accent : r.done ? colors.accent + '44' : colors.border, borderWidth: r.today ? 2 : 1 }]}>
              {r.done && <View style={styles.doneOverlay}><Ionicons name="checkmark-circle" size={20} color={colors.accent} /></View>}
              <Text style={{ fontSize: 24 }}>{r.icon}</Text>
              <Text style={[styles.rewardLabel, { color: colors.foreground }]}>{r.label}</Text>
              <Text style={[styles.rewardDay, { color: colors.mutedForeground }]}>Day {r.day}</Text>
            </View>
          ))}
        </View>
        {!claimed ? (
          <Button title="Claim Day 5 Reward — 500 XP" onPress={handleClaim} variant="success" size="lg" fullWidth />
        ) : (
          <View style={[styles.claimedBanner, { backgroundColor: colors.tintBackground, borderColor: colors.accent }]}>
            <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
            <Text style={[styles.claimedText, { color: colors.accent }]}>Reward Claimed! Come back tomorrow for Day 6!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 16, padding: 24, alignItems: 'center', gap: 8 },
  heroEmoji: { fontSize: 48 },
  heroTitle: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_400Regular' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  rewardBox: { width: '30%', alignItems: 'center', padding: 12, borderRadius: 14, gap: 6, position: 'relative' },
  doneOverlay: { position: 'absolute', top: 6, right: 6 },
  rewardLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  rewardDay: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  claimedBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, borderRadius: 14, borderWidth: 1.5 },
  claimedText: { flex: 1, fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});

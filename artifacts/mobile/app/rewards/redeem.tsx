import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/contexts/AppContext';

export default function RedeemScreen() {
  const colors = useColors();
  const { coins, spendCoins } = useApp();
  const [redeemed, setRedeemed] = useState(false);
  const COST = 500;

  const handleRedeem = () => {
    if (coins >= COST) { spendCoins(COST); setRedeemed(true); }
  };

  if (redeemed) return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Redeemed!" />
      <View style={styles.success}>
        <Ionicons name="checkmark-circle" size={72} color={colors.accent} />
        <Text style={[styles.successTitle, { color: colors.foreground }]}>Successfully Redeemed!</Text>
        <Text style={[styles.successSub, { color: colors.mutedForeground }]}>Your reward code has been sent to your email address.</Text>
        <Button title="View All Rewards" onPress={() => router.replace('/rewards/index')} variant="primary" size="lg" fullWidth />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Redeem Reward" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.rewardPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.rewardIcon, { backgroundColor: '#F59E0B' + '18' }]}>
            <Ionicons name="gift-outline" size={40} color="#F59E0B" />
          </View>
          <Text style={[styles.rewardName, { color: colors.foreground }]}>Starbucks 20% Off</Text>
          <Text style={[styles.rewardDesc, { color: colors.mutedForeground }]}>Valid at any Starbucks location. One use per transaction.</Text>
          <Text style={[styles.sponsor, { color: colors.accent }]}>Sponsored by Starbucks</Text>
        </View>
        <View style={[styles.costCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.costLabel, { color: colors.mutedForeground }]}>Cost</Text>
          <View style={styles.costRow}>
            <Ionicons name="logo-bitcoin" size={18} color={colors.warning} />
            <Text style={[styles.costVal, { color: colors.foreground }]}>{COST} coins</Text>
          </View>
          <Text style={[styles.balance, { color: colors.mutedForeground }]}>Your balance: {coins.toLocaleString()} coins</Text>
        </View>
        <Button title={`Redeem for ${COST} Coins`} onPress={handleRedeem} variant="primary" size="lg" fullWidth disabled={coins < COST} />
        {coins < COST && <Text style={[styles.insufficient, { color: colors.destructive }]}>Insufficient coins. Need {COST - coins} more.</Text>}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  rewardPreview: { padding: 24, borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 10 },
  rewardIcon: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  rewardName: { fontSize: 20, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  rewardDesc: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 21 },
  sponsor: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  costCard: { padding: 16, borderRadius: 14, borderWidth: 1, gap: 8 },
  costLabel: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  costRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  costVal: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  balance: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  insufficient: { textAlign: 'center', fontSize: 13, fontFamily: 'Inter_500Medium' },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  successTitle: { fontSize: 24, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  successSub: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 22 },
});

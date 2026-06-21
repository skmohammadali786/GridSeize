import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Reward } from '@/constants/types';

interface RewardCardProps { reward: Reward; onPress?: () => void; }

export function RewardCard({ reward, onPress }: RewardCardProps) {
  const colors = useColors();
  const currencyIcon: Record<string, keyof typeof Ionicons.glyphMap> = { coins: 'logo-bitcoin', xp: 'star-outline', premium: 'diamond-outline' };
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius, opacity: reward.isAvailable ? 1 : 0.5 }]}>
      <View style={[styles.imgBox, { backgroundColor: colors.muted }]}>
        <Ionicons name="gift-outline" size={28} color={colors.accent} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>{reward.title}</Text>
        <Text style={[styles.desc, { color: colors.mutedForeground }]} numberOfLines={2}>{reward.description}</Text>
        {reward.sponsorName && <Text style={[styles.sponsor, { color: colors.accent }]}>{reward.sponsorName}</Text>}
      </View>
      <View style={styles.costBox}>
        <Ionicons name={currencyIcon[reward.currency]} size={14} color={colors.warning} />
        <Text style={[styles.cost, { color: colors.foreground }]}>{reward.cost}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, marginBottom: 10, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  imgBox: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  title: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  sponsor: { fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
  costBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cost: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});

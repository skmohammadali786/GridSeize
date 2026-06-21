import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { RewardCard } from '@/components/ui/RewardCard';
import { Ionicons } from '@expo/vector-icons';

const MOCK_REWARDS = [
  { id: '1', title: 'Starbucks 20% Off', description: 'Redeem at any Starbucks location', cost: 500, currency: 'coins' as const, isAvailable: true, sponsorName: 'Starbucks', category: 'food' },
  { id: '2', title: 'Nike Run Club Month', description: '30-day premium access', cost: 1200, currency: 'coins' as const, isAvailable: true, sponsorName: 'Nike', category: 'fitness' },
  { id: '3', title: 'Territory Shield', description: 'Protect 5 territories for 24h', cost: 800, currency: 'coins' as const, isAvailable: true, sponsorName: null, category: 'game' },
  { id: '4', title: 'XP Double Boost', description: '2× XP for next 3 activities', cost: 300, currency: 'coins' as const, isAvailable: true, sponsorName: null, category: 'game' },
  { id: '5', title: 'Lyft $5 Credit', description: '$5 off your next Lyft ride', cost: 400, currency: 'coins' as const, isAvailable: false, sponsorName: 'Lyft', category: 'travel' },
];

const TABS = ['All', 'Food', 'Fitness', 'Game', 'Travel'];

export default function RewardsScreen() {
  const colors = useColors();
  const { coins } = useApp();
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? MOCK_REWARDS : MOCK_REWARDS.filter(r => r.category === tab.toLowerCase());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Rewards Hub" rightIcon="time-outline" onRightPress={() => router.push('/rewards/history')} />
      {/* Balance */}
      <View style={[styles.balance, { backgroundColor: colors.primary }]}>
        <View style={styles.balItem}>
          <Ionicons name="logo-bitcoin" size={20} color={colors.warning} />
          <Text style={styles.balVal}>{coins.toLocaleString()}</Text>
          <Text style={styles.balLabel}>Coins</Text>
        </View>
        <View style={[styles.balDiv, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
        <View style={styles.balItem}>
          <Ionicons name="star" size={20} color={colors.accent} />
          <Text style={styles.balVal}>8,450</Text>
          <Text style={styles.balLabel}>XP</Text>
        </View>
        <View style={[styles.balDiv, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
        <View style={styles.balItem}>
          <Ionicons name="diamond" size={20} color="#8B5CF6" />
          <Text style={styles.balVal}>24</Text>
          <Text style={styles.balLabel}>Premium</Text>
        </View>
      </View>
      {/* Daily Reward */}
      <TouchableOpacity onPress={() => router.push('/rewards/daily')} style={[styles.dailyBanner, { backgroundColor: colors.tintBackground, borderColor: colors.accent }]}>
        <Ionicons name="gift" size={22} color={colors.accent} />
        <View>
          <Text style={[styles.dailyTitle, { color: colors.foreground }]}>Daily Reward Available!</Text>
          <Text style={[styles.dailySub, { color: colors.mutedForeground }]}>Claim your streak bonus</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.accent} />
      </TouchableOpacity>
      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.filterChip, { backgroundColor: tab === t ? colors.accent : colors.muted, borderColor: tab === t ? colors.accent : colors.border }]}>
            <Text style={[styles.filterText, { color: tab === t ? '#FFF' : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 2 }}>
        {filtered.map(r => <RewardCard key={r.id} reward={r} onPress={() => router.push('/rewards/redeem')} />)}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  balance: { flexDirection: 'row', padding: 16, justifyContent: 'space-around', alignItems: 'center' },
  balItem: { alignItems: 'center', gap: 4 },
  balVal: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFF' },
  balLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  balDiv: { width: 1, height: 40 },
  dailyBanner: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12, padding: 14, borderRadius: 14, borderWidth: 1.5, gap: 10 },
  dailyTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  dailySub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  tabsScroll: { paddingVertical: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100, borderWidth: 1 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});

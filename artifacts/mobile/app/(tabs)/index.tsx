import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';

const QUICK_ACTIONS = [
  { icon: 'fitness-outline', label: 'Start Run', route: '/activity/start-run', color: '#22C55E' },
  { icon: 'walk-outline', label: 'Walk', route: '/activity/start-walk', color: '#0EA5E9' },
  { icon: 'bicycle-outline', label: 'Cycle', route: '/activity/start-cycle', color: '#F59E0B' },
  { icon: 'grid-outline', label: 'Map', route: '/(tabs)/map', color: '#8B5CF6' },
] as const;

const MISSIONS = [
  { id: '1', title: 'Morning Warrior', desc: 'Run 3km before 9am', progress: 0.7, xp: 150 },
  { id: '2', title: 'Territory Expand', desc: 'Capture 5 new hexes', progress: 0.4, xp: 200 },
  { id: '3', title: 'Social Butterfly', desc: 'Follow 3 new players', progress: 0.33, xp: 75 },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, xp, coins, streak, level } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  };

  const xpToNext = 10000;
  const xpProgress = xp / xpToNext;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + (Platform.OS === 'web' ? 34 : 0) }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16) }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>Good morning,</Text>
          <Text style={[styles.name, { color: colors.foreground }]}>{user?.displayName?.split(' ')[0] || 'Explorer'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/rewards/index')} style={[styles.coinBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="logo-bitcoin" size={14} color={colors.warning} />
            <Text style={[styles.coinText, { color: colors.foreground }]}>{coins.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/community/notifications')} style={[styles.notifBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* XP Progress Card */}
        <Card style={[styles.xpCard, { backgroundColor: colors.primary }]}>
          <View style={styles.xpTop}>
            <View>
              <Text style={styles.xpLevel}>Level {level}</Text>
              <Text style={styles.xpRank}>{user?.rank || 'Explorer'}</Text>
            </View>
            <View style={styles.xpRight}>
              <Text style={styles.xpNum}>{xp.toLocaleString()}</Text>
              <Text style={styles.xpLabel}>/ {xpToNext.toLocaleString()} XP</Text>
            </View>
          </View>
          <ProgressBar progress={xpProgress} color={colors.accent} height={6} style={{ marginTop: 12 }} />
          <View style={styles.xpStats}>
            <View style={styles.xpStat}><Ionicons name="grid-outline" size={14} color="rgba(255,255,255,0.7)" /><Text style={styles.xpStatText}>{user?.territories || 0} Territories</Text></View>
            <View style={styles.xpStat}><Ionicons name="flame-outline" size={14} color="#F59E0B" /><Text style={styles.xpStatText}>{streak} Day Streak</Text></View>
          </View>
        </Card>

        {/* Quick Actions */}
        <SectionHeader title="Quick Start" />
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map(a => (
            <TouchableOpacity key={a.label} onPress={() => router.push(a.route as any)} style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: a.color + '18' }]}>
                <Ionicons name={a.icon as any} size={22} color={a.color} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.foreground }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Summary */}
        <View style={styles.statsRow}>
          {[
            { label: 'Distance', value: '4.2', unit: 'km', icon: 'navigate-outline', color: colors.accent },
            { label: 'Calories', value: '312', unit: 'cal', icon: 'flame-outline', color: '#F59E0B' },
            { label: 'Hexes', value: '7', unit: 'new', icon: 'grid-outline', color: '#8B5CF6' },
          ].map(s => (
            <TouchableOpacity key={s.label} onPress={() => router.push('/home/daily-summary')} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
              <Ionicons name={s.icon as any} size={18} color={s.color} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}<Text style={[styles.statUnit, { color: colors.mutedForeground }]}> {s.unit}</Text></Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active Missions */}
        <View style={styles.section}>
          <SectionHeader title="Daily Missions" actionLabel="See All" onAction={() => router.push('/challenges/missions')} />
          {MISSIONS.map(m => (
            <TouchableOpacity key={m.id} onPress={() => router.push('/challenges/missions')} style={[styles.mission, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
              <View style={styles.missionInfo}>
                <Text style={[styles.missionTitle, { color: colors.foreground }]}>{m.title}</Text>
                <Text style={[styles.missionDesc, { color: colors.mutedForeground }]}>{m.desc}</Text>
                <ProgressBar progress={m.progress} height={5} style={{ marginTop: 8 }} />
              </View>
              <Badge label={`+${m.xp} XP`} variant="success" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Territory & Leaderboard shortcuts */}
        <View style={styles.section}>
          <SectionHeader title="Your Territory" actionLabel="View Map" onAction={() => router.push('/(tabs)/map')} />
          <View style={styles.territoryRow}>
            {[
              { label: 'Owned', value: user?.territories || 47, icon: 'grid-outline', color: colors.accent },
              { label: 'Income', value: '1.2k', icon: 'cash-outline', color: '#10B981', suffix: '/hr' },
              { label: 'Rank', value: '#142', icon: 'trophy-outline', color: '#F59E0B' },
            ].map(t => (
              <TouchableOpacity key={t.label} onPress={() => router.push('/(tabs)/map')} style={[styles.terCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
                <Ionicons name={t.icon as any} size={18} color={t.color} />
                <Text style={[styles.terVal, { color: colors.foreground }]}>{t.value}{t.suffix || ''}</Text>
                <Text style={[styles.terLabel, { color: colors.mutedForeground }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Players */}
        <View style={styles.section}>
          <SectionHeader title="Nearby Players" actionLabel="View All" onAction={() => router.push('/map/nearby-players')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playersScroll}>
            {['TerritoryKing', 'RunQueen', 'HexMaster', 'CityConq', 'SpeedDemon'].map((name, i) => (
              <TouchableOpacity key={name} onPress={() => router.push(`/community/user/${i + 1}` as any)} style={[styles.playerCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
                <Avatar name={name} size={44} isOnline={i < 3} />
                <Text style={[styles.playerName, { color: colors.foreground }]} numberOfLines={1}>{name}</Text>
                <Text style={[styles.playerDist, { color: colors.mutedForeground }]}>{(0.3 + i * 0.4).toFixed(1)} km</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* AI Recommendation */}
        <TouchableOpacity onPress={() => router.push('/ai-coach/index')} style={[styles.aiCard, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
          <View style={styles.aiLeft}>
            <View style={[styles.aiIcon, { backgroundColor: colors.accent + '22' }]}>
              <Ionicons name="sparkles-outline" size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={styles.aiTitle}>AI Coach Insight</Text>
              <Text style={styles.aiDesc}>Best time to run: 6–8 PM today</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerLeft: {},
  greeting: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  name: { fontSize: 24, fontFamily: 'Inter_700Bold' },
  headerRight: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  coinBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  coinText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  notifBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  content: { paddingHorizontal: 20, gap: 20 },
  xpCard: { padding: 18, borderWidth: 0 },
  xpTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  xpLevel: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFFFFF' },
  xpRank: { fontSize: 13, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  xpRight: { alignItems: 'flex-end' },
  xpNum: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  xpLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.5)' },
  xpStats: { flexDirection: 'row', gap: 16, marginTop: 12 },
  xpStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  xpStatText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.7)' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 8 },
  actionIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 4 },
  statVal: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  statUnit: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  section: { gap: 0 },
  mission: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8, gap: 12 },
  missionInfo: { flex: 1 },
  missionTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  missionDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  territoryRow: { flexDirection: 'row', gap: 10 },
  terCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 4 },
  terVal: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  terLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  playersScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  playerCard: { alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginRight: 10, width: 90, gap: 6 },
  playerName: { fontSize: 11, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  playerDist: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  aiCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 14 },
  aiLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  aiTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#FFFFFF' },
  aiDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', marginTop: 2 },
});

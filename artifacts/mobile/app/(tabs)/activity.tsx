import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { Activity } from '@/constants/types';

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'run', distance: 5.2, duration: 1920, calories: 412, pace: 369, startedAt: new Date(Date.now() - 86400000).toISOString(), endedAt: new Date(Date.now() - 84480000).toISOString(), xpEarned: 340, territoriesCaptured: 7 },
  { id: '2', type: 'cycle', distance: 12.8, duration: 2700, calories: 380, pace: 211, startedAt: new Date(Date.now() - 172800000).toISOString(), endedAt: new Date(Date.now() - 170100000).toISOString(), xpEarned: 280, territoriesCaptured: 12 },
  { id: '3', type: 'walk', distance: 3.1, duration: 2400, calories: 185, pace: 774, startedAt: new Date(Date.now() - 259200000).toISOString(), endedAt: new Date(Date.now() - 256800000).toISOString(), xpEarned: 120, territoriesCaptured: 3 },
];

const START_TYPES = [
  { type: 'run', icon: 'fitness-outline', label: 'Run', color: '#22C55E', route: '/activity/start-run' },
  { type: 'walk', icon: 'walk-outline', label: 'Walk', color: '#0EA5E9', route: '/activity/start-walk' },
  { type: 'cycle', icon: 'bicycle-outline', label: 'Cycle', color: '#F59E0B', route: '/activity/start-cycle' },
] as const;

export default function ActivityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + (Platform.OS === 'web' ? 34 : 0) }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16) }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Activity</Text>
        <TouchableOpacity onPress={() => router.push('/activity/goals')} style={[styles.goalBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="trophy-outline" size={18} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Start Activity */}
        <View>
          <SectionHeader title="Start Activity" />
          <View style={styles.startRow}>
            {START_TYPES.map(s => (
              <TouchableOpacity key={s.type} onPress={() => router.push(s.route as any)}
                style={[styles.startBtn, { backgroundColor: s.color }]} activeOpacity={0.85}>
                <Ionicons name={s.icon as any} size={28} color="#FFF" />
                <Text style={styles.startLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Stats */}
        <View style={[styles.weekCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.weekTitle, { color: colors.foreground }]}>This Week</Text>
          <View style={styles.weekStats}>
            {[
              { label: 'Distance', value: '23.4 km', icon: 'navigate-outline', color: colors.accent },
              { label: 'Duration', value: '4h 12m', icon: 'time-outline', color: '#0EA5E9' },
              { label: 'Calories', value: '1,840', icon: 'flame-outline', color: '#F59E0B' },
              { label: 'XP Earned', value: '1,240', icon: 'star-outline', color: '#8B5CF6' },
            ].map(s => (
              <View key={s.label} style={styles.weekStat}>
                <Ionicons name={s.icon as any} size={16} color={s.color} />
                <Text style={[styles.weekStatVal, { color: colors.foreground }]}>{s.value}</Text>
                <Text style={[styles.weekStatLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Routes */}
        <View>
          <SectionHeader title="Routes" actionLabel="Plan Route" onAction={() => router.push('/routes/index')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routeScroll}>
            {[
              { name: 'Golden Gate Loop', dist: '8.2 km', diff: 'Moderate', safety: 92, color: '#22C55E' },
              { name: 'Bay Bridge Path', dist: '5.6 km', diff: 'Easy', safety: 95, color: '#0EA5E9' },
              { name: 'Mission Hills', dist: '11.3 km', diff: 'Hard', safety: 78, color: '#F59E0B' },
            ].map(r => (
              <TouchableOpacity key={r.name} onPress={() => router.push('/routes/index')} style={[styles.routeCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
                <View style={[styles.routeDiff, { backgroundColor: r.color + '22' }]}>
                  <Text style={[styles.routeDiffText, { color: r.color }]}>{r.diff}</Text>
                </View>
                <Text style={[styles.routeName, { color: colors.foreground }]}>{r.name}</Text>
                <View style={styles.routeMeta}>
                  <Text style={[styles.routeDist, { color: colors.mutedForeground }]}>{r.dist}</Text>
                  <View style={styles.routeSafety}>
                    <Ionicons name="shield-checkmark-outline" size={12} color="#22C55E" />
                    <Text style={[styles.routeSafetyText, { color: '#22C55E' }]}>{r.safety}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities */}
        <View>
          <SectionHeader title="Recent Activities" actionLabel="View All" onAction={() => router.push('/profile/activity-history')} />
          {MOCK_ACTIVITIES.map(a => (
            <ActivityCard key={a.id} activity={a} onPress={() => router.push('/activity/summary')} />
          ))}
        </View>

        {/* Quick Links */}
        <View>
          <SectionHeader title="More" />
          <View style={styles.moreLinks}>
            {[
              { label: 'Personal Records', icon: 'trophy-outline', route: '/profile/records' },
              { label: 'Challenges', icon: 'flash-outline', route: '/challenges/index' },
              { label: 'Heart Rate', icon: 'heart-outline', route: '/activity/heart-rate' },
              { label: 'Export Data', icon: 'download-outline', route: '/activity/export' },
            ].map(l => (
              <TouchableOpacity key={l.label} onPress={() => router.push(l.route as any)}
                style={[styles.moreLink, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
                <Ionicons name={l.icon as any} size={20} color={colors.foreground} />
                <Text style={[styles.moreLinkText, { color: colors.foreground }]}>{l.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  goalBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  content: { paddingHorizontal: 20, gap: 24 },
  startRow: { flexDirection: 'row', gap: 10 },
  startBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderRadius: 16, gap: 8 },
  startLabel: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#FFF' },
  weekCard: { padding: 16, borderRadius: 16, borderWidth: 1 },
  weekTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  weekStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  weekStat: { width: '45%', gap: 4 },
  weekStatVal: { fontSize: 18, fontFamily: 'Inter_700Bold', marginTop: 4 },
  weekStatLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  routeScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  routeCard: { width: 180, padding: 14, borderRadius: 14, borderWidth: 1, marginRight: 10, gap: 8 },
  routeDiff: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, alignSelf: 'flex-start' },
  routeDiffText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  routeName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  routeMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeDist: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  routeSafety: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  routeSafetyText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  moreLinks: { gap: 8 },
  moreLink: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, borderWidth: 1 },
  moreLinkText: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium' },
});

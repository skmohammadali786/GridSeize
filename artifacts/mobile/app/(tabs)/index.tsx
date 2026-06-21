import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Platform, Animated,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

// ─── Mock data ────────────────────────────────────────────────────────────────

const WEEKLY_LOAD = [
  { day: 'Mo', tss: 85, label: '85' },
  { day: 'Tu', tss: 110, label: '110' },
  { day: 'We', tss: 45, label: '45' },
  { day: 'Th', tss: 130, label: '130' },
  { day: 'Fr', tss: 0, label: '' },
  { day: 'Sa', tss: 155, label: '155' },
  { day: 'Su', tss: 90, label: '90' },
];
const MAX_TSS = 160;

const RECENT_ACTIVITIES = [
  {
    id: '1', type: 'run', icon: 'fitness-outline', iconColor: '#22C55E', label: 'Morning Run',
    date: 'Today, 6:42 AM', distance: '8.4 km', duration: '42:17', pace: '5:02/km',
    avgHr: 156, calories: 487, tss: 74,
    zones: [{ z: 1, pct: 0.04, color: '#94A3B8' }, { z: 2, pct: 0.18, color: '#0EA5E9' },
            { z: 3, pct: 0.38, color: '#22C55E' }, { z: 4, pct: 0.32, color: '#F59E0B' },
            { z: 5, pct: 0.08, color: '#EF4444' }],
  },
  {
    id: '2', type: 'cycle', icon: 'bicycle-outline', iconColor: '#F59E0B', label: 'Evening Ride',
    date: 'Yesterday, 5:15 PM', distance: '22.1 km', duration: '57:44', pace: '23.0 km/h',
    avgHr: 138, calories: 612, tss: 62,
    zones: [{ z: 1, pct: 0.08, color: '#94A3B8' }, { z: 2, pct: 0.35, color: '#0EA5E9' },
            { z: 3, pct: 0.42, color: '#22C55E' }, { z: 4, pct: 0.12, color: '#F59E0B' },
            { z: 5, pct: 0.03, color: '#EF4444' }],
  },
  {
    id: '3', type: 'walk', icon: 'walk-outline', iconColor: '#8B5CF6', label: 'Recovery Walk',
    date: 'Jun 19, 8:00 AM', distance: '3.2 km', duration: '38:12', pace: '11:56/km',
    avgHr: 104, calories: 198, tss: 18,
    zones: [{ z: 1, pct: 0.72, color: '#94A3B8' }, { z: 2, pct: 0.24, color: '#0EA5E9' },
            { z: 3, pct: 0.04, color: '#22C55E' }, { z: 4, pct: 0, color: '#F59E0B' },
            { z: 5, pct: 0, color: '#EF4444' }],
  },
];

const QUICK_ACTIONS = [
  { icon: 'fitness-outline', label: 'Run', route: '/activity/start-run', color: '#22C55E' },
  { icon: 'walk-outline', label: 'Walk', route: '/activity/start-walk', color: '#0EA5E9' },
  { icon: 'bicycle-outline', label: 'Cycle', route: '/activity/start-cycle', color: '#F59E0B' },
  { icon: 'grid-outline', label: 'Map', route: '/(tabs)/map', color: '#8B5CF6' },
] as const;

const MISSIONS = [
  { id: '1', title: 'Morning Warrior', desc: 'Run 3km before 9am', progress: 1.0, xp: 150, done: true },
  { id: '2', title: 'Territory Expand', desc: 'Capture 5 new hexes', progress: 0.4, xp: 200, done: false },
  { id: '3', title: 'Endurance Builder', desc: 'Log 40km this week', progress: 0.68, xp: 300, done: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FitnessMetricBox({ label, value, delta, color, sub }: {
  label: string; value: number; delta?: string; color: string; sub?: string;
}) {
  const colors = useColors();
  return (
    <View style={fitStyles.box}>
      <Text style={[fitStyles.metricLabel, { color: 'rgba(255,255,255,0.55)' }]}>{label}</Text>
      <View style={fitStyles.valueRow}>
        <Text style={[fitStyles.metricValue, { color: '#FFFFFF' }]}>{value}</Text>
        {delta ? <Text style={[fitStyles.delta, { color }]}>{delta}</Text> : null}
      </View>
      {sub ? <Text style={[fitStyles.sub, { color: color + 'CC' }]}>{sub}</Text> : null}
      <View style={[fitStyles.metricBar, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
        <View style={[fitStyles.metricFill, { backgroundColor: color, width: `${Math.min(100, Math.abs(value))}%` as any }]} />
      </View>
    </View>
  );
}

const fitStyles = StyleSheet.create({
  box: { flex: 1 },
  metricLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  metricValue: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  delta: { fontSize: 12, fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
  sub: { fontSize: 11, fontFamily: 'Inter_500Medium', marginBottom: 6 },
  metricBar: { height: 4, borderRadius: 2, overflow: 'hidden', marginTop: 8 },
  metricFill: { height: 4, borderRadius: 2 },
});

function ZoneBar({ zones }: { zones: { z: number; pct: number; color: string }[] }) {
  return (
    <View style={{ flexDirection: 'row', height: 6, borderRadius: 3, overflow: 'hidden', gap: 1 }}>
      {zones.map(z => z.pct > 0 && (
        <View key={z.z} style={{ flex: z.pct, backgroundColor: z.color }} />
      ))}
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, xp, coins, streak, level } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  };

  const todayTss = WEEKLY_LOAD[5].tss;
  const weekTss = WEEKLY_LOAD.reduce((a, d) => a + d.tss, 0);
  const fitness = 54;
  const fatigue = 72;
  const form = fitness - fatigue;
  const formPositive = form >= 0;
  const displayActivities = showAllActivities ? RECENT_ACTIVITIES : RECENT_ACTIVITIES.slice(0, 2);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 110 + (Platform.OS === 'web' ? 34 : 0) }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16) }]}>
        <TouchableOpacity onPress={() => router.push('/profile/index' as any)} style={styles.headerLeft} activeOpacity={0.7}>
          <Avatar name={user?.displayName || 'G'} size={40} isOnline />
          <View>
            <Text style={[styles.greeting, { color: colors.mutedForeground }]}>{greeting},</Text>
            <Text style={[styles.name, { color: colors.foreground }]}>{user?.displayName?.split(' ')[0] || 'Explorer'}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/rewards/index')} style={[styles.chipBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="logo-bitcoin" size={14} color={colors.warning} />
            <Text style={[styles.chipText, { color: colors.foreground }]}>{coins.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/community/notifications')} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
            <View style={[styles.notifDot, { backgroundColor: colors.destructive }]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>

        {/* ── Fitness Card (Intervals.icu style) ── */}
        <Card style={[styles.fitnessCard, { backgroundColor: '#0F172A' }]}>
          <View style={styles.fitnessHeader}>
            <View>
              <Text style={styles.fitnessTitle}>FITNESS METRICS</Text>
              <Text style={styles.fitnessSubtitle}>Based on last 42 days of training</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/ai-coach/index')} style={styles.fitnessBtn}>
              <Ionicons name="analytics-outline" size={16} color='#22C55E' />
            </TouchableOpacity>
          </View>

          <View style={styles.metricsRow}>
            <FitnessMetricBox label="Fitness" value={fitness} delta="↑2" color="#22C55E" sub="CTL" />
            <View style={[styles.metricDivider, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />
            <FitnessMetricBox label="Fatigue" value={fatigue} delta="↑8" color="#F59E0B" sub="ATL" />
            <View style={[styles.metricDivider, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />
            <FitnessMetricBox label="Form" value={form} delta={formPositive ? '↑' : '↓'} color={formPositive ? '#22C55E' : '#EF4444'} sub="TSB" />
          </View>

          <View style={styles.phaseRow}>
            <View style={[styles.phasePill, { backgroundColor: '#22C55E20', borderColor: '#22C55E40' }]}>
              <View style={[styles.phaseDot, { backgroundColor: '#22C55E' }]} />
              <Text style={[styles.phaseText, { color: '#22C55E' }]}>Build Phase</Text>
            </View>
            <Text style={styles.phaseMeta}>Week TSS: {weekTss} · 7-day ATL: {fatigue}</Text>
          </View>
        </Card>

        {/* ── Weekly Training Load Chart ── */}
        <Card style={[styles.loadCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.loadHeader}>
            <View>
              <Text style={[styles.loadTitle, { color: colors.foreground }]}>Training Load</Text>
              <Text style={[styles.loadSub, { color: colors.mutedForeground }]}>This week: <Text style={{ color: colors.accent, fontFamily: 'Inter_700Bold' }}>{weekTss} TSS</Text></Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/activity/history' as any)}>
              <Text style={[styles.seeAll, { color: colors.accent }]}>History</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartWrap}>
            {WEEKLY_LOAD.map((d, i) => {
              const isToday = i === new Date().getDay() - 1;
              const barH = d.tss === 0 ? 2 : Math.max(4, (d.tss / MAX_TSS) * 90);
              return (
                <View key={d.day} style={styles.barCol}>
                  {d.tss > 0 && <Text style={[styles.barLabel, { color: colors.mutedForeground }]}>{d.label}</Text>}
                  <View style={styles.barTrack}>
                    <View style={[
                      styles.bar,
                      { height: barH, backgroundColor: isToday ? colors.accent : d.tss === 0 ? colors.border : colors.primary + 'CC' }
                    ]} />
                  </View>
                  <Text style={[styles.dayLabel, { color: isToday ? colors.accent : colors.mutedForeground, fontFamily: isToday ? 'Inter_700Bold' : 'Inter_400Regular' }]}>{d.day}</Text>
                </View>
              );
            })}
          </View>

          {/* Zone legend */}
          <View style={styles.zoneLegend}>
            {[
              { z: 1, label: 'Z1', color: '#94A3B8' }, { z: 2, label: 'Z2', color: '#0EA5E9' },
              { z: 3, label: 'Z3', color: '#22C55E' }, { z: 4, label: 'Z4', color: '#F59E0B' },
              { z: 5, label: 'Z5', color: '#EF4444' },
            ].map(z => (
              <View key={z.z} style={styles.zoneItem}>
                <View style={[styles.zoneDot, { backgroundColor: z.color }]} />
                <Text style={[styles.zoneLabel, { color: colors.mutedForeground }]}>{z.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* ── Quick Start ── */}
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map(a => (
            <TouchableOpacity
              key={a.label}
              onPress={() => router.push(a.route as any)}
              style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIcon, { backgroundColor: a.color + '18' }]}>
                <Ionicons name={a.icon as any} size={22} color={a.color} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.foreground }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Today's Stats ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'Distance', value: '8.4', unit: 'km', icon: 'navigate-outline', color: colors.accent },
            { label: 'Moving Time', value: '42:17', unit: '', icon: 'time-outline', color: '#0EA5E9' },
            { label: 'Calories', value: '487', unit: 'cal', icon: 'flame-outline', color: '#F59E0B' },
            { label: 'Avg HR', value: '156', unit: 'bpm', icon: 'heart-outline', color: '#EF4444' },
          ].map(s => (
            <TouchableOpacity key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
              <Ionicons name={s.icon as any} size={16} color={s.color} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>
                {s.value}
                {s.unit ? <Text style={[styles.statUnit, { color: colors.mutedForeground }]}>{'\n'}{s.unit}</Text> : null}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Recent Activities ── */}
        <View>
          <SectionHeader
            title="Recent Activities"
            actionLabel={showAllActivities ? 'Less' : 'See All'}
            onAction={() => setShowAllActivities(p => !p)}
          />
          {displayActivities.map(act => (
            <TouchableOpacity
              key={act.id}
              onPress={() => router.push('/activity/history' as any)}
              style={[styles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.85}
            >
              <View style={styles.actTop}>
                <View style={[styles.actIconWrap, { backgroundColor: act.iconColor + '18' }]}>
                  <Ionicons name={act.icon as any} size={18} color={act.iconColor} />
                </View>
                <View style={styles.actInfo}>
                  <Text style={[styles.actName, { color: colors.foreground }]}>{act.label}</Text>
                  <Text style={[styles.actDate, { color: colors.mutedForeground }]}>{act.date}</Text>
                </View>
                <View style={[styles.tssPill, { backgroundColor: colors.accent + '18' }]}>
                  <Text style={[styles.tssText, { color: colors.accent }]}>{act.tss} TSS</Text>
                </View>
              </View>

              <View style={styles.actMetrics}>
                {[
                  { icon: 'navigate-outline', val: act.distance },
                  { icon: 'time-outline', val: act.duration },
                  { icon: 'speedometer-outline', val: act.pace },
                  { icon: 'heart-outline', val: `${act.avgHr} bpm` },
                ].map((m, i) => (
                  <View key={i} style={styles.actMetric}>
                    <Ionicons name={m.icon as any} size={12} color={colors.mutedForeground} />
                    <Text style={[styles.actMetricVal, { color: colors.foreground }]}>{m.val}</Text>
                  </View>
                ))}
              </View>

              {/* HR Zone Distribution */}
              <View style={styles.zoneSection}>
                <Text style={[styles.zoneSectionLabel, { color: colors.mutedForeground }]}>HR Zones</Text>
                <ZoneBar zones={act.zones} />
                <View style={styles.zoneRow}>
                  {act.zones.map(z => z.pct > 0 && (
                    <Text key={z.z} style={[styles.zonePct, { color: z.color }]}>{Math.round(z.pct * 100)}%</Text>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Territory ── */}
        <View>
          <SectionHeader title="Your Territory" actionLabel="View Map" onAction={() => router.push('/(tabs)/map')} />
          <View style={styles.territoryRow}>
            {[
              { label: 'Owned', value: '47', suffix: ' hexes', icon: 'grid-outline', color: colors.accent },
              { label: 'Income', value: '1.2k', suffix: '/hr', icon: 'cash-outline', color: '#10B981' },
              { label: 'Global', value: '#142', suffix: '', icon: 'trophy-outline', color: '#F59E0B' },
            ].map(t => (
              <TouchableOpacity key={t.label} onPress={() => router.push('/(tabs)/map')} style={[styles.terCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
                <Ionicons name={t.icon as any} size={18} color={t.color} />
                <Text style={[styles.terVal, { color: colors.foreground }]}>{t.value}<Text style={[styles.terSuffix, { color: colors.mutedForeground }]}>{t.suffix}</Text></Text>
                <Text style={[styles.terLabel, { color: colors.mutedForeground }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Daily Missions ── */}
        <View>
          <SectionHeader title="Daily Missions" actionLabel="All Missions" onAction={() => router.push('/challenges/missions')} />
          {MISSIONS.map(m => (
            <TouchableOpacity key={m.id} onPress={() => router.push('/challenges/missions')} style={[styles.mission, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
              <View style={[styles.missionDone, { backgroundColor: m.done ? '#22C55E20' : colors.tintBackground || colors.border + '20', borderColor: m.done ? '#22C55E40' : colors.border }]}>
                <Ionicons name={m.done ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={m.done ? '#22C55E' : colors.mutedForeground} />
              </View>
              <View style={styles.missionInfo}>
                <Text style={[styles.missionTitle, { color: m.done ? colors.mutedForeground : colors.foreground, textDecorationLine: m.done ? 'line-through' : 'none' }]}>{m.title}</Text>
                <Text style={[styles.missionDesc, { color: colors.mutedForeground }]}>{m.desc}</Text>
                {!m.done && <ProgressBar progress={m.progress} height={4} style={{ marginTop: 6 }} />}
              </View>
              <View style={[styles.xpPill, { backgroundColor: m.done ? '#22C55E20' : colors.accent + '18' }]}>
                <Text style={[styles.xpText, { color: m.done ? '#22C55E' : colors.accent }]}>+{m.xp} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Streak + Level Row ── */}
        <View style={styles.streakRow}>
          <Card style={[styles.streakCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="flame" size={22} color="#F59E0B" />
            <Text style={[styles.streakNum, { color: colors.foreground }]}>{streak}</Text>
            <Text style={[styles.streakLabel, { color: colors.mutedForeground }]}>Day Streak</Text>
          </Card>
          <Card style={[styles.streakCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="star" size={22} color={colors.accent} />
            <Text style={[styles.streakNum, { color: colors.foreground }]}>Lv {level}</Text>
            <Text style={[styles.streakLabel, { color: colors.mutedForeground }]}>{xp.toLocaleString()} XP</Text>
          </Card>
          <Card style={[styles.streakCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="people" size={22} color="#8B5CF6" />
            <Text style={[styles.streakNum, { color: colors.foreground }]}>1.2k</Text>
            <Text style={[styles.streakLabel, { color: colors.mutedForeground }]}>Followers</Text>
          </Card>
        </View>

        {/* ── AI Coach ── */}
        <TouchableOpacity onPress={() => router.push('/ai-coach/index')} style={[styles.aiCard, { backgroundColor: '#0F172A' }]} activeOpacity={0.9}>
          <View style={styles.aiLeft}>
            <View style={[styles.aiIcon, { backgroundColor: '#22C55E22' }]}>
              <Ionicons name="sparkles-outline" size={20} color="#22C55E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>AI Coach Insight</Text>
              <Text style={styles.aiDesc}>Form is {formPositive ? 'positive — great day to push hard' : 'negative — consider a recovery session'}. Best window: 6–8 PM.</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.35)" />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  greeting: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  name: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  headerRight: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  chipBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  iconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 4 },

  content: { paddingHorizontal: 20, gap: 20 },

  // Fitness Card
  fitnessCard: { padding: 18, borderWidth: 0 },
  fitnessHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 },
  fitnessTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.2, textTransform: 'uppercase' },
  fitnessSubtitle: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.35)', marginTop: 2 },
  fitnessBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#22C55E22', alignItems: 'center', justifyContent: 'center' },
  metricsRow: { flexDirection: 'row', gap: 0 },
  metricDivider: { width: 1, marginHorizontal: 14, marginVertical: 4 },
  phaseRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  phasePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, borderWidth: 1 },
  phaseDot: { width: 6, height: 6, borderRadius: 3 },
  phaseText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  phaseMeta: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.35)' },

  // Load Chart
  loadCard: { padding: 16, borderWidth: 1, borderRadius: 14 },
  loadHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  loadTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  loadSub: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  seeAll: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', height: 110, gap: 4 },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  barTrack: { flex: 1, justifyContent: 'flex-end', width: '100%', alignItems: 'center' },
  bar: { width: '85%', borderRadius: 4, minHeight: 2 },
  barLabel: { fontSize: 8, fontFamily: 'Inter_500Medium' },
  dayLabel: { fontSize: 10, marginTop: 4 },
  zoneLegend: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 12 },
  zoneItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  zoneDot: { width: 8, height: 8, borderRadius: 4 },
  zoneLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },

  // Quick Actions
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 7 },
  actionIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },

  // Today Stats
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, gap: 2 },
  statVal: { fontSize: 15, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  statUnit: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  statLabel: { fontSize: 9, fontFamily: 'Inter_400Regular', textAlign: 'center' },

  // Activity Cards
  activityCard: { padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10, gap: 10 },
  actTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actIconWrap: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actInfo: { flex: 1 },
  actName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  actDate: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  tssPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tssText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  actMetrics: { flexDirection: 'row', gap: 12 },
  actMetric: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  actMetricVal: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  zoneSection: { gap: 4 },
  zoneSectionLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.5 },
  zoneRow: { flexDirection: 'row', gap: 6, marginTop: 2 },
  zonePct: { fontSize: 10, fontFamily: 'Inter_700Bold' },

  // Territory
  territoryRow: { flexDirection: 'row', gap: 10 },
  terCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 4 },
  terVal: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  terSuffix: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  terLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },

  // Missions
  mission: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 8, gap: 12 },
  missionDone: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  missionInfo: { flex: 1 },
  missionTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  missionDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  xpPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  xpText: { fontSize: 11, fontFamily: 'Inter_700Bold' },

  // Streak Row
  streakRow: { flexDirection: 'row', gap: 10 },
  streakCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 4 },
  streakNum: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  streakLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },

  // AI Card
  aiCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 14 },
  aiLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  aiTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#FFFFFF', marginBottom: 3 },
  aiDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)', lineHeight: 17 },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

const STATS = [
  { label: 'Territories', value: '47' },
  { label: 'Followers', value: '1.2K' },
  { label: 'Following', value: '342' },
];

const MENU_SECTIONS = [
  {
    title: 'Progress',
    items: [
      { label: 'Achievements', icon: 'trophy-outline', route: '/profile/achievements' },
      { label: 'Badges', icon: 'ribbon-outline', route: '/profile/badges' },
      { label: 'Levels & XP', icon: 'star-outline', route: '/profile/levels' },
      { label: 'Personal Records', icon: 'speedometer-outline', route: '/profile/records' },
    ],
  },
  {
    title: 'History',
    items: [
      { label: 'Activity History', icon: 'fitness-outline', route: '/profile/activity-history' },
      { label: 'Territory History', icon: 'grid-outline', route: '/profile/territory-history' },
      { label: 'Fitness Stats', icon: 'analytics-outline', route: '/profile/fitness-stats' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'Friends', icon: 'people-outline', route: '/profile/friends' },
      { label: 'Teams', icon: 'shield-outline', route: '/teams/index' },
      { label: 'Alliances', icon: 'globe-outline', route: '/alliances/index' },
    ],
  },
  {
    title: 'Premium & Rewards',
    items: [
      { label: 'Premium Membership', icon: 'diamond-outline', route: '/premium/index' },
      { label: 'Rewards Hub', icon: 'gift-outline', route: '/rewards/index' },
      { label: 'Referral Program', icon: 'share-outline', route: '/premium/referral' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Safety & Privacy', icon: 'shield-checkmark-outline', route: '/safety/index' },
      { label: 'Settings', icon: 'settings-outline', route: '/settings/index' },
      { label: 'AI Coach', icon: 'sparkles-outline', route: '/ai-coach/index' },
      { label: 'Help Center', icon: 'help-circle-outline', route: '/settings/help' },
    ],
  },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, xp, level, logout } = useApp();

  const xpProgress = (xp % 10000) / 10000;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 + (Platform.OS === 'web' ? 34 : 0) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16), backgroundColor: colors.primary }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>Profile</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => router.push('/profile/edit')} style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Ionicons name="pencil-outline" size={18} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings/index')} style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Ionicons name="settings-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={() => router.push('/profile/themes')} style={styles.avatarWrap}>
            <Avatar name={user?.displayName || 'User'} uri={user?.avatar} size={80} isPremium={user?.isPremium} />
          </TouchableOpacity>
          <View style={styles.nameSection}>
            <View style={styles.nameRow}>
              <Text style={[styles.displayName, { color: '#FFFFFF' }]}>{user?.displayName}</Text>
              {user?.isVerified && <Ionicons name="checkmark-circle" size={18} color={colors.accent} />}
              {user?.isPremium && <Badge label="PRO" variant="success" size="sm" />}
            </View>
            <Text style={[styles.username, { color: 'rgba(255,255,255,0.7)' }]}>@{user?.username}</Text>
            <Text style={[styles.bio, { color: 'rgba(255,255,255,0.7)' }]}>{user?.bio}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {STATS.map(s => (
            <TouchableOpacity key={s.label} onPress={() => router.push(`/profile/${s.label.toLowerCase().replace(' ', '-')}` as any)} style={styles.statItem}>
              <Text style={[styles.statVal, { color: '#FFFFFF' }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.6)' }]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.xpSection}>
          <View style={styles.xpRow}>
            <Text style={[styles.xpLevel, { color: 'rgba(255,255,255,0.8)' }]}>Level {level}</Text>
            <Text style={[styles.xpNum, { color: colors.accent }]}>{xp.toLocaleString()} XP</Text>
          </View>
          <ProgressBar progress={xpProgress} color={colors.accent} height={5} style={{ marginTop: 6 }} />
        </View>

        <View style={styles.rankBadge}>
          <Ionicons name="trophy-outline" size={16} color={colors.warning} />
          <Text style={[styles.rankText, { color: '#FFFFFF' }]}>{user?.rank} · Rank #142 Global</Text>
        </View>
      </View>

      {/* Menu sections */}
      <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 24 }}>
        {MENU_SECTIONS.map(section => (
          <View key={section.title}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{section.title.toUpperCase()}</Text>
            <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity onPress={() => router.push(item.route as any)} style={styles.menuItem} activeOpacity={0.7}>
                    <View style={[styles.menuIcon, { backgroundColor: colors.muted }]}>
                      <Ionicons name={item.icon as any} size={18} color={colors.foreground} />
                    </View>
                    <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={logout} style={[styles.logoutBtn, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive + '30' }]}>
          <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 20, gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  profileInfo: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  avatarWrap: {},
  nameSection: { flex: 1, gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  displayName: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  username: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  bio: { fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 19 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 4 },
  statItem: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  xpSection: {},
  xpRow: { flexDirection: 'row', justifyContent: 'space-between' },
  xpLevel: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  xpNum: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  rankBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rankText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  menuCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium' },
  divider: { height: 1, marginLeft: 60 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14, borderWidth: 1 },
  logoutText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
});

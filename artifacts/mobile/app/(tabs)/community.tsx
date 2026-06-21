import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  FlatList, Platform, TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Avatar } from '@/components/ui/Avatar';

const TABS = ['Feed', 'Challenges', 'Leaderboard', 'Clubs'] as const;
type Tab = typeof TABS[number];

const MOCK_POSTS = [
  { id: '1', user: 'TerritoryKing', avatar: undefined, time: '2h ago', content: 'Just captured 12 hexes in downtown SF! Who wants to battle for them? 🏆', likes: 47, comments: 12, shares: 3, isLiked: false, distKm: '8.4', type: 'run' },
  { id: '2', user: 'RunQueen', avatar: undefined, time: '4h ago', content: 'Personal record on the Golden Gate Loop! 42:18 💪 Come at me on the leaderboard!', likes: 89, comments: 24, shares: 8, isLiked: true, distKm: '5.1', type: 'run' },
  { id: '3', user: 'HexMaster', avatar: undefined, time: '6h ago', content: 'Our club just defended the Market Street territory for the 3rd time this week. Undefeated! 🔥', likes: 134, comments: 31, shares: 15, isLiked: false, distKm: null, type: null },
  { id: '4', user: 'CityConq', avatar: undefined, time: '8h ago', content: 'Morning ride through the Embarcadero — nothing beats capturing hexes before sunrise.', likes: 62, comments: 9, shares: 4, isLiked: false, distKm: '22.3', type: 'cycle' },
];

const MOCK_CHALLENGES = [
  { id: 'c1', title: 'City Sprint', desc: 'Run 5km in under 28 minutes', participants: 312, xp: 500, ends: '2d 4h', joined: true, color: '#22C55E' },
  { id: 'c2', title: 'Hex Dominator', desc: 'Capture 20 new hexes this week', participants: 876, xp: 1000, ends: '5d 11h', joined: false, color: '#8B5CF6' },
  { id: 'c3', title: 'Early Bird', desc: 'Complete 3 runs before 8am', participants: 145, xp: 300, ends: '6d 22h', joined: true, color: '#F59E0B' },
  { id: 'c4', title: 'Territory Titan', desc: 'Hold 50+ hexes for 7 days', participants: 58, xp: 2000, ends: '7d 0h', joined: false, color: '#EF4444' },
];

const MOCK_LEADERBOARD = [
  { rank: 1, user: 'TerritoryKing', hexes: 284, xp: 98400, change: 0 },
  { rank: 2, user: 'HexMaster', hexes: 241, xp: 87200, change: 1 },
  { rank: 3, user: 'CityConq', hexes: 198, xp: 74100, change: -1 },
  { rank: 4, user: 'RunQueen', hexes: 176, xp: 68900, change: 2 },
  { rank: 5, user: 'SpeedDemon', hexes: 154, xp: 61300, change: 0 },
  { rank: 6, user: 'UrbanExplorer', hexes: 143, xp: 55800, change: 3 },
  { rank: 7, user: 'gridseizer', hexes: 134, xp: 51200, change: -2, isMe: true },
  { rank: 8, user: 'PaceMaker', hexes: 121, xp: 46700, change: 1 },
];

const MOCK_CLUBS = [
  { id: 'cl1', name: 'SF Runners', members: 234, territories: 892, tag: 'Running', color: '#22C55E', isJoined: true },
  { id: 'cl2', name: 'Bay Cyclists', members: 156, territories: 641, tag: 'Cycling', color: '#0EA5E9', isJoined: false },
  { id: 'cl3', name: 'Downtown Dominators', members: 89, territories: 1204, tag: 'Mixed', color: '#8B5CF6', isJoined: false },
  { id: 'cl4', name: 'Morning Warriors', members: 312, territories: 453, tag: 'Running', color: '#F59E0B', isJoined: true },
];

export default function CommunityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { unreadCount } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('Feed');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({ '2': true });
  const [joinedChallenges, setJoinedChallenges] = useState<Record<string, boolean>>({ c1: true, c3: true });
  const [joinedClubs, setJoinedClubs] = useState<Record<string, boolean>>({ cl1: true, cl4: true });
  const [leaderFilter, setLeaderFilter] = useState<'city' | 'friends'>('city');

  const toggleLike = (id: string) => setLikedPosts(p => ({ ...p, [id]: !p[id] }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16), backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Community</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/community/notifications' as any)} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
            {unreadCount > 0 && <View style={[styles.badge, { backgroundColor: colors.destructive }]}><Text style={styles.badgeText}>{unreadCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="search-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsRow, { borderBottomColor: colors.border }]}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setActiveTab(t)} style={styles.tab}>
            <Text style={[styles.tabText, { color: activeTab === t ? colors.accent : colors.mutedForeground }]}>{t}</Text>
            {activeTab === t && <View style={[styles.tabIndicator, { backgroundColor: colors.accent }]} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Feed */}
      {activeTab === 'Feed' && (
        <FlatList
          data={MOCK_POSTS}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 + (Platform.OS === 'web' ? 34 : 0), gap: 1 }}
          ListHeaderComponent={
            <View>
              {/* Create post */}
              <TouchableOpacity onPress={() => router.push('/community/create-post')} style={[styles.createPost, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <Avatar name="You" size={38} />
                <View style={[styles.createInput, { backgroundColor: colors.muted, borderColor: colors.border }]}>
                  <Text style={[styles.createPlaceholder, { color: colors.mutedForeground }]}>Share your conquest...</Text>
                </View>
                <TouchableOpacity style={[styles.photoBtn, { backgroundColor: colors.muted }]}>
                  <Ionicons name="image-outline" size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              </TouchableOpacity>
              {/* Stories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.storiesScroll, { borderBottomColor: colors.border }]} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 16 }}>
                <TouchableOpacity style={styles.storyWrap}>
                  <View style={[styles.addStoryCircle, { backgroundColor: colors.muted, borderColor: colors.border }]}>
                    <Ionicons name="add" size={22} color={colors.accent} />
                  </View>
                  <Text style={[styles.storyName, { color: colors.mutedForeground }]}>Your Story</Text>
                </TouchableOpacity>
                {['TerritoryKing', 'RunQueen', 'HexMaster', 'CityConq', 'SpeedDemon'].map((name, i) => (
                  <TouchableOpacity key={name} onPress={() => router.push(`/community/user/${i + 1}` as any)} style={styles.storyWrap}>
                    <View style={[styles.storyRing, { borderColor: i < 2 ? colors.accent : colors.border }]}>
                      <Avatar name={name} size={46} />
                    </View>
                    <Text style={[styles.storyName, { color: colors.mutedForeground }]} numberOfLines={1}>{name.slice(0, 8)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.post, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
              <View style={styles.postHeader}>
                <Avatar name={item.user} size={40} isOnline={item.id === '1'} />
                <View style={styles.postMeta}>
                  <Text style={[styles.postUser, { color: colors.foreground }]}>{item.user}</Text>
                  <Text style={[styles.postTime, { color: colors.mutedForeground }]}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.moreBtn}><Ionicons name="ellipsis-horizontal" size={18} color={colors.mutedForeground} /></TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push(`/community/${item.id}` as any)} activeOpacity={0.9}>
                <Text style={[styles.postContent, { color: colors.foreground }]}>{item.content}</Text>
                {item.distKm && (
                  <View style={[styles.activityCard, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
                    <Ionicons name={item.type === 'cycle' ? 'bicycle-outline' : 'fitness-outline'} size={16} color={colors.accent} />
                    <Text style={[styles.activityText, { color: colors.accent }]}>{item.distKm} km · {item.type}</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.accent} style={{ marginLeft: 'auto' }} />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.postActions}>
                <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.action}>
                  <Ionicons name={likedPosts[item.id] ? 'heart' : 'heart-outline'} size={20} color={likedPosts[item.id] ? colors.destructive : colors.mutedForeground} />
                  <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{item.likes + (likedPosts[item.id] && !item.isLiked ? 1 : item.isLiked && !likedPosts[item.id] ? -1 : 0)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/community/${item.id}` as any)} style={styles.action}>
                  <Ionicons name="chatbubble-outline" size={19} color={colors.mutedForeground} />
                  <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <Ionicons name="share-social-outline" size={20} color={colors.mutedForeground} />
                  <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{item.shares}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.action, { marginLeft: 'auto' }]}>
                  <Ionicons name="bookmark-outline" size={19} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Challenges */}
      {activeTab === 'Challenges' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>ACTIVE CHALLENGES</Text>
          {MOCK_CHALLENGES.map(c => (
            <View key={c.id} style={[styles.challengeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.challengeAccent, { backgroundColor: c.color }]} />
              <View style={styles.challengeBody}>
                <View style={styles.challengeTop}>
                  <View>
                    <Text style={[styles.challengeTitle, { color: colors.foreground }]}>{c.title}</Text>
                    <Text style={[styles.challengeDesc, { color: colors.mutedForeground }]}>{c.desc}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setJoinedChallenges(p => ({ ...p, [c.id]: !p[c.id] }))}
                    style={[styles.joinBtn, { backgroundColor: joinedChallenges[c.id] ? colors.muted : c.color, borderColor: c.color, borderWidth: 1 }]}
                  >
                    <Text style={[styles.joinBtnText, { color: joinedChallenges[c.id] ? colors.mutedForeground : '#FFF' }]}>
                      {joinedChallenges[c.id] ? 'Joined' : 'Join'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.challengeFooter}>
                  <View style={styles.chipRow}>
                    <View style={[styles.chip, { backgroundColor: c.color + '18' }]}>
                      <Ionicons name="star-outline" size={12} color={c.color} />
                      <Text style={[styles.chipText, { color: c.color }]}>{c.xp} XP</Text>
                    </View>
                    <View style={[styles.chip, { backgroundColor: colors.muted }]}>
                      <Ionicons name="people-outline" size={12} color={colors.mutedForeground} />
                      <Text style={[styles.chipText, { color: colors.mutedForeground }]}>{c.participants}</Text>
                    </View>
                  </View>
                  <View style={styles.chipRow}>
                    <Ionicons name="time-outline" size={13} color={colors.mutedForeground} />
                    <Text style={[styles.chipText, { color: colors.mutedForeground }]}>Ends in {c.ends}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Leaderboard */}
      {activeTab === 'Leaderboard' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.leaderFilters}>
            {(['city', 'friends'] as const).map(f => (
              <TouchableOpacity key={f} onPress={() => setLeaderFilter(f)}
                style={[styles.leaderFilterBtn, { backgroundColor: leaderFilter === f ? colors.accent : colors.card, borderColor: leaderFilter === f ? colors.accent : colors.border }]}>
                <Text style={[styles.leaderFilterText, { color: leaderFilter === f ? '#FFF' : colors.mutedForeground }]}>
                  {f === 'city' ? '🏙 City' : '👥 Friends'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {MOCK_LEADERBOARD.map((entry, idx) => (
            <View key={entry.rank} style={[styles.leaderRow, { backgroundColor: entry.isMe ? colors.tintBackground : 'transparent', borderBottomColor: colors.border }]}>
              <View style={styles.rankWrap}>
                {idx < 3 ? (
                  <Text style={styles.rankEmoji}>{['🥇', '🥈', '🥉'][idx]}</Text>
                ) : (
                  <Text style={[styles.rankNum, { color: colors.mutedForeground }]}>{entry.rank}</Text>
                )}
              </View>
              <Avatar name={entry.user} size={38} />
              <View style={styles.leaderInfo}>
                <Text style={[styles.leaderName, { color: entry.isMe ? colors.accent : colors.foreground }]}>
                  {entry.isMe ? 'You' : entry.user}
                </Text>
                <Text style={[styles.leaderSub, { color: colors.mutedForeground }]}>{entry.hexes} hexes · {(entry.xp / 1000).toFixed(1)}K XP</Text>
              </View>
              <View style={styles.changeWrap}>
                {entry.change !== 0 && (
                  <Ionicons
                    name={entry.change > 0 ? 'arrow-up' : 'arrow-down'}
                    size={14}
                    color={entry.change > 0 ? colors.success : colors.destructive}
                  />
                )}
                {entry.change !== 0 && (
                  <Text style={{ fontSize: 12, color: entry.change > 0 ? colors.success : colors.destructive }}>{Math.abs(entry.change)}</Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Clubs */}
      {activeTab === 'Clubs' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}>
          <View style={styles.clubsHeader}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>YOUR CLUBS</Text>
            <TouchableOpacity onPress={() => router.push('/teams/index' as any)} style={[styles.createClubBtn, { backgroundColor: colors.accent }]}>
              <Ionicons name="add" size={16} color="#FFF" />
              <Text style={styles.createClubText}>Create</Text>
            </TouchableOpacity>
          </View>
          {MOCK_CLUBS.map(cl => (
            <TouchableOpacity key={cl.id} onPress={() => router.push(`/teams/${cl.id}` as any)}
              style={[styles.clubCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.clubIcon, { backgroundColor: cl.color + '20' }]}>
                <Ionicons name="shield-outline" size={24} color={cl.color} />
              </View>
              <View style={styles.clubInfo}>
                <View style={styles.clubNameRow}>
                  <Text style={[styles.clubName, { color: colors.foreground }]}>{cl.name}</Text>
                  <View style={[styles.clubTag, { backgroundColor: cl.color + '18' }]}>
                    <Text style={[styles.clubTagText, { color: cl.color }]}>{cl.tag}</Text>
                  </View>
                </View>
                <Text style={[styles.clubSub, { color: colors.mutedForeground }]}>{cl.members} members · {cl.territories} territories</Text>
              </View>
              <TouchableOpacity
                onPress={() => setJoinedClubs(p => ({ ...p, [cl.id]: !p[cl.id] }))}
                style={[styles.joinBtn, { backgroundColor: joinedClubs[cl.id] ? colors.muted : cl.color, borderWidth: 1, borderColor: cl.color }]}
              >
                <Text style={[styles.joinBtnText, { color: joinedClubs[cl.id] ? colors.mutedForeground : '#FFF' }]}>
                  {joinedClubs[cl.id] ? 'Joined' : 'Join'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  badge: { position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 9, fontFamily: 'Inter_700Bold', color: '#FFF' },
  tabsRow: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, position: 'relative' },
  tabText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  tabIndicator: { position: 'absolute', bottom: 0, left: 8, right: 8, height: 2, borderRadius: 1 },
  createPost: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 1 },
  createInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1 },
  createPlaceholder: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  photoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  storiesScroll: { borderBottomWidth: 1 },
  storyWrap: { alignItems: 'center', gap: 4 },
  storyRing: { width: 58, height: 58, borderRadius: 29, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center' },
  addStoryCircle: { width: 54, height: 54, borderRadius: 27, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  storyName: { fontSize: 10, fontFamily: 'Inter_500Medium', maxWidth: 58, textAlign: 'center' },
  post: { padding: 14, gap: 10, borderBottomWidth: 1 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  postMeta: { flex: 1 },
  moreBtn: { padding: 4 },
  postUser: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  postTime: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  postContent: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 22 },
  activityCard: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10, borderWidth: 1, marginTop: 4 },
  activityText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  postActions: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingTop: 2 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionCount: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  sectionLabel: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 4 },
  challengeCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', flexDirection: 'row' },
  challengeAccent: { width: 4 },
  challengeBody: { flex: 1, padding: 14, gap: 10 },
  challengeTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  challengeTitle: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  challengeDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2, lineHeight: 18 },
  challengeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100 },
  chipText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  joinBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, minWidth: 60, alignItems: 'center' },
  joinBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  leaderFilters: { flexDirection: 'row', gap: 8, padding: 16 },
  leaderFilterBtn: { flex: 1, paddingVertical: 10, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
  leaderFilterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  leaderRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12, borderBottomWidth: 1 },
  rankWrap: { width: 28, alignItems: 'center' },
  rankEmoji: { fontSize: 22 },
  rankNum: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  leaderInfo: { flex: 1 },
  leaderName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  leaderSub: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  changeWrap: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  clubsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  createClubBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  createClubText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  clubCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  clubIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  clubInfo: { flex: 1, gap: 4 },
  clubNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  clubName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  clubTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  clubTagText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  clubSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});

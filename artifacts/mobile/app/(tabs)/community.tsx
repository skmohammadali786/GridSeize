import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

const TABS = ['Feed', 'Teams', 'Events', 'Discover'];

const MOCK_POSTS = [
  { id: '1', user: 'TerritoryKing', time: '2h ago', content: 'Just captured 12 hexes in downtown SF! Who wants to battle for them?', likes: 47, comments: 12, shares: 3, isLiked: false, hasActivity: true, dist: '8.4 km' },
  { id: '2', user: 'RunQueen', time: '4h ago', content: 'Personal record on the Golden Gate Loop! 42:18 💪 Come at me on the leaderboard!', likes: 89, comments: 24, shares: 8, isLiked: true, hasActivity: true, dist: '5.1 km' },
  { id: '3', user: 'HexMaster', time: '6h ago', content: 'Our team just defended the Market Street territory for the 3rd time this week. Undefeated!', likes: 134, comments: 31, shares: 15, isLiked: false, hasActivity: false, dist: '' },
];

export default function CommunityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Feed');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({ '2': true });

  const toggleLike = (id: string) => setLikedPosts(p => ({ ...p, [id]: !p[id] }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 16) }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Community</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/community/notifications')} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/community/search')} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="search-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabsScroll, { borderBottomColor: colors.border }]} contentContainerStyle={{ paddingHorizontal: 16, gap: 4 }}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setActiveTab(t)} style={[styles.tab, { borderBottomColor: activeTab === t ? colors.accent : 'transparent', borderBottomWidth: 2 }]}>
            <Text style={[styles.tabText, { color: activeTab === t ? colors.accent : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Create Post */}
      <TouchableOpacity onPress={() => router.push('/community/create-post')} style={[styles.createPost, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Avatar name="You" size={36} />
        <Text style={[styles.createPostText, { color: colors.mutedForeground }]}>Share your conquest...</Text>
        <View style={[styles.createPostBtn, { backgroundColor: colors.accent }]}>
          <Ionicons name="add" size={18} color="#FFF" />
        </View>
      </TouchableOpacity>

      {/* Feed */}
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + (Platform.OS === 'web' ? 34 : 0), paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/community/${item.id}` as any)} style={[styles.post, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.95}>
            <View style={styles.postHeader}>
              <Avatar name={item.user} size={40} isOnline={item.id === '1'} />
              <View style={styles.postUserInfo}>
                <Text style={[styles.postUser, { color: colors.foreground }]}>{item.user}</Text>
                <Text style={[styles.postTime, { color: colors.mutedForeground }]}>{item.time}</Text>
              </View>
              <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={18} color={colors.mutedForeground} /></TouchableOpacity>
            </View>
            <Text style={[styles.postContent, { color: colors.foreground }]}>{item.content}</Text>
            {item.hasActivity && (
              <View style={[styles.activityChip, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
                <Ionicons name="fitness-outline" size={14} color={colors.accent} />
                <Text style={[styles.activityChipText, { color: colors.accent }]}>{item.dist} Activity</Text>
              </View>
            )}
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
                <Ionicons name="share-outline" size={20} color={colors.mutedForeground} />
                <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{item.shares}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.storiesRow}>
            {['TerritoryKing', 'RunQueen', 'HexMaster', 'CityConq', 'SpeedDemon'].map((name, i) => (
              <TouchableOpacity key={name} onPress={() => router.push(`/community/user/${i + 1}` as any)} style={styles.storyWrap}>
                <View style={[styles.storyRing, { borderColor: i === 0 ? colors.accent : colors.border }]}>
                  <Avatar name={name} size={46} />
                </View>
                <Text style={[styles.storyName, { color: colors.mutedForeground }]} numberOfLines={1}>{name.slice(0, 8)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  tabsScroll: { borderBottomWidth: 1, marginBottom: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 10 },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  createPost: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 16, marginBottom: 12, padding: 12, borderRadius: 12, borderWidth: 1 },
  createPostText: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  createPostBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  storiesRow: { flexDirection: 'row', gap: 12, paddingVertical: 8, marginBottom: 4 },
  storyWrap: { alignItems: 'center', gap: 4 },
  storyRing: { width: 56, height: 56, borderRadius: 28, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center' },
  storyName: { fontSize: 10, fontFamily: 'Inter_500Medium' },
  post: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  postUserInfo: { flex: 1 },
  postUser: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  postTime: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  postContent: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },
  activityChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, borderWidth: 1, alignSelf: 'flex-start' },
  activityChipText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  postActions: { flexDirection: 'row', gap: 20, paddingTop: 4 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionCount: { fontSize: 13, fontFamily: 'Inter_500Medium' },
});

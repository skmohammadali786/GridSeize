import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Ionicons } from '@expo/vector-icons';

const MOCK_POSTS: Record<string, { user: string; time: string; content: string; likes: number; distKm?: string }> = {
  '1': { user: 'TerritoryKing', time: '2h ago', content: 'Just captured 12 hexes in downtown SF! Who wants to battle for them?', likes: 47, distKm: '8.4' },
  '2': { user: 'RunQueen', time: '4h ago', content: 'Personal record on the Golden Gate Loop! 42:18 💪 Come at me on the leaderboard!', likes: 89, distKm: '5.1' },
  '3': { user: 'HexMaster', time: '6h ago', content: 'Our club just defended the Market Street territory for the 3rd time this week. Undefeated! 🔥', likes: 134 },
  '4': { user: 'CityConq', time: '8h ago', content: 'Morning ride through the Embarcadero — nothing beats capturing hexes before sunrise.', likes: 62, distKm: '22.3' },
};

const INITIAL_COMMENTS: Record<string, { id: string; user: string; text: string; time: string; likes: number }[]> = {
  '1': [
    { id: 'c1', user: 'RunQueen', text: 'Challenge accepted! Meet me at the Financial District 🔥', time: '1h ago', likes: 8 },
    { id: 'c2', user: 'HexMaster', text: "That's my territory you just took!", time: '45m ago', likes: 4 },
    { id: 'c3', user: 'CityConq', text: 'GG, well played 🙌', time: '20m ago', likes: 2 },
  ],
  '2': [
    { id: 'c1', user: 'SpeedDemon', text: 'That pace is insane! New PB goals set 🚀', time: '3h ago', likes: 14 },
    { id: 'c2', user: 'TerritoryKing', text: 'Coming for you on the leaderboard! 😤', time: '2h ago', likes: 6 },
  ],
};

export default function PostDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = MOCK_POSTS[id ?? '1'] ?? MOCK_POSTS['1'];
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(INITIAL_COMMENTS[id ?? '1'] ?? []);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  function submitComment() {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      text: comment.trim(),
      time: 'just now',
      likes: 0,
    };
    setComments(prev => [...prev, newComment]);
    setComment('');
  }

  const toggleCommentLike = (cid: string) =>
    setLikedComments(p => ({ ...p, [cid]: !p[cid] }));

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScreenHeader title="Post" />
        <FlatList
          data={comments}
          keyExtractor={c => c.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 20 }}
          ListHeaderComponent={
            <View style={{ gap: 14, marginBottom: 4 }}>
              {/* Post */}
              <View style={[styles.postCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.postHeader}>
                  <Avatar name={post.user} size={44} isOnline />
                  <View>
                    <Text style={[styles.postUser, { color: colors.foreground }]}>{post.user}</Text>
                    <Text style={[styles.postTime, { color: colors.mutedForeground }]}>{post.time}</Text>
                  </View>
                </View>
                <Text style={[styles.postContent, { color: colors.foreground }]}>{post.content}</Text>
                {post.distKm && (
                  <View style={[styles.activityChip, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
                    <Ionicons name="fitness-outline" size={14} color={colors.accent} />
                    <Text style={[styles.activityChipText, { color: colors.accent }]}>{post.distKm} km · Activity</Text>
                  </View>
                )}
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => setLiked(p => !p)} style={styles.action}>
                    <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={liked ? colors.destructive : colors.mutedForeground} />
                    <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{post.likes + (liked ? 1 : 0)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action}>
                    <Ionicons name="chatbubble-outline" size={21} color={colors.mutedForeground} />
                    <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{comments.length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action}>
                    <Ionicons name="share-social-outline" size={22} color={colors.mutedForeground} />
                    <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.commentsTitle, { color: colors.foreground }]}>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Avatar name={item.user} size={36} />
              <View style={[styles.commentBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.commentHeader}>
                  <Text style={[styles.commentUser, { color: colors.foreground }]}>{item.user}</Text>
                  <Text style={[styles.commentTime, { color: colors.mutedForeground }]}>{item.time}</Text>
                </View>
                <Text style={[styles.commentText, { color: colors.foreground }]}>{item.text}</Text>
                <TouchableOpacity onPress={() => toggleCommentLike(item.id)} style={styles.commentLike}>
                  <Ionicons name={likedComments[item.id] ? 'heart' : 'heart-outline'} size={14} color={likedComments[item.id] ? colors.destructive : colors.mutedForeground} />
                  <Text style={[styles.commentLikeCount, { color: colors.mutedForeground }]}>
                    {item.likes + (likedComments[item.id] ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {/* Comment input */}
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <Avatar name="You" size={34} />
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.commentInput, { color: colors.foreground, backgroundColor: colors.muted }]}
            returnKeyType="send"
            onSubmitEditing={submitComment}
            multiline
          />
          <TouchableOpacity onPress={submitComment} disabled={!comment.trim()} style={[styles.sendBtn, { backgroundColor: comment.trim() ? colors.accent : colors.muted }]}>
            <Ionicons name="send" size={16} color={comment.trim() ? '#FFF' : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  postCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  postUser: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  postTime: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  postContent: { fontSize: 16, fontFamily: 'Inter_400Regular', lineHeight: 24 },
  activityChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, borderWidth: 1, alignSelf: 'flex-start' },
  activityChipText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  dividerLine: { height: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  actionCount: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  commentsTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  comment: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  commentBubble: { flex: 1, padding: 12, borderRadius: 14, borderWidth: 1, gap: 6 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  commentUser: { fontSize: 13, fontFamily: 'Inter_600SemiBold', flex: 1 },
  commentTime: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  commentText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  commentLike: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' },
  commentLikeCount: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, borderTopWidth: 1, gap: 10 },
  commentInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, maxHeight: 120 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});

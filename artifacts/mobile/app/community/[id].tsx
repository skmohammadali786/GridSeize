import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Ionicons } from '@expo/vector-icons';

const MOCK_POST = {
  user: 'TerritoryKing', time: '2h ago',
  content: 'Just captured 12 hexes in downtown SF! Who wants to battle for them?',
  likes: 47, comments: [
    { id: '1', user: 'RunQueen', text: 'Challenge accepted! Meet me at the Financial District 🔥', time: '1h ago' },
    { id: '2', user: 'HexMaster', text: 'That\'s my territory you just took!', time: '45m ago' },
    { id: '3', user: 'CityConq', text: 'GG, well played 🙌', time: '20m ago' },
  ]
};

export default function PostDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScreenHeader title="Post" />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <View style={styles.postHeader}>
            <Avatar name={MOCK_POST.user} size={44} isOnline />
            <View>
              <Text style={[styles.postUser, { color: colors.foreground }]}>{MOCK_POST.user}</Text>
              <Text style={[styles.postTime, { color: colors.mutedForeground }]}>{MOCK_POST.time}</Text>
            </View>
          </View>
          <Text style={[styles.postContent, { color: colors.foreground }]}>{MOCK_POST.content}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setLiked(p => !p)} style={styles.action}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={liked ? colors.destructive : colors.mutedForeground} />
              <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{MOCK_POST.likes + (liked ? 1 : 0)}</Text>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <TouchableOpacity style={styles.action}>
              <Ionicons name="share-outline" size={22} color={colors.mutedForeground} />
              <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>Share</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.commentsTitle, { color: colors.foreground }]}>Comments</Text>
          {MOCK_POST.comments.map(c => (
            <View key={c.id} style={styles.comment}>
              <Avatar name={c.user} size={36} />
              <View style={[styles.commentBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.commentUser, { color: colors.foreground }]}>{c.user}</Text>
                <Text style={[styles.commentText, { color: colors.foreground }]}>{c.text}</Text>
                <Text style={[styles.commentTime, { color: colors.mutedForeground }]}>{c.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Avatar name="You" size={32} />
          <TextInput value={comment} onChangeText={setComment} placeholder="Add a comment..." placeholderTextColor={colors.mutedForeground}
            style={[styles.commentInput, { color: colors.foreground }]} />
          <TouchableOpacity>
            <Ionicons name="send" size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  postUser: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  postTime: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  postContent: { fontSize: 16, fontFamily: 'Inter_400Regular', lineHeight: 24 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionCount: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  divider: { width: 1, height: 20, marginHorizontal: 4 },
  commentsTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  comment: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  commentBubble: { flex: 1, padding: 12, borderRadius: 14, borderWidth: 1, gap: 4 },
  commentUser: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  commentText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  commentTime: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, gap: 10 },
  commentInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', padding: 0 },
});

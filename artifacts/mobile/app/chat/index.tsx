import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  { id: '1', name: 'TerritoryKing', lastMsg: 'Battle me at 8PM?', time: '2m', unread: 3, isOnline: true },
  { id: '2', name: 'GridSeizers Team', lastMsg: 'Rally at Mission District!', time: '15m', unread: 12, isOnline: false, isGroup: true },
  { id: '3', name: 'RunQueen', lastMsg: 'Nice run today! 🏃', time: '1h', unread: 0, isOnline: true },
  { id: '4', name: 'HexMaster', lastMsg: 'Want to form an alliance?', time: '3h', unread: 1, isOnline: false },
  { id: '5', name: 'Alliance War Room', lastMsg: 'Attack at midnight', time: '5h', unread: 0, isOnline: false, isGroup: true },
];

export default function ChatListScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Messages" rightIcon="create-outline" onRightPress={() => router.push('/chat/search')} />
      <FlatList
        data={CHATS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(item.isGroup ? `/chat/group/${item.id}` : `/chat/${item.id}` as any)} style={styles.chatRow} activeOpacity={0.8}>
            <View style={styles.avatarWrap}>
              <Avatar name={item.name} size={50} isOnline={item.isOnline} />
              {item.isGroup && (
                <View style={[styles.groupBadge, { backgroundColor: colors.accent }]}>
                  <Ionicons name="people" size={10} color="#FFF" />
                </View>
              )}
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatTop}>
                <Text style={[styles.chatName, { color: colors.foreground }]}>{item.name}</Text>
                <Text style={[styles.chatTime, { color: colors.mutedForeground }]}>{item.time}</Text>
              </View>
              <View style={styles.chatBottom}>
                <Text style={[styles.chatMsg, { color: colors.mutedForeground }]} numberOfLines={1}>{item.lastMsg}</Text>
                {item.unread > 0 && (
                  <View style={[styles.unreadBadge, { backgroundColor: colors.accent }]}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: colors.border }]} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  chatRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  avatarWrap: { position: 'relative' },
  groupBadge: { position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  chatContent: { flex: 1 },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  chatTime: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  chatBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatMsg: { fontSize: 13, fontFamily: 'Inter_400Regular', flex: 1 },
  unreadBadge: { minWidth: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  unreadText: { fontSize: 11, fontFamily: 'Inter_700Bold', color: '#FFF' },
  sep: { height: 1 },
});

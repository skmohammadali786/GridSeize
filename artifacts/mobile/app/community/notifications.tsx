import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const ICON_MAP: Record<string, { name: string; color: string }> = {
  territory: { name: 'grid-outline', color: '#22C55E' },
  challenge: { name: 'trophy-outline', color: '#F59E0B' },
  social: { name: 'people-outline', color: '#0EA5E9' },
  battle: { name: 'flash-outline', color: '#EF4444' },
  xp: { name: 'star-outline', color: '#8B5CF6' },
};

export default function NotificationsScreen() {
  const colors = useColors();
  const { notifications, markAllRead, unreadCount } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Notifications" rightLabel={unreadCount > 0 ? 'Mark all read' : undefined} onRightPress={markAllRead} />
      {notifications.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="notifications-off-outline" size={48} color={colors.mutedForeground} />
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={n => n.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const icon = ICON_MAP[item.type] ?? { name: 'notifications-outline', color: colors.accent };
            return (
              <TouchableOpacity
                style={[styles.row, { backgroundColor: item.isRead ? 'transparent' : colors.tintBackground, borderBottomColor: colors.border }]}
                onPress={() => {
                  if (item.type === 'territory') router.push('/(tabs)/map' as any);
                  else if (item.type === 'challenge') router.push('/challenges/index' as any);
                  else if (item.type === 'social') router.push('/(tabs)/community' as any);
                }}
              >
                <View style={[styles.iconWrap, { backgroundColor: icon.color + '18' }]}>
                  <Ionicons name={icon.name as any} size={22} color={icon.color} />
                </View>
                <View style={styles.content}>
                  <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
                  <Text style={[styles.body, { color: colors.mutedForeground }]}>{item.body}</Text>
                </View>
                {!item.isRead && <View style={[styles.dot, { backgroundColor: colors.accent }]} />}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  markAll: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1 },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, gap: 3 },
  title: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  body: { fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});

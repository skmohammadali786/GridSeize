import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const BADGES = [
  { id: '1', emoji: '🏆', name: 'First Victory', desc: 'Won your first battle', earned: true },
  { id: '2', emoji: '🔥', name: 'Streak Master', desc: '30-day streak', earned: true },
  { id: '3', emoji: '⚡', name: 'Speed Runner', desc: 'Sub-5:00/km pace', earned: true },
  { id: '4', emoji: '🗺️', name: 'Explorer', desc: 'Visit 5 districts', earned: true },
  { id: '5', emoji: '👑', name: 'Territory King', desc: 'Own 50+ territories', earned: false },
  { id: '6', emoji: '🌍', name: 'World Dominator', desc: 'Top 10 globally', earned: false },
  { id: '7', emoji: '💎', name: 'Premium Elite', desc: '6 months premium', earned: false },
  { id: '8', emoji: '🤝', name: 'Team Captain', desc: 'Lead a team to victory', earned: true },
  { id: '9', emoji: '🚀', name: 'Rocket Run', desc: 'Run 50km in a week', earned: false },
];

export default function BadgesScreen() {
  const colors = useColors();
  const earned = BADGES.filter(b => b.earned);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Badges" subtitle={`${earned.length} of ${BADGES.length} earned`} />
      <FlatList
        data={BADGES}
        keyExtractor={i => i.id}
        numColumns={3}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={[styles.badge, { backgroundColor: colors.card, borderColor: item.earned ? colors.accent + '44' : colors.border, opacity: item.earned ? 1 : 0.5 }]}>
            <Text style={[styles.badgeEmoji, { opacity: item.earned ? 1 : 0.4 }]}>{item.emoji}</Text>
            <Text style={[styles.badgeName, { color: colors.foreground }]}>{item.name}</Text>
            <Text style={[styles.badgeDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  badge: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 6 },
  badgeEmoji: { fontSize: 32 },
  badgeName: { fontSize: 12, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  badgeDesc: { fontSize: 10, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});

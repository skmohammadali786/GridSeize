import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TABS = ['Upcoming', 'Nearby', 'My Events', 'Saved'];
const EVENTS = [
  { id: '1', title: 'SF City Conquest Night', date: 'Jun 28, 8PM', location: 'Downtown SF', type: 'team', participants: 142, prize: '5000 coins', color: '#22C55E' },
  { id: '2', title: 'Golden Gate Marathon', date: 'Jul 4, 7AM', location: 'Golden Gate Park', type: 'race', participants: 820, prize: '10,000 XP', color: '#F59E0B' },
  { id: '3', title: 'Mission District Battle', date: 'Jun 25, 6PM', location: 'Mission District', type: 'battle', participants: 32, prize: '15 territories', color: '#EF4444' },
  { id: '4', title: 'Marina Walk Challenge', date: 'Jun 30, 9AM', location: 'Marina Blvd', type: 'walk', participants: 67, prize: '1500 coins', color: '#0EA5E9' },
];

export default function EventsScreen() {
  const colors = useColors();
  const [tab, setTab] = useState('Upcoming');
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Events" rightIcon="add-circle-outline" onRightPress={() => router.push('/events/create')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.tabsScroll, { borderBottomColor: colors.border }]} contentContainerStyle={{ paddingHorizontal: 16, gap: 4 }}>
        {TABS.map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, { borderBottomColor: tab === t ? colors.accent : 'transparent' }]}>
            <Text style={[styles.tabText, { color: tab === t ? colors.accent : colors.mutedForeground }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {EVENTS.map(e => (
          <TouchableOpacity key={e.id} onPress={() => router.push(`/events/${e.id}` as any)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={[styles.typeBar, { backgroundColor: e.color }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>{e.title}</Text>
                <Badge label={e.type} variant="info" size="sm" />
              </View>
              <View style={styles.cardMeta}>
                <Ionicons name="calendar-outline" size={13} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{e.date}</Text>
                <Ionicons name="location-outline" size={13} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{e.location}</Text>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.participants}>
                  <Ionicons name="people-outline" size={13} color={colors.mutedForeground} />
                  <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{e.participants} joined</Text>
                </View>
                <View style={[styles.prizeBadge, { backgroundColor: colors.warning + '18' }]}>
                  <Ionicons name="trophy-outline" size={13} color={colors.warning} />
                  <Text style={[styles.prizeText, { color: colors.warning }]}>{e.prize}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsScroll: { borderBottomWidth: 1 },
  tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  card: { flexDirection: 'row', borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  typeBar: { width: 4 },
  cardContent: { flex: 1, padding: 14, gap: 6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', flex: 1, marginRight: 8 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  metaText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  participants: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  prizeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100 },
  prizeText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
});

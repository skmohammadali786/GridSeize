import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const SECTIONS = [
  {
    title: 'Activity',
    items: [
      { key: 'activity_start', label: 'Activity reminders', desc: 'Daily streak & goal nudges' },
      { key: 'activity_complete', label: 'Activity summaries', desc: 'Post-workout recap notifications' },
      { key: 'new_pr', label: 'Personal records', desc: 'When you beat a personal best' },
    ],
  },
  {
    title: 'Territory',
    items: [
      { key: 'territory_attack', label: 'Under attack', desc: 'When someone invades your hexes' },
      { key: 'territory_capture', label: 'New capture', desc: 'Confirmation when you seize a hex' },
      { key: 'territory_lost', label: 'Territory lost', desc: 'When you lose a hex' },
    ],
  },
  {
    title: 'Social',
    items: [
      { key: 'new_follower', label: 'New followers', desc: 'When someone starts following you' },
      { key: 'post_likes', label: 'Post likes', desc: 'When people like your posts' },
      { key: 'comments', label: 'Comments', desc: 'Replies on your posts' },
      { key: 'mentions', label: 'Mentions', desc: 'When you are tagged' },
    ],
  },
  {
    title: 'Challenges & Events',
    items: [
      { key: 'challenges', label: 'Challenge updates', desc: 'Progress and results' },
      { key: 'events', label: 'Events nearby', desc: 'New events in your area' },
    ],
  },
];

export default function NotificationsSettingsScreen() {
  const colors = useColors();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    activity_start: true, activity_complete: true, new_pr: true,
    territory_attack: true, territory_capture: true, territory_lost: true,
    new_follower: true, post_likes: false, comments: true, mentions: true,
    challenges: true, events: false,
  });

  const toggle = (key: string) => setEnabled(p => ({ ...p, [key]: !p[key] }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Notifications" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{section.title.toUpperCase()}</Text>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, i) => (
                <View key={item.key}>
                  <View style={styles.row}>
                    <View style={styles.rowText}>
                      <Text style={[styles.label, { color: colors.foreground }]}>{item.label}</Text>
                      <Text style={[styles.desc, { color: colors.mutedForeground }]}>{item.desc}</Text>
                    </View>
                    <Switch
                      value={!!enabled[item.key]}
                      onValueChange={() => toggle(item.key)}
                      trackColor={{ false: colors.border, true: colors.accent + '80' }}
                      thumbColor={enabled[item.key] ? colors.accent : colors.mutedForeground}
                    />
                  </View>
                  {i < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowText: { flex: 1 },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  divider: { height: 1, marginLeft: 16 },
});

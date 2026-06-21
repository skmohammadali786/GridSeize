import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';

const MISSIONS = [
  { id: '1', title: 'Morning Warrior', desc: 'Run 3km before 9am', progress: 0.7, xp: 150, type: 'daily', done: false },
  { id: '2', title: 'Territory Expand', desc: 'Capture 5 new hexes', progress: 0.4, xp: 200, type: 'daily', done: false },
  { id: '3', title: 'Social Butterfly', desc: 'Follow 3 new players', progress: 0.33, xp: 75, type: 'daily', done: false },
  { id: '4', title: 'Speed Demon', desc: 'Complete a run under 5:00/km pace', progress: 1, xp: 250, type: 'daily', done: true },
  { id: '5', title: 'Weekly Warrior', desc: 'Run 25km this week', progress: 0.6, xp: 500, type: 'weekly', done: false },
  { id: '6', title: 'City Dominator', desc: 'Own 50 territories', progress: 0.94, xp: 1000, type: 'weekly', done: false },
];

export default function MissionsScreen() {
  const colors = useColors();
  const [tab, setTab] = useState('daily');
  const filtered = MISSIONS.filter(m => m.type === tab);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Missions" />
      <View style={styles.tabs}>
        {['daily', 'weekly', 'monthly'].map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, { borderColor: tab === t ? colors.accent : 'transparent' }]}>
            <Text style={[styles.tabText, { color: tab === t ? colors.accent : colors.mutedForeground }]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {filtered.map(m => (
          <View key={m.id} style={[styles.card, { backgroundColor: colors.card, borderColor: m.done ? colors.accent + '33' : colors.border }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.mTitle, { color: colors.foreground }]}>{m.title}</Text>
                <Text style={[styles.mDesc, { color: colors.mutedForeground }]}>{m.desc}</Text>
              </View>
              {m.done ? <Ionicons name="checkmark-circle" size={24} color={colors.accent} /> : <Badge label={`+${m.xp} XP`} variant="success" />}
            </View>
            {!m.done && <ProgressBar progress={m.progress} height={6} label={`${Math.round(m.progress * 100)}%`} showLabel style={{ marginTop: 12 }} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1.5 },
  tabText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  card: { padding: 14, borderRadius: 14, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  mTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  mDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 3 },
});

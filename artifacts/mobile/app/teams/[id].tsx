import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const MEMBERS = [
  { id: '1', name: 'TerritoryKing', role: 'Captain', level: 31 },
  { id: '2', name: 'RunQueen', role: 'Lieutenant', level: 28 },
  { id: '3', name: 'gridseizer', role: 'Member', level: 24 },
  { id: '4', name: 'HexMaster', role: 'Member', level: 22 },
];

export default function TeamDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Team" rightIcon="ellipsis-horizontal" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.teamEmoji}>⚡</Text>
          <Text style={styles.teamName}>GridSeizers</Text>
          <Text style={styles.teamRank}>Rank #12 · Level 8</Text>
          <View style={styles.statsRow}>
            {[{ label: 'Members', val: '24' }, { label: 'Territories', val: '134' }, { label: 'Total Wins', val: '47' }].map(s => (
              <View key={s.label} style={styles.stat}><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLabel}>{s.label}</Text></View>
            ))}
          </View>
        </View>
        <View style={{ padding: 16, gap: 12 }}>
          <View style={styles.actions}>
            <Button title="Team Chat" onPress={() => router.push('/teams/chat')} variant="primary" style={{ flex: 1 }} />
            <Button title="Missions" onPress={() => router.push('/teams/missions')} variant="outline" style={{ flex: 1 }} />
          </View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Members</Text>
          {MEMBERS.map(m => (
            <View key={m.id} style={[styles.memberRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Avatar name={m.name} size={40} />
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.foreground }]}>{m.name}</Text>
                <Text style={[styles.memberRole, { color: colors.mutedForeground }]}>{m.role} · Level {m.level}</Text>
              </View>
              {m.role === 'Captain' && <Ionicons name="shield" size={18} color="#F59E0B" />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, alignItems: 'center', gap: 8 },
  teamEmoji: { fontSize: 48 },
  teamName: { fontSize: 24, fontFamily: 'Inter_700Bold', color: '#FFF' },
  teamRank: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  statsRow: { flexDirection: 'row', gap: 28, marginTop: 8 },
  stat: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  actions: { flexDirection: 'row', gap: 10 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  memberRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 12 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  memberRole: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

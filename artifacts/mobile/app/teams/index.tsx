import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const MY_TEAM = { name: 'GridSeizers', rank: 12, members: 24, territories: 134, wins: 47, level: 8 };
const SUGGESTED = [
  { id: '1', name: 'Territory Lords', members: 18, rank: 4, territory: 284, isRecruiting: true },
  { id: '2', name: 'Urban Conquerors', members: 22, rank: 9, territory: 198, isRecruiting: true },
  { id: '3', name: 'Street Warriors', members: 15, rank: 17, territory: 112, isRecruiting: false },
];

export default function TeamsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Teams" rightIcon="search-outline" onRightPress={() => router.push('/teams/search')} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* My Team */}
        <View style={[styles.myTeam, { backgroundColor: colors.primary }]}>
          <View style={styles.teamHeader}>
            <View style={styles.teamIcon}><Text style={styles.teamEmoji}>⚡</Text></View>
            <View>
              <Text style={styles.teamName}>{MY_TEAM.name}</Text>
              <Text style={styles.teamRank}>Rank #{MY_TEAM.rank} · Level {MY_TEAM.level}</Text>
            </View>
            <Badge label="My Team" variant="success" />
          </View>
          <View style={styles.teamStats}>
            {[
              { label: 'Members', value: MY_TEAM.members },
              { label: 'Territories', value: MY_TEAM.territories },
              { label: 'Total Wins', value: MY_TEAM.wins },
            ].map(s => (
              <View key={s.label} style={styles.teamStat}>
                <Text style={styles.teamStatVal}>{s.value}</Text>
                <Text style={styles.teamStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.teamActions}>
            <TouchableOpacity onPress={() => router.push('/teams/1')} style={[styles.teamBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Ionicons name="people-outline" size={16} color="#FFF" />
              <Text style={styles.teamBtnText}>View Team</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/teams/chat')} style={[styles.teamBtn, { backgroundColor: colors.accent }]}>
              <Ionicons name="chatbubble-outline" size={16} color="#FFF" />
              <Text style={styles.teamBtnText}>Team Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Suggested Teams */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Discover Teams</Text>
        {SUGGESTED.map(t => (
          <TouchableOpacity key={t.id} onPress={() => router.push(`/teams/${t.id}` as any)} style={[styles.teamCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={styles.cardIcon}><Text style={{ fontSize: 24 }}>🏆</Text></View>
            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <Text style={[styles.cardName, { color: colors.foreground }]}>{t.name}</Text>
                {t.isRecruiting && <Badge label="Recruiting" variant="success" size="sm" />}
              </View>
              <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>Rank #{t.rank} · {t.members} members · {t.territory} territories</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
        <Button title="Create Team" onPress={() => router.push('/teams/create')} variant="outline" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  myTeam: { borderRadius: 16, padding: 18, gap: 16 },
  teamHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  teamIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  teamEmoji: { fontSize: 24 },
  teamName: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFF' },
  teamRank: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  teamStats: { flexDirection: 'row', justifyContent: 'space-around' },
  teamStat: { alignItems: 'center', gap: 4 },
  teamStatVal: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  teamStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  teamActions: { flexDirection: 'row', gap: 10 },
  teamBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10 },
  teamBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  teamCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  cardIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  cardContent: { flex: 1, gap: 3 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  cardMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});

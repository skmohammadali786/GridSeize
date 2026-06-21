import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const MOCK_USER = { name: 'TerritoryKing', username: 'territoryking', level: 31, rank: 'Conqueror', territories: 124, followers: 3204, following: 412, isVerified: true, bio: 'Dominating SF one hex at a time 🗺️ DM for battles.' };

export default function UserProfileScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [following, setFollowing] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Player Profile" rightIcon="ellipsis-horizontal" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Avatar name={MOCK_USER.name} size={80} isPremium />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{MOCK_USER.name}</Text>
            {MOCK_USER.isVerified && <Ionicons name="checkmark-circle" size={18} color={colors.accent} />}
          </View>
          <Text style={styles.username}>@{MOCK_USER.username}</Text>
          <Text style={styles.bio}>{MOCK_USER.bio}</Text>
          <View style={styles.statsRow}>
            {[
              { label: 'Territories', value: MOCK_USER.territories },
              { label: 'Followers', value: MOCK_USER.followers },
              { label: 'Following', value: MOCK_USER.following },
            ].map(s => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statVal}>{s.value.toLocaleString()}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actionRow}>
            <Button title={following ? 'Following' : 'Follow'} onPress={() => setFollowing(p => !p)} variant={following ? 'outline' : 'primary'} style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => router.push('/chat/list')} style={[styles.msgBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Ionicons name="chatbubble-outline" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/map/battle')} style={[styles.battleBtn, { backgroundColor: colors.destructive }]}>
              <Ionicons name="flash" size={20} color="#FFF" />
              <Text style={styles.battleBtnText}>Battle</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 16, gap: 12 }}>
          <View style={[styles.levelCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Level {MOCK_USER.level} · {MOCK_USER.rank}</Text>
            <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>Top 0.3% globally</Text>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Activity</Text>
          {['Captured 8 hexes · 2h ago', 'Won battle vs RunQueen · 5h ago', 'Completed 10km run · 1d ago'].map(a => (
            <View key={a} style={[styles.actRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="ellipse" size={8} color={colors.accent} />
              <Text style={[styles.actText, { color: colors.foreground }]}>{a}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, alignItems: 'center', gap: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFF' },
  username: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_400Regular' },
  bio: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 19 },
  statsRow: { flexDirection: 'row', gap: 28 },
  stat: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFF' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  actionRow: { flexDirection: 'row', gap: 10, width: '100%' },
  msgBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  battleBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, borderRadius: 22 },
  battleBtnText: { color: '#FFF', fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  levelCard: { padding: 14, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  cardTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  cardSub: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  actRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, borderWidth: 1 },
  actText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const RECS = [
  { id: '1', type: 'route', icon: 'map-outline', title: 'Golden Gate Evening Run', desc: 'Best time: 6–8 PM. Low traffic, cool temp, 3 capturable hexes.', score: 95, color: '#22C55E', action: 'Start Route' },
  { id: '2', type: 'training', icon: 'barbell-outline', title: 'Interval Training Day', desc: 'Based on your fitness score, try 6×400m intervals at 4:30 pace.', score: 88, color: '#0EA5E9', action: 'View Plan' },
  { id: '3', type: 'territory', icon: 'grid-outline', title: 'Attack Mission District', desc: '4 undefended hexes nearby. High XP potential!', score: 92, color: '#F59E0B', action: 'View Map' },
  { id: '4', type: 'challenge', icon: 'trophy-outline', title: 'Midnight Sprint Challenge', desc: 'Join 342 players in tonight\'s city-wide sprint challenge.', score: 78, color: '#8B5CF6', action: 'Join' },
];

export default function AIRecommendationsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="AI Recommendations" subtitle="Personalized for you" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View style={[styles.aiHeader, { backgroundColor: colors.primary }]}>
          <Ionicons name="sparkles" size={24} color={colors.accent} />
          <View>
            <Text style={styles.aiTitle}>Your AI Coach analyzed your data</Text>
            <Text style={styles.aiSub}>Updated 5 minutes ago</Text>
          </View>
        </View>
        {RECS.map(r => (
          <View key={r.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: r.color + '18' }]}>
                <Ionicons name={r.icon as any} size={22} color={r.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.foreground }]}>{r.title}</Text>
                <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>{r.desc}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: r.color + '18' }]}>
                <Text style={[styles.scoreText, { color: r.color }]}>{r.score}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/ai-coach/index')} style={[styles.actionBtn, { backgroundColor: r.color + '18', borderColor: r.color + '33' }]}>
              <Text style={[styles.actionText, { color: r.color }]}>{r.action}</Text>
              <Ionicons name="chevron-forward" size={14} color={r.color} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  aiHeader: { borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  aiSub: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  card: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  cardDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 3, lineHeight: 19 },
  scoreBadge: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, borderRadius: 10, borderWidth: 1 },
  actionText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});

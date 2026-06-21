import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

const PLAN_ITEMS = [
  { day: 'Mon', type: 'Easy Run', dist: '5 km', done: true },
  { day: 'Tue', type: 'Rest', dist: 'Recovery', done: true },
  { day: 'Wed', type: 'Intervals', dist: '6×400m', done: true },
  { day: 'Thu', type: 'Easy Run', dist: '4 km', done: false },
  { day: 'Fri', type: 'Tempo', dist: '8 km', done: false },
  { day: 'Sat', type: 'Long Run', dist: '16 km', done: false },
  { day: 'Sun', type: 'Rest', dist: 'Recovery', done: false },
];

export default function AICoachScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="AI Coach" rightIcon="chatbubble-outline" onRightPress={() => router.push('/ai-coach/chat')} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Greeting */}
        <View style={[styles.greeting, { backgroundColor: colors.primary }]}>
          <View style={[styles.aiAvatar, { backgroundColor: colors.accent + '22' }]}>
            <Ionicons name="sparkles" size={28} color={colors.accent} />
          </View>
          <View style={styles.greetContent}>
            <Text style={styles.greetTitle}>Good morning, Alex!</Text>
            <Text style={styles.greetMsg}>Today is an interval training day. You're on track for your 10K goal!</Text>
          </View>
        </View>
        {/* Fitness Score */}
        <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Fitness Score</Text>
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreNum, { color: colors.accent }]}>78</Text>
            <View style={styles.scoreRight}>
              <Text style={[styles.scoreTrend, { color: colors.success }]}>▲ +3 this week</Text>
              <ProgressBar progress={0.78} height={8} style={{ width: 120 }} />
            </View>
          </View>
        </View>
        {/* Weekly Plan */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>This Week's Plan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.planScroll}>
            {PLAN_ITEMS.map((item, i) => (
              <View key={item.day} style={[styles.planDay, { backgroundColor: item.done ? colors.tintBackground : colors.card, borderColor: item.done ? colors.accent : colors.border }]}>
                <Text style={[styles.planDayLabel, { color: colors.mutedForeground }]}>{item.day}</Text>
                <Ionicons name={item.done ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={item.done ? colors.accent : colors.mutedForeground} />
                <Text style={[styles.planType, { color: colors.foreground }]}>{item.type}</Text>
                <Text style={[styles.planDist, { color: colors.mutedForeground }]}>{item.dist}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Quick Links */}
        <View style={styles.links}>
          {[
            { label: 'Daily Plan', icon: 'today-outline', route: '/ai-coach/daily-plan' },
            { label: 'Weekly Plan', icon: 'calendar-outline', route: '/ai-coach/weekly-plan' },
            { label: 'Insights', icon: 'analytics-outline', route: '/ai-coach/insights' },
            { label: 'Nutrition', icon: 'restaurant-outline', route: '/ai-coach/nutrition' },
            { label: 'Recovery', icon: 'bed-outline', route: '/ai-coach/recovery' },
            { label: 'Programs', icon: 'list-outline', route: '/ai-coach/programs' },
          ].map(l => (
            <TouchableOpacity key={l.label} onPress={() => router.push(l.route as any)} style={[styles.linkCard, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.8}>
              <Ionicons name={l.icon as any} size={20} color={colors.accent} />
              <Text style={[styles.linkLabel, { color: colors.foreground }]}>{l.label}</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Chat with AI Coach" onPress={() => router.push('/ai-coach/chat')} variant="primary" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  greeting: { borderRadius: 16, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  aiAvatar: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  greetContent: { flex: 1, gap: 6 },
  greetTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  greetMsg: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.8)', lineHeight: 19 },
  scoreCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 10 },
  cardTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  scoreNum: { fontSize: 52, fontFamily: 'Inter_700Bold' },
  scoreRight: { gap: 8 },
  scoreTrend: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 10 },
  planScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  planDay: { width: 80, padding: 10, borderRadius: 12, borderWidth: 1, marginRight: 8, alignItems: 'center', gap: 6 },
  planDayLabel: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  planType: { fontSize: 11, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  planDist: { fontSize: 11, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  links: { gap: 8 },
  linkCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, gap: 12 },
  linkLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
});

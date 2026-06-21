import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

const FEATURES = [
  { icon: 'warning-outline', label: 'SOS Emergency', desc: 'Instantly alert your contacts', route: '/safety/sos', color: '#EF4444', urgent: true },
  { icon: 'navigate-outline', label: 'Live Tracking', desc: 'Share your location with trusted contacts', route: '/safety/live-tracking', color: '#0EA5E9', urgent: false },
  { icon: 'shield-checkmark-outline', label: 'Safe Route Finder', desc: 'Find the safest route for your run', route: '/safety/safe-route', color: '#22C55E', urgent: false },
  { icon: 'people-outline', label: 'Trusted Contacts', desc: 'Manage your safety contacts', route: '/safety/trusted-contacts', color: '#8B5CF6', urgent: false },
  { icon: 'alert-circle-outline', label: 'Report Incident', desc: 'Report unsafe areas or incidents', route: '/safety/incident', color: '#F59E0B', urgent: false },
  { icon: 'female-outline', label: 'Women\'s Routes', desc: 'Verified safe routes for women runners', route: '/safety/women-routes', color: '#EC4899', urgent: false },
];

export default function SafetyScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Safety Center" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Safety Score */}
        <View style={[styles.scoreCard, { backgroundColor: colors.primary }]}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Your Safety Score</Text>
            <Text style={styles.scoreVal}>94</Text>
            <Text style={styles.scoreSub}>Excellent — all systems active</Text>
          </View>
          <Ionicons name="shield-checkmark" size={56} color="#22C55E" />
        </View>
        {/* SOS Button */}
        <TouchableOpacity onPress={() => router.push('/safety/sos')} style={[styles.sosBtn, { backgroundColor: colors.destructive }]} activeOpacity={0.9}>
          <Ionicons name="warning" size={28} color="#FFF" />
          <View>
            <Text style={styles.sosBtnTitle}>SOS Emergency</Text>
            <Text style={styles.sosBtnSub}>Hold 3 seconds to activate</Text>
          </View>
        </TouchableOpacity>
        {/* Features */}
        {FEATURES.filter(f => !f.urgent).map(f => (
          <TouchableOpacity key={f.label} onPress={() => router.push(f.route as any)} style={[styles.feature, { backgroundColor: colors.card, borderColor: colors.border }]} activeOpacity={0.85}>
            <View style={[styles.featureIcon, { backgroundColor: f.color + '18' }]}>
              <Ionicons name={f.icon as any} size={22} color={f.color} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureLabel, { color: colors.foreground }]}>{f.label}</Text>
              <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{f.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  scoreCard: { borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreLeft: { gap: 4 },
  scoreLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_400Regular' },
  scoreVal: { fontSize: 48, fontFamily: 'Inter_700Bold', color: '#22C55E' },
  scoreSub: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter_400Regular' },
  sosBtn: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 16, gap: 14 },
  sosBtnTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#FFF' },
  sosBtnSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter_400Regular', marginTop: 2 },
  feature: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  featureIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  featureContent: { flex: 1 },
  featureLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  featureDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});

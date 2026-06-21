import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';

const FEATURES = [
  { icon: 'analytics-outline', label: 'Advanced Analytics', desc: 'Deep performance insights and trends' },
  { icon: 'shield-checkmark-outline', label: 'Priority Defense', desc: 'Double territory defense power' },
  { icon: 'grid-outline', label: 'Unlimited Territory', desc: 'No cap on territory ownership' },
  { icon: 'sparkles-outline', label: 'AI Coach Pro', desc: 'Full personalized coaching suite' },
  { icon: 'trophy-outline', label: 'Exclusive Challenges', desc: 'Premium-only competitions' },
  { icon: 'diamond-outline', label: 'Premium Currency', desc: '100 gems per month included' },
  { icon: 'color-palette-outline', label: 'Custom Themes', desc: 'Unique avatar frames and map themes' },
  { icon: 'flash-outline', label: 'XP Boosts', desc: '1.5× XP on all activities' },
];

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: '$9.99', per: '/month', popular: false, savings: null },
  { id: 'yearly', label: 'Annual', price: '$79.99', per: '/year', popular: true, savings: 'Save 33%' },
  { id: 'lifetime', label: 'Lifetime', price: '$199.99', per: 'one-time', popular: false, savings: 'Best Value' },
];

export default function PremiumScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="GridSeize Premium" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Ionicons name="diamond" size={48} color="#8B5CF6" />
          <Text style={styles.heroTitle}>Go Premium</Text>
          <Text style={styles.heroSub}>Unlock the full GridSeize experience and dominate your city</Text>
        </View>
        {/* Features */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>What You Get</Text>
          <View style={styles.features}>
            {FEATURES.map(f => (
              <View key={f.label} style={[styles.feature, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.fIcon, { backgroundColor: '#8B5CF6' + '18' }]}>
                  <Ionicons name={f.icon as any} size={20} color="#8B5CF6" />
                </View>
                <View>
                  <Text style={[styles.fLabel, { color: colors.foreground }]}>{f.label}</Text>
                  <Text style={[styles.fDesc, { color: colors.mutedForeground }]}>{f.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Plans */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Choose a Plan</Text>
          <View style={styles.plans}>
            {PLANS.map(p => (
              <TouchableOpacity key={p.id} onPress={() => router.push('/premium/upgrade')}
                style={[styles.plan, { backgroundColor: p.popular ? colors.primary : colors.card, borderColor: p.popular ? colors.accent : colors.border, borderWidth: p.popular ? 2 : 1 }]}
                activeOpacity={0.85}>
                {p.popular && <View style={[styles.popularBadge, { backgroundColor: colors.accent }]}><Text style={styles.popularText}>Most Popular</Text></View>}
                {p.savings && !p.popular && <View style={[styles.savingsBadge, { backgroundColor: colors.warning + '22' }]}><Text style={[styles.savingsText, { color: colors.warning }]}>{p.savings}</Text></View>}
                <Text style={[styles.planLabel, { color: p.popular ? '#FFF' : colors.foreground }]}>{p.label}</Text>
                <Text style={[styles.planPrice, { color: p.popular ? colors.accent : colors.foreground }]}>{p.price}</Text>
                <Text style={[styles.planPer, { color: p.popular ? 'rgba(255,255,255,0.6)' : colors.mutedForeground }]}>{p.per}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button title="Start Free Trial (7 days)" onPress={() => router.push('/premium/upgrade')} variant="primary" size="lg" fullWidth />
        <Text style={[styles.legal, { color: colors.mutedForeground }]}>Cancel anytime. No charges until trial ends.</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { borderRadius: 20, padding: 28, alignItems: 'center', gap: 12 },
  heroTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#FFF' },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  features: { gap: 10 },
  feature: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 12 },
  fIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  fLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  fDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  plans: { flexDirection: 'row', gap: 10 },
  plan: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16, gap: 4, position: 'relative', overflow: 'hidden' },
  popularBadge: { position: 'absolute', top: 0, right: 0, left: 0, paddingVertical: 4, alignItems: 'center' },
  popularText: { fontSize: 10, fontFamily: 'Inter_700Bold', color: '#FFF', letterSpacing: 0.5 },
  savingsBadge: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 8, paddingVertical: 4, borderBottomLeftRadius: 10 },
  savingsText: { fontSize: 9, fontFamily: 'Inter_700Bold' },
  planLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold', marginTop: 20 },
  planPrice: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  planPer: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  legal: { textAlign: 'center', fontSize: 12, fontFamily: 'Inter_400Regular' },
});

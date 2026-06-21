import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: '$9.99', per: 'per month', trial: '7-day free trial', highlight: false },
  { id: 'yearly', label: 'Annual', price: '$79.99', per: 'per year · $6.67/mo', trial: '7-day free trial', highlight: true, savings: 'Save 33%' },
  { id: 'lifetime', label: 'Lifetime', price: '$199.99', per: 'one-time payment', trial: null, highlight: false, savings: 'Best Value' },
];

const PERKS = [
  { icon: 'analytics-outline', text: 'Advanced performance analytics' },
  { icon: 'shield-checkmark-outline', text: '2× territory defense power' },
  { icon: 'grid-outline', text: 'Unlimited territory ownership' },
  { icon: 'sparkles-outline', text: 'Full AI Coach suite' },
  { icon: 'flash-outline', text: '1.5× XP on all activities' },
  { icon: 'diamond-outline', text: '100 gems monthly' },
];

export default function UpgradeScreen() {
  const colors = useColors();
  const [selected, setSelected] = useState('yearly');
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    Alert.alert(
      'Welcome to Premium! 🎉',
      'Your 7-day free trial has started. Enjoy all premium features!',
      [{ text: 'Let\'s go!', onPress: () => router.replace('/(tabs)' as any) }],
    );
  }

  const plan = PLANS.find(p => p.id === selected)!;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Upgrade to Premium" />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={styles.gemRow}>
            <Ionicons name="diamond" size={40} color="#8B5CF6" />
          </View>
          <Text style={styles.heroTitle}>Unlock Your Full Potential</Text>
          <View style={styles.perksGrid}>
            {PERKS.map(p => (
              <View key={p.icon} style={styles.perk}>
                <Ionicons name={p.icon as any} size={16} color={colors.accent} />
                <Text style={styles.perkText}>{p.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Plans */}
        <View style={{ padding: 16, gap: 10 }}>
          {PLANS.map(plan => (
            <TouchableOpacity key={plan.id} onPress={() => setSelected(plan.id)}
              style={[styles.planCard, {
                backgroundColor: selected === plan.id ? (plan.highlight ? colors.primary : colors.tintBackground) : colors.card,
                borderColor: selected === plan.id ? colors.accent : colors.border,
                borderWidth: selected === plan.id ? 2 : 1,
              }]}>
              <View style={styles.planLeft}>
                <View style={styles.planNameRow}>
                  <Text style={[styles.planLabel, { color: selected === plan.id && plan.highlight ? '#FFF' : colors.foreground }]}>{plan.label}</Text>
                  {plan.savings && (
                    <View style={[styles.savingsTag, { backgroundColor: colors.accent }]}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.planPer, { color: selected === plan.id && plan.highlight ? 'rgba(255,255,255,0.6)' : colors.mutedForeground }]}>{plan.per}</Text>
                {plan.trial && <Text style={[styles.trialText, { color: colors.accent }]}>{plan.trial}</Text>}
              </View>
              <View style={styles.planRight}>
                <Text style={[styles.planPrice, { color: selected === plan.id ? colors.accent : colors.foreground }]}>{plan.price}</Text>
              </View>
              <View style={[styles.radio, { borderColor: selected === plan.id ? colors.accent : colors.border, backgroundColor: selected === plan.id ? colors.accent : 'transparent' }]}>
                {selected === plan.id && <Ionicons name="checkmark" size={12} color="#FFF" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity onPress={handleSubscribe} disabled={loading}
          style={[styles.cta, { backgroundColor: colors.accent }]}>
          {loading ? <ActivityIndicator color="#FFF" /> : null}
          <Text style={styles.ctaText}>
            {plan.trial ? `Start Free Trial · ${plan.price}` : `Buy Lifetime · ${plan.price}`}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.legal, { color: colors.mutedForeground }]}>
          Cancel anytime in App Store settings. No charges during trial.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { padding: 24, gap: 16 },
  gemRow: { alignItems: 'center' },
  heroTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFF', textAlign: 'center' },
  perksGrid: { gap: 10 },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  perkText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.85)' },
  planCard: { borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  planLeft: { flex: 1, gap: 3 },
  planNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  planLabel: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  savingsTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  savingsText: { fontSize: 11, fontFamily: 'Inter_700Bold', color: '#FFF' },
  planPer: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  trialText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  planRight: {},
  planPrice: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, borderTopWidth: 1, gap: 8 },
  cta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 16 },
  ctaText: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#FFF' },
  legal: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});

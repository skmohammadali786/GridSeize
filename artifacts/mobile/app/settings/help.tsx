import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const FAQS = [
  { q: 'How do I capture a hex?', a: 'Start an activity (run, walk, or cycle) and move through a hex area on the map. Complete the activity and the hexes you passed through will be marked as captured.' },
  { q: 'How does territory defense work?', a: 'Your territories decay if you haven\'t visited them recently. Return to them during an activity to refresh your ownership. Premium users get 2× defense strength.' },
  { q: 'What is the XP system?', a: 'You earn XP for every kilometre you cover, hexes you capture, challenges you complete, and social interactions. XP determines your level and league ranking.' },
  { q: 'Can I compete with friends?', a: 'Yes! Follow friends, join clubs, and compete on leaderboards. You can also challenge specific players to territory battles.' },
  { q: 'How does heart rate tracking work?', a: 'Connect a wearable device under Settings → Connected Devices. GridSeize will read real-time HR data during your activities.' },
  { q: 'How do I cancel Premium?', a: 'Go to Settings → Premium or manage subscriptions in your App Store / Google Play account settings.' },
];

export default function HelpScreen() {
  const colors = useColors();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Help Center" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 40 }}>
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.mutedForeground} />
          <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>Search help articles…</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>FREQUENTLY ASKED QUESTIONS</Text>

        {FAQS.map((faq, i) => (
          <TouchableOpacity key={i} onPress={() => setExpanded(expanded === i ? null : i)}
            style={[styles.faqCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.faqHeader}>
              <Text style={[styles.faqQ, { color: colors.foreground, flex: 1 }]}>{faq.q}</Text>
              <Ionicons name={expanded === i ? 'chevron-up' : 'chevron-down'} size={18} color={colors.mutedForeground} />
            </View>
            {expanded === i && (
              <Text style={[styles.faqA, { color: colors.mutedForeground }]}>{faq.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={[styles.contactCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="mail-outline" size={28} color={colors.accent} />
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactSub}>Our support team usually responds within 24 hours.</Text>
          <TouchableOpacity style={[styles.contactBtn, { backgroundColor: colors.accent }]}>
            <Text style={styles.contactBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1 },
  searchPlaceholder: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  faqCard: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  faqHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  faqQ: { fontSize: 15, fontFamily: 'Inter_600SemiBold', lineHeight: 22 },
  faqA: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },
  contactCard: { borderRadius: 18, padding: 24, alignItems: 'center', gap: 10, marginTop: 8 },
  contactTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#FFF' },
  contactSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  contactBtn: { marginTop: 4, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  contactBtnText: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#FFF' },
});

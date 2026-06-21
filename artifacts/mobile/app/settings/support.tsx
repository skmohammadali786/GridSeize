import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['Bug report', 'Account issue', 'Billing', 'Feature request', 'Other'];

export default function SupportScreen() {
  const colors = useColors();
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!category || !message.trim()) {
      Alert.alert('Missing info', 'Please select a category and describe your issue.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    Alert.alert('Ticket submitted! ✅', 'Our team will respond within 24 hours. Check your email for updates.', [{ text: 'OK', onPress: () => { setCategory(''); setMessage(''); } }]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Contact Support" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <View style={[styles.infoCard, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
          <Ionicons name="time-outline" size={20} color={colors.accent} />
          <Text style={[styles.infoText, { color: colors.foreground }]}>Average response time: <Text style={{ color: colors.accent, fontFamily: 'Inter_600SemiBold' }}>under 24 hours</Text></Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>CATEGORY</Text>
        <View style={styles.categories}>
          {CATEGORIES.map(c => (
            <TouchableOpacity key={c} onPress={() => setCategory(c)}
              style={[styles.catChip, {
                backgroundColor: category === c ? colors.accent : colors.card,
                borderColor: category === c ? colors.accent : colors.border,
              }]}>
              <Text style={[styles.catText, { color: category === c ? '#FFF' : colors.foreground }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>DESCRIBE YOUR ISSUE</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Please describe your issue in detail…"
          placeholderTextColor={colors.mutedForeground}
          multiline
          style={[styles.textarea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
          textAlignVertical="top"
        />

        <TouchableOpacity onPress={submit} disabled={loading}
          style={[styles.submitBtn, { backgroundColor: colors.accent }]}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Ionicons name="send-outline" size={18} color="#FFF" />}
          <Text style={styles.submitText}>{loading ? 'Submitting…' : 'Submit Ticket'}</Text>
        </TouchableOpacity>

        <View style={[styles.altContact, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="logo-twitter" size={18} color="#1DA1F2" />
          <Text style={[styles.altText, { color: colors.foreground }]}>Tweet us <Text style={{ color: colors.accent }}>@GridSeize</Text></Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1 },
  infoText: { fontSize: 14, fontFamily: 'Inter_400Regular', flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: -8 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 100, borderWidth: 1 },
  catText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  textarea: { borderRadius: 14, borderWidth: 1, padding: 14, fontSize: 15, fontFamily: 'Inter_400Regular', minHeight: 140 },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14 },
  submitText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  altContact: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1 },
  altText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export default function LiveTrackingScreen() {
  const colors = useColors();
  const [tracking, setTracking] = useState(false);
  const CONTACTS = [{ name: 'Sarah (Mom)', sharing: true }, { name: 'John (Dad)', sharing: false }];
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Live Tracking" />
      <MapPlaceholder style={styles.map} />
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={[styles.toggleCard, { backgroundColor: colors.card, borderColor: tracking ? colors.accent : colors.border }]}>
          <View>
            <Text style={[styles.toggleTitle, { color: colors.foreground }]}>Live Tracking</Text>
            <Text style={[styles.toggleSub, { color: colors.mutedForeground }]}>{tracking ? 'Sharing your location with contacts' : 'Off — contacts cannot see you'}</Text>
          </View>
          <Switch value={tracking} onValueChange={setTracking} trackColor={{ true: colors.accent, false: colors.muted }} />
        </View>
        {tracking && (
          <View style={[styles.shareInfo, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
            <Ionicons name="location" size={16} color={colors.accent} />
            <Text style={[styles.shareInfoText, { color: colors.foreground }]}>Session started · Location updating every 30s</Text>
          </View>
        )}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Sharing With</Text>
        {CONTACTS.map(c => (
          <View key={c.name} style={[styles.contactRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Avatar name={c.name} size={40} />
            <Text style={[styles.contactName, { color: colors.foreground }]}>{c.name}</Text>
            <Switch value={c.sharing} trackColor={{ true: colors.accent, false: colors.muted }} />
          </View>
        ))}
        <Button title="Add Safety Contact" onPress={() => {}} variant="outline" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: 200 },
  content: {},
  toggleCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 14, borderWidth: 1.5 },
  toggleTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  toggleSub: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  shareInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  shareInfoText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, gap: 12 },
  contactName: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
});

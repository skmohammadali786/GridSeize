import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const LINKS = [
  { label: 'Terms of Service', icon: 'document-text-outline', url: 'https://gridseize.app/terms' },
  { label: 'Privacy Policy', icon: 'shield-outline', url: 'https://gridseize.app/privacy' },
  { label: 'Open Source Licenses', icon: 'code-slash-outline', url: 'https://gridseize.app/licenses' },
  { label: 'Website', icon: 'globe-outline', url: 'https://gridseize.app' },
];

export default function AboutScreen() {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="About GridSeize" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 24, paddingBottom: 40, alignItems: 'center' }}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Ionicons name="grid-outline" size={48} color={colors.accent} />
        </View>
        <View style={styles.appInfo}>
          <Text style={[styles.appName, { color: colors.foreground }]}>GridSeize</Text>
          <Text style={[styles.version, { color: colors.mutedForeground }]}>Version 1.0.0 · Build 2026.06.21</Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>Conquer your city, one hex at a time</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, width: '100%' }]}>
          {LINKS.map((l, i) => (
            <View key={l.label}>
              <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(l.url)}>
                <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
                  <Ionicons name={l.icon as any} size={18} color={colors.mutedForeground} />
                </View>
                <Text style={[styles.label, { color: colors.foreground, flex: 1 }]}>{l.label}</Text>
                <Ionicons name="open-outline" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
              {i < LINKS.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        <Text style={[styles.copy, { color: colors.mutedForeground }]}>
          © 2026 GridSeize Inc. All rights reserved.{'\n'}Made with ❤️ for urban adventurers.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logo: { width: 96, height: 96, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  appInfo: { alignItems: 'center', gap: 4 },
  appName: { fontSize: 26, fontFamily: 'Inter_700Bold' },
  version: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  tagline: { fontSize: 14, fontFamily: 'Inter_400Regular', marginTop: 4 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  divider: { height: 1, marginLeft: 58 },
  copy: { fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 20 },
});

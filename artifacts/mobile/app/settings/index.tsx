import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/Avatar';

const SETTINGS = [
  {
    title: 'Account',
    items: [
      { label: 'Notifications', icon: 'notifications-outline', route: '/settings/notifications', hasArrow: true },
      { label: 'Privacy', icon: 'eye-outline', route: '/settings/privacy', hasArrow: true },
      { label: 'Security', icon: 'lock-closed-outline', route: '/settings/security', hasArrow: true },
    ],
  },
  {
    title: 'App',
    items: [
      { label: 'Map Settings', icon: 'map-outline', route: '/settings/map', hasArrow: true },
      { label: 'Theme', icon: 'color-palette-outline', route: '/settings/theme', hasArrow: true },
      { label: 'Language', icon: 'language-outline', route: '/settings/language', hasArrow: true },
    ],
  },
  {
    title: 'Devices',
    items: [
      { label: 'Connected Devices', icon: 'watch-outline', route: '/settings/devices', hasArrow: true },
      { label: 'Wearables', icon: 'fitness-outline', route: '/settings/wearables', hasArrow: true },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Export Data', icon: 'download-outline', route: '/settings/data-export', hasArrow: true },
      { label: 'Backup', icon: 'cloud-upload-outline', route: '/settings/data-backup', hasArrow: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', icon: 'help-circle-outline', route: '/settings/help', hasArrow: true },
      { label: 'FAQ', icon: 'chatbubble-ellipses-outline', route: '/settings/faq', hasArrow: true },
      { label: 'Contact Support', icon: 'mail-outline', route: '/settings/support', hasArrow: true },
      { label: 'About GridSeize', icon: 'information-circle-outline', route: '/settings/about', hasArrow: true },
    ],
  },
];

export default function SettingsScreen() {
  const colors = useColors();
  const { user, logout } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Settings" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile card */}
        <TouchableOpacity onPress={() => router.push('/profile/edit')} style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Avatar name={user?.displayName || 'User'} size={52} uri={user?.avatar} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground }]}>{user?.displayName}</Text>
            <Text style={[styles.profileUsername, { color: colors.mutedForeground }]}>@{user?.username}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
        </TouchableOpacity>

        {SETTINGS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{section.title.toUpperCase()}</Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity onPress={() => router.push(item.route as any)} style={styles.item}>
                    <View style={[styles.itemIcon, { backgroundColor: colors.muted }]}>
                      <Ionicons name={item.icon as any} size={18} color={colors.foreground} />
                    </View>
                    <Text style={[styles.itemLabel, { color: colors.foreground }]}>{item.label}</Text>
                    {item.hasArrow && <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />}
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={logout} style={[styles.logoutBtn, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive + '30', marginHorizontal: 16 }]}>
          <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={[styles.version, { color: colors.mutedForeground }]}>GridSeize v1.0.0 · Build 2026.06.21</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 14, borderRadius: 16, borderWidth: 1, gap: 12 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  profileUsername: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  sectionCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  itemIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemLabel: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium' },
  divider: { height: 1, marginLeft: 60 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  logoutText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  version: { textAlign: 'center', fontSize: 12, fontFamily: 'Inter_400Regular', marginBottom: 20 },
});

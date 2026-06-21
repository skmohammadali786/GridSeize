import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const colors = useColors();
  const [biometric, setBiometric] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Security" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: colors.accent + '18' }]}>
              <Ionicons name="finger-print-outline" size={20} color={colors.accent} />
            </View>
            <View style={styles.rowText}>
              <Text style={[styles.label, { color: colors.foreground }]}>Biometric login</Text>
              <Text style={[styles.desc, { color: colors.mutedForeground }]}>Use Face ID or fingerprint</Text>
            </View>
            <Switch value={biometric} onValueChange={setBiometric}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={biometric ? colors.accent : colors.mutedForeground} />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: colors.warning + '18' }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.warning} />
            </View>
            <View style={styles.rowText}>
              <Text style={[styles.label, { color: colors.foreground }]}>Two-factor auth</Text>
              <Text style={[styles.desc, { color: colors.mutedForeground }]}>Extra security via SMS or app</Text>
            </View>
            <Switch value={twoFactor} onValueChange={setTwoFactor}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={twoFactor ? colors.accent : colors.mutedForeground} />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.mutedForeground} />
            </View>
            <View style={styles.rowText}>
              <Text style={[styles.label, { color: colors.foreground }]}>Login alerts</Text>
              <Text style={[styles.desc, { color: colors.mutedForeground }]}>Notify on new device logins</Text>
            </View>
            <Switch value={loginAlerts} onValueChange={setLoginAlerts}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={loginAlerts ? colors.accent : colors.mutedForeground} />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>ACCOUNT</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { label: 'Change password', icon: 'key-outline', color: colors.foreground },
            { label: 'Change email', icon: 'mail-outline', color: colors.foreground },
            { label: 'Active sessions', icon: 'desktop-outline', color: colors.foreground },
          ].map((item, i) => (
            <View key={item.label}>
              <TouchableOpacity style={styles.row} onPress={() => Alert.alert(item.label, 'This feature requires a connected account.')}>
                <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
                  <Ionicons name={item.icon as any} size={18} color={colors.mutedForeground} />
                </View>
                <Text style={[styles.label, { color: item.color, flex: 1 }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
              {i < 2 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.dangerBtn, { borderColor: colors.destructive + '40' }]}
          onPress={() => Alert.alert('Sign out all devices', 'This will log you out on all devices.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out All', style: 'destructive' },
          ])}>
          <Ionicons name="log-out-outline" size={18} color={colors.destructive} />
          <Text style={[styles.dangerText, { color: colors.destructive }]}>Sign out all devices</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1 },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  divider: { height: 1, marginLeft: 16 },
  dangerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 14, borderWidth: 1 },
  dangerText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

export default function DataBackupScreen() {
  const colors = useColors();
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupOnWifi, setBackupOnWifi] = useState(true);
  const [loading, setLoading] = useState(false);

  const lastBackup = 'June 20, 2026 · 11:42 PM';
  const backupSize = '4.2 MB';

  async function backupNow() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    Alert.alert('Backup complete', 'All your data has been backed up successfully.');
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Backup" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        {/* Last backup */}
        <View style={[styles.statusCard, { backgroundColor: colors.tintBackground, borderColor: colors.accent + '33' }]}>
          <View style={[styles.statusIcon, { backgroundColor: colors.accent + '20' }]}>
            <Ionicons name="cloud-done-outline" size={26} color={colors.accent} />
          </View>
          <View>
            <Text style={[styles.statusLabel, { color: colors.foreground }]}>Last backup</Text>
            <Text style={[styles.statusDate, { color: colors.mutedForeground }]}>{lastBackup}</Text>
            <Text style={[styles.statusSize, { color: colors.accent }]}>{backupSize}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[styles.label, { color: colors.foreground }]}>Auto-backup</Text>
              <Text style={[styles.desc, { color: colors.mutedForeground }]}>Automatically backup daily</Text>
            </View>
            <Switch value={autoBackup} onValueChange={setAutoBackup}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={autoBackup ? colors.accent : colors.mutedForeground} />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={[styles.label, { color: colors.foreground }]}>Wi-Fi only</Text>
              <Text style={[styles.desc, { color: colors.mutedForeground }]}>Backup only over Wi-Fi</Text>
            </View>
            <Switch value={backupOnWifi} onValueChange={setBackupOnWifi}
              trackColor={{ false: colors.border, true: colors.accent + '80' }}
              thumbColor={backupOnWifi ? colors.accent : colors.mutedForeground} />
          </View>
        </View>

        <TouchableOpacity onPress={backupNow} disabled={loading}
          style={[styles.backupBtn, { backgroundColor: colors.accent }]}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Ionicons name="cloud-upload-outline" size={20} color="#FFF" />}
          <Text style={styles.backupBtnText}>{loading ? 'Backing up…' : 'Back Up Now'}</Text>
        </TouchableOpacity>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Restore', 'This would restore data from your most recent backup.')}>
            <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
              <Ionicons name="refresh-outline" size={18} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.label, { color: colors.foreground, flex: 1 }]}>Restore from backup</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Delete backup', 'This will permanently remove your cloud backup.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive' }])}>
            <View style={[styles.iconWrap, { backgroundColor: colors.destructive + '15' }]}>
              <Ionicons name="trash-outline" size={18} color={colors.destructive} />
            </View>
            <Text style={[styles.label, { color: colors.destructive, flex: 1 }]}>Delete backup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, gap: 14 },
  statusIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  statusLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  statusDate: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
  statusSize: { fontSize: 12, fontFamily: 'Inter_600SemiBold', marginTop: 3 },
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowText: { flex: 1 },
  label: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  desc: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  divider: { height: 1, marginLeft: 16 },
  iconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backupBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14 },
  backupBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
});

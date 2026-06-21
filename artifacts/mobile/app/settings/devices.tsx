import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const SUPPORTED = [
  { name: 'Apple Watch', icon: 'watch-outline', desc: 'Series 4 and above', color: '#0EA5E9' },
  { name: 'Garmin', icon: 'fitness-outline', desc: 'Fenix, Forerunner, Venu series', color: '#22C55E' },
  { name: 'Fitbit', icon: 'heart-outline', desc: 'All modern Fitbit devices', color: '#F59E0B' },
  { name: 'Polar', icon: 'pulse-outline', desc: 'H10, Vantage, Ignite series', color: '#EF4444' },
  { name: 'Wahoo', icon: 'bicycle-outline', desc: 'ELEMNT, TICKR series', color: '#8B5CF6' },
];

export default function DevicesScreen() {
  const colors = useColors();
  const [connected, setConnected] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  function connectDevice(name: string) {
    Alert.alert(
      `Connect ${name}`,
      'In production this opens Bluetooth pairing. Simulating connection…',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect', onPress: () => {
            setConnected(p => p.includes(name) ? p : [...p, name]);
          }
        },
      ],
    );
  }

  function scanForDevices() {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
    Alert.alert('Scanning…', 'Make sure your device is in pairing mode and nearby.');
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Connected Devices" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}>
        {connected.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>CONNECTED</Text>
            <View style={styles.cards}>
              {connected.map(name => {
                const dev = SUPPORTED.find(d => d.name === name)!;
                return (
                  <View key={name} style={[styles.card, { backgroundColor: dev.color + '10', borderColor: dev.color + '40' }]}>
                    <View style={[styles.devIcon, { backgroundColor: dev.color + '20' }]}>
                      <Ionicons name={dev.icon as any} size={22} color={dev.color} />
                    </View>
                    <View style={styles.devInfo}>
                      <Text style={[styles.devName, { color: colors.foreground }]}>{name}</Text>
                      <View style={styles.connectedRow}>
                        <View style={[styles.dot, { backgroundColor: colors.success }]} />
                        <Text style={[styles.connectedText, { color: colors.success }]}>Connected</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => setConnected(p => p.filter(n => n !== name))} style={[styles.disconnectBtn, { borderColor: colors.border }]}>
                      <Text style={[styles.disconnectText, { color: colors.mutedForeground }]}>Disconnect</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SUPPORTED DEVICES</Text>
          <View style={styles.cards}>
            {SUPPORTED.filter(d => !connected.includes(d.name)).map(dev => (
              <TouchableOpacity key={dev.name} onPress={() => connectDevice(dev.name)}
                style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.devIcon, { backgroundColor: dev.color + '18' }]}>
                  <Ionicons name={dev.icon as any} size={22} color={dev.color} />
                </View>
                <View style={styles.devInfo}>
                  <Text style={[styles.devName, { color: colors.foreground }]}>{dev.name}</Text>
                  <Text style={[styles.devDesc, { color: colors.mutedForeground }]}>{dev.desc}</Text>
                </View>
                <View style={[styles.pairBtn, { backgroundColor: dev.color + '18', borderColor: dev.color + '40' }]}>
                  <Text style={[styles.pairText, { color: dev.color }]}>Pair</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={scanForDevices}
          style={[styles.scanBtn, { backgroundColor: colors.accent, opacity: scanning ? 0.7 : 1 }]}>
          <Ionicons name="bluetooth-outline" size={20} color="#FFF" />
          <Text style={styles.scanText}>{scanning ? 'Scanning…' : 'Scan for devices'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1, marginBottom: 10 },
  cards: { gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, gap: 12 },
  devIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  devInfo: { flex: 1, gap: 3 },
  devName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  devDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  connectedRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  connectedText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  pairBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  pairText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  disconnectBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  disconnectText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  scanBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 14 },
  scanText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
});

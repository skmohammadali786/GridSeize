import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { MapPlaceholder } from '@/components/ui/MapPlaceholder';

interface Coord { latitude: number; longitude: number; }

function haversineKm(a: Coord, b: Coord): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function simulateHR(elapsedSecs: number, paused: boolean): number {
  if (paused) return 72;
  const rampSecs = 180;
  const t = Math.min(elapsedSecs, rampSecs) / rampSecs;
  const base = 72 + Math.round(t * 78);
  const jitter = Math.round(Math.sin(elapsedSecs * 0.3) * 4 + Math.random() * 3);
  return Math.min(base + jitter, 185);
}

export default function ActiveActivityScreen() {
  const colors = useColors();
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [hexes, setHexes] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastCoordRef = useRef<Coord | null>(null);
  const pausedRef = useRef(false);

  pausedRef.current = paused;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setElapsed(p => {
          const next = p + 1;
          setHeartRate(simulateHR(next, false));
          return next;
        });
      }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function handleLocationUpdate(coord: Coord) {
    if (pausedRef.current) return;
    if (lastCoordRef.current) {
      const km = haversineKm(lastCoordRef.current, coord);
      if (km > 0.003) {
        setDistance(d => d + km);
        if (Math.random() > 0.85) setHexes(h => h + 1);
      }
    }
    lastCoordRef.current = coord;
  }

  const pace = distance > 0 ? elapsed / 60 / distance : 0;

  return (
    <View style={styles.container}>
      <MapPlaceholder
        style={styles.map}
        onLocationUpdate={handleLocationUpdate}
        trackRoute={!paused}
      />
      <View style={styles.overlay}>
        <View style={[styles.timerBox, { backgroundColor: 'rgba(15,23,42,0.9)' }]}>
          <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        </View>
        <View style={[styles.statsBar, { backgroundColor: 'rgba(15,23,42,0.9)' }]}>
          {[
            { label: 'KM', value: distance.toFixed(2) },
            { label: 'PACE', value: pace > 0 ? `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, '0')}` : '--:--' },
            { label: 'HEXES', value: hexes.toString() },
            { label: 'CAL', value: Math.round(distance * 65).toString() },
          ].map(s => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
        {/* Heart rate */}
        <View style={[styles.hrBar, { backgroundColor: 'rgba(15,23,42,0.9)' }]}>
          <Ionicons name="heart" size={18} color={heartRate > 140 ? '#EF4444' : '#F59E0B'} />
          <Text style={styles.hrVal}>{heartRate}</Text>
          <Text style={styles.hrUnit}>BPM</Text>
          <View style={[styles.hrZone, { backgroundColor: heartRate > 160 ? '#EF444430' : heartRate > 140 ? '#F59E0B30' : '#22C55E30' }]}>
            <Text style={[styles.hrZoneText, { color: heartRate > 160 ? '#EF4444' : heartRate > 140 ? '#F59E0B' : '#22C55E' }]}>
              {heartRate > 160 ? 'Zone 5' : heartRate > 140 ? 'Zone 4' : heartRate > 120 ? 'Zone 3' : heartRate > 100 ? 'Zone 2' : 'Zone 1'}
            </Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => setPaused(p => !p)}
            style={[styles.pauseBtn, { backgroundColor: paused ? colors.accent : '#F59E0B' }]}
          >
            <Ionicons name={paused ? 'play' : 'pause'} size={32} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace('/activity/finish')}
            style={[styles.stopBtn, { backgroundColor: colors.destructive }]}
          >
            <Ionicons name="stop" size={24} color="#FFF" />
            <Text style={styles.stopText}>Finish</Text>
          </TouchableOpacity>
        </View>
        {hexes > 0 && (
          <View style={[styles.xpFlash, { backgroundColor: colors.accent }]}>
            <Text style={styles.xpFlashText}>+{hexes * 50} XP</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  overlay: { flex: 1, justifyContent: 'space-between', padding: 20, paddingTop: 60, paddingBottom: 40 },
  timerBox: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  timer: { fontSize: 52, fontFamily: 'Inter_700Bold', color: '#FFFFFF' },
  statsBar: { borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center', gap: 4 },
  statVal: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFFFFF' },
  statLabel: { fontSize: 10, fontFamily: 'Inter_700Bold', color: 'rgba(255,255,255,0.6)', letterSpacing: 1 },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: 20, alignItems: 'center' },
  pauseBtn: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  stopBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 36 },
  stopText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  xpFlash: { position: 'absolute', top: 120, right: 20, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100 },
  xpFlashText: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#FFF' },
  hrBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14 },
  hrVal: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#FFF' },
  hrUnit: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: 'rgba(255,255,255,0.6)', letterSpacing: 1, marginTop: 4 },
  hrZone: { marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  hrZoneText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
});

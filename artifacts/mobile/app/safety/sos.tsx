import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

export default function SOSScreen() {
  const colors = useColors();
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const pulse = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePress = () => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.15, duration: 400, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 400, useNativeDriver: true }),
    ])).start();
    setActivated(true);
    let count = 5;
    timerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        Alert.alert('SOS Activated', 'Emergency contacts have been notified with your location!', [{ text: 'OK', onPress: () => router.back() }]);
      }
    }, 1000);
  };

  const cancel = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActivated(false);
    setCountdown(5);
    pulse.setValue(1);
  };

  return (
    <View style={[styles.container, { backgroundColor: activated ? '#1a0000' : colors.background }]}>
      <ScreenHeader title="SOS Emergency" />
      <View style={styles.center}>
        {activated ? (
          <>
            <Text style={[styles.countdownLabel, { color: '#FFF' }]}>Alerting contacts in</Text>
            <Text style={[styles.countdown, { color: '#EF4444' }]}>{countdown}</Text>
            <TouchableOpacity onPress={cancel} style={[styles.cancelBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Text style={styles.cancelText}>Cancel SOS</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.instruction, { color: colors.foreground }]}>Press and hold the SOS button for 3 seconds to activate emergency alert</Text>
            <Animated.View style={{ transform: [{ scale: pulse }] }}>
              <TouchableOpacity onLongPress={handlePress} delayLongPress={1500} style={[styles.sosBtn, { backgroundColor: '#EF4444' }]} activeOpacity={0.9}>
                <Ionicons name="warning" size={48} color="#FFF" />
                <Text style={styles.sosBtnText}>SOS</Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={[styles.contactsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.contactsTitle, { color: colors.foreground }]}>Will notify:</Text>
              {['Sarah Rivera (Mom)', 'John Rivera (Dad)', 'Emergency Services'].map(c => (
                <View key={c} style={styles.contactRow}>
                  <Ionicons name="person-circle-outline" size={16} color={colors.accent} />
                  <Text style={[styles.contactName, { color: colors.foreground }]}>{c}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 32 },
  instruction: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 22 },
  sosBtn: { width: 180, height: 180, borderRadius: 90, alignItems: 'center', justifyContent: 'center', gap: 8 },
  sosBtnText: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#FFF', letterSpacing: 4 },
  countdown: { fontSize: 96, fontFamily: 'Inter_700Bold' },
  countdownLabel: { fontSize: 18, fontFamily: 'Inter_400Regular' },
  cancelBtn: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 100 },
  cancelText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#FFF' },
  contactsCard: { width: '100%', padding: 16, borderRadius: 14, borderWidth: 1, gap: 10 },
  contactsTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  contactName: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});

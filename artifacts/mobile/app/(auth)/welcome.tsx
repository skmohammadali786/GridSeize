import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Image source={require('@/assets/images/icon.png')} style={styles.bg} blurRadius={2} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(15,23,42,0.85)' }]} />
      <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.top}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
          <Text style={styles.title}>Conquer{'\n'}Every Block.</Text>
          <Text style={styles.subtitle}>
            Track your runs. Capture territories. Battle rivals. Explore the city like never before.
          </Text>
        </View>
        <View style={styles.featureRow}>
          {[
            { icon: '🗺️', label: 'Territory Wars' },
            { icon: '🏃', label: 'Fitness Tracking' },
            { icon: '🏆', label: 'Leaderboards' },
            { icon: '🤖', label: 'AI Coach' },
          ].map(f => (
            <View key={f.label} style={styles.feature}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.actions}>
          <Button title="Get Started" onPress={() => router.push('/(auth)/intro')} variant="success" size="lg" fullWidth />
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginBtn}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginAccent}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { position: 'absolute', width, height, opacity: 0.3 },
  content: { flex: 1, paddingHorizontal: 28, justifyContent: 'space-between' },
  top: {},
  badge: { backgroundColor: 'rgba(34,197,94,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100, alignSelf: 'flex-start', marginBottom: 20 },
  badgeText: { color: '#22C55E', fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 2 },
  title: { fontSize: 48, fontFamily: 'Inter_700Bold', color: '#FFFFFF', lineHeight: 54, marginBottom: 16 },
  subtitle: { fontSize: 16, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', lineHeight: 24 },
  featureRow: { flexDirection: 'row', justifyContent: 'space-between' },
  feature: { alignItems: 'center', gap: 8 },
  featureIcon: { fontSize: 28 },
  featureLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  actions: { gap: 16 },
  loginBtn: { alignItems: 'center', paddingVertical: 8 },
  loginText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'Inter_400Regular' },
  loginAccent: { color: '#22C55E', fontFamily: 'Inter_600SemiBold' },
});

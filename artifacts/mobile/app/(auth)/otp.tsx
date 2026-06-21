import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

export default function OTPScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = (val: string, i: number) => {
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleVerify = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    router.push('/(auth)/create-profile');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={colors.foreground} />
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.tintBackground }]}>
          <Ionicons name="mail-outline" size={32} color={colors.accent} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Verify your email</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>We sent a 6-digit code to your email address. Enter it below.</Text>
      </View>
      <View style={styles.otpRow}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={r => { refs.current[i] = r; }}
            value={d}
            onChangeText={v => handleChange(v.slice(-1), i)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.otpBox, { backgroundColor: colors.card, borderColor: d ? colors.accent : colors.border, color: colors.foreground, borderRadius: colors.radius }]}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !d && i > 0) refs.current[i - 1]?.focus();
            }}
          />
        ))}
      </View>
      <Button title="Verify" onPress={handleVerify} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 32 }} />
      <TouchableOpacity style={styles.resend}>
        <Text style={[styles.resendText, { color: colors.mutedForeground }]}>Didn't receive code? <Text style={{ color: colors.accent, fontFamily: 'Inter_600SemiBold' }}>Resend</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  back: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 32 },
  header: { alignItems: 'center', marginBottom: 40, gap: 16 },
  iconWrap: { width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 22 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  otpBox: { flex: 1, height: 56, textAlign: 'center', fontSize: 22, fontFamily: 'Inter_700Bold', borderWidth: 2 },
  resend: { alignItems: 'center', marginTop: 20 },
  resendText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});

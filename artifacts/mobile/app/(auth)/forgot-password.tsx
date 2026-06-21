import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={colors.foreground} />
      </TouchableOpacity>
      {!sent ? (
        <>
          <Text style={[styles.title, { color: colors.foreground }]}>Reset password</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Enter your email address and we'll send you a link to reset your password.</Text>
          <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
          <TextInput
            value={email} onChangeText={setEmail}
            placeholder="you@example.com" placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address" autoCapitalize="none"
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]}
          />
          <Button title="Send Reset Link" onPress={handleSend} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
        </>
      ) : (
        <View style={styles.successWrap}>
          <View style={[styles.iconWrap, { backgroundColor: colors.tintBackground }]}>
            <Ionicons name="checkmark-circle-outline" size={48} color={colors.accent} />
          </View>
          <Text style={[styles.title, { color: colors.foreground, textAlign: 'center' }]}>Email sent!</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, textAlign: 'center' }]}>Check your inbox for the reset link.</Text>
          <Button title="Back to Login" onPress={() => router.replace('/(auth)/login')} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  back: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 22, marginBottom: 32 },
  label: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  input: { padding: 14, borderWidth: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  iconWrap: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});

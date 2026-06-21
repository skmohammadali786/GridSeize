import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (pass.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (pass !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
  };

  if (done) return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 20 }]}>
      <View style={styles.success}>
        <View style={[styles.iconWrap, { backgroundColor: colors.tintBackground }]}><Ionicons name="checkmark-circle-outline" size={52} color={colors.accent} /></View>
        <Text style={[styles.title, { color: colors.foreground }]}>Password reset!</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>You can now sign in with your new password.</Text>
        <Button title="Sign In" onPress={() => router.replace('/(auth)/login')} variant="primary" size="lg" fullWidth />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={24} color={colors.foreground} /></TouchableOpacity>
      <Text style={[styles.title, { color: colors.foreground }]}>New password</Text>
      <Text style={[styles.sub, { color: colors.mutedForeground }]}>Create a strong new password for your account.</Text>
      {error ? <View style={[styles.err, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive }]}><Text style={{ color: colors.destructive, fontSize: 13 }}>{error}</Text></View> : null}
      <View style={styles.form}>
        {[{ label: 'New Password', val: pass, set: setPass }, { label: 'Confirm Password', val: confirm, set: setConfirm }].map(f => (
          <View key={f.label}>
            <Text style={[styles.label, { color: colors.foreground }]}>{f.label}</Text>
            <TextInput value={f.val} onChangeText={f.set} secureTextEntry placeholder="••••••••" placeholderTextColor={colors.mutedForeground}
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
          </View>
        ))}
      </View>
      <Button title="Reset Password" onPress={handleReset} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  back: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 8 },
  sub: { fontSize: 15, fontFamily: 'Inter_400Regular', marginBottom: 24, lineHeight: 22 },
  err: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  form: { gap: 16 },
  label: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  input: { padding: 14, borderWidth: 1, fontSize: 15 },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 24 },
  iconWrap: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});

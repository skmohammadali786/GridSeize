import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1200));
    login({ id: 'user-1', username: 'gridseizer', displayName: 'Alex Rivera', level: 24, xp: 8450, rank: 'Territory King', territories: 47, followers: 1203, following: 342, isVerified: true, isPremium: true });
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={[styles.inner, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Sign in to your GridSeize account</Text>
          </View>
          {error ? <View style={[styles.errorBox, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive }]}><Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text></View> : null}
          <View style={styles.form}>
            <View>
              <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
              <TextInput
                value={email} onChangeText={setEmail}
                placeholder="you@example.com" placeholderTextColor={colors.mutedForeground}
                keyboardType="email-address" autoCapitalize="none"
                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]}
              />
            </View>
            <View>
              <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
              <View style={[styles.passWrap, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
                <TextInput
                  value={password} onChangeText={setPassword}
                  placeholder="••••••••" placeholderTextColor={colors.mutedForeground}
                  secureTextEntry={!showPass}
                  style={[styles.passInput, { color: colors.foreground }]}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} style={{ alignSelf: 'flex-end' }}>
              <Text style={[styles.forgot, { color: colors.accent }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <Button title="Sign In" onPress={handleLogin} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 8 }} />
          <View style={styles.divider}>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Text style={[styles.or, { color: colors.mutedForeground }]}>or</Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>
          <TouchableOpacity style={[styles.socialBtn, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
            <Ionicons name="logo-google" size={20} color={colors.foreground} />
            <Text style={[styles.socialText, { color: colors.foreground }]}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={styles.signupLink}>
            <Text style={[styles.signupText, { color: colors.mutedForeground }]}>Don't have an account? <Text style={{ color: colors.accent, fontFamily: 'Inter_600SemiBold' }}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24 },
  back: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 24 },
  header: { marginBottom: 32 },
  title: { fontSize: 30, fontFamily: 'Inter_700Bold', marginBottom: 8 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  errorBox: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  errorText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  form: { gap: 16 },
  label: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  input: { padding: 14, borderWidth: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  passWrap: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1 },
  passInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', padding: 0 },
  forgot: { fontSize: 13, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 },
  line: { flex: 1, height: 1 },
  or: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  socialBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, borderWidth: 1 },
  socialText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  signupLink: { alignItems: 'center', marginTop: 20 },
  signupText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});

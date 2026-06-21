import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

export default function SignupScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields'); return; }
    if (!agree) { setError('Please accept the terms'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    router.push('/(auth)/otp');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={[styles.inner, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>Create account</Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Join thousands of territory conquerors</Text>
          </View>
          {error ? <View style={[styles.errorBox, { backgroundColor: colors.destructive + '12', borderColor: colors.destructive }]}><Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text></View> : null}
          <View style={styles.form}>
            {[
              { label: 'Full Name', value: name, set: setName, placeholder: 'Alex Rivera', type: 'default' as const },
              { label: 'Email', value: email, set: setEmail, placeholder: 'you@example.com', type: 'email-address' as const },
            ].map(f => (
              <View key={f.label}>
                <Text style={[styles.label, { color: colors.foreground }]}>{f.label}</Text>
                <TextInput
                  value={f.value} onChangeText={f.set}
                  placeholder={f.placeholder} placeholderTextColor={colors.mutedForeground}
                  keyboardType={f.type} autoCapitalize={f.type === 'email-address' ? 'none' : 'words'}
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]}
                />
              </View>
            ))}
            <View>
              <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
              <View style={[styles.passWrap, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
                <TextInput
                  value={password} onChangeText={setPassword}
                  placeholder="Min 8 characters" placeholderTextColor={colors.mutedForeground}
                  secureTextEntry={!showPass}
                  style={[styles.passInput, { color: colors.foreground }]}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.agreeRow}>
              <View style={[styles.checkbox, { borderColor: agree ? colors.accent : colors.border, backgroundColor: agree ? colors.accent : 'transparent' }]}>
                {agree && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={[styles.agreeText, { color: colors.mutedForeground }]}>
                I agree to the <Text style={{ color: colors.accent }}>Terms of Service</Text> and <Text style={{ color: colors.accent }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Button title="Create Account" onPress={handleSignup} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 24 }} />
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginLink}>
            <Text style={[styles.loginText, { color: colors.mutedForeground }]}>Already have an account? <Text style={{ color: colors.accent, fontFamily: 'Inter_600SemiBold' }}>Sign In</Text></Text>
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
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: { width: 20, height: 20, borderRadius: 5, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  agreeText: { flex: 1, fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  loginLink: { alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});

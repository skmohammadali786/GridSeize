import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export default function CreateProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push('/(auth)/interests');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={[styles.inner, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.progress}>
          <View style={[styles.progDot, { backgroundColor: colors.accent }]} />
          <View style={[styles.progLine, { backgroundColor: colors.border }]} />
          <View style={[styles.progDot, { backgroundColor: colors.border }]} />
          <View style={[styles.progLine, { backgroundColor: colors.border }]} />
          <View style={[styles.progDot, { backgroundColor: colors.border }]} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Create your profile</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Let other players know who you are</Text>
        <TouchableOpacity style={styles.avatarWrap}>
          <Avatar name={name || 'GS'} size={80} />
          <View style={[styles.editBadge, { backgroundColor: colors.accent }]}>
            <Ionicons name="camera-outline" size={14} color="#FFF" />
          </View>
        </TouchableOpacity>
        <View style={styles.form}>
          {[
            { label: 'Display Name', val: name, set: setName, placeholder: 'Alex Rivera', cap: 'words' as const },
            { label: 'Username', val: username, set: setUsername, placeholder: '@gridseizer', cap: 'none' as const },
          ].map(f => (
            <View key={f.label}>
              <Text style={[styles.label, { color: colors.foreground }]}>{f.label}</Text>
              <TextInput value={f.val} onChangeText={f.set} placeholder={f.placeholder} placeholderTextColor={colors.mutedForeground}
                autoCapitalize={f.cap}
                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
            </View>
          ))}
          <View>
            <Text style={[styles.label, { color: colors.foreground }]}>Bio</Text>
            <TextInput value={bio} onChangeText={setBio} placeholder="Tell us about yourself..." placeholderTextColor={colors.mutedForeground}
              multiline numberOfLines={3}
              style={[styles.bioInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
          </View>
        </View>
        <Button title="Continue" onPress={handle} loading={loading} variant="primary" size="lg" fullWidth style={{ marginTop: 32 }} />
        <TouchableOpacity onPress={() => router.push('/(auth)/interests')} style={styles.skip}>
          <Text style={[styles.skipText, { color: colors.mutedForeground }]}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24 },
  progress: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  progDot: { width: 10, height: 10, borderRadius: 5 },
  progLine: { flex: 1, height: 2, marginHorizontal: 4 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 8 },
  sub: { fontSize: 15, fontFamily: 'Inter_400Regular', marginBottom: 32 },
  avatarWrap: { alignSelf: 'center', marginBottom: 32 },
  editBadge: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  form: { gap: 16 },
  label: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  input: { padding: 14, borderWidth: 1, fontSize: 15 },
  bioInput: { padding: 14, borderWidth: 1, fontSize: 15, height: 90, textAlignVertical: 'top' },
  skip: { alignItems: 'center', marginTop: 16 },
  skipText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});

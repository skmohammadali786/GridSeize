import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/contexts/AppContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const colors = useColors();
  const { user } = useApp();
  const [name, setName] = useState(user?.displayName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Edit Profile" rightLabel="Save" onRightPress={handleSave} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }} keyboardShouldPersistTaps="handled">
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarWrap}>
            <Avatar name={name} uri={user?.avatar} size={88} />
            <View style={[styles.editOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <Ionicons name="camera-outline" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.changePhoto, { color: colors.accent }]}>Change Photo</Text>
        </View>
        {/* Fields */}
        {[
          { label: 'Display Name', value: name, set: setName, placeholder: 'Your name', type: 'words' as const },
          { label: 'Username', value: username, set: setUsername, placeholder: '@username', type: 'none' as const },
        ].map(f => (
          <View key={f.label}>
            <Text style={[styles.label, { color: colors.foreground }]}>{f.label}</Text>
            <TextInput value={f.value} onChangeText={f.set} placeholder={f.placeholder} placeholderTextColor={colors.mutedForeground}
              autoCapitalize={f.type}
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
          </View>
        ))}
        <View>
          <Text style={[styles.label, { color: colors.foreground }]}>Bio</Text>
          <TextInput value={bio} onChangeText={setBio} placeholder="Tell people about yourself..." placeholderTextColor={colors.mutedForeground}
            multiline numberOfLines={3}
            style={[styles.bioInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
          <Text style={[styles.charCount, { color: colors.mutedForeground }]}>{bio.length}/150</Text>
        </View>
        {/* Links */}
        {['Website', 'Instagram', 'Strava'].map(l => (
          <View key={l}>
            <Text style={[styles.label, { color: colors.foreground }]}>{l}</Text>
            <TextInput placeholder={`Your ${l}`} placeholderTextColor={colors.mutedForeground}
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: colors.radius }]} />
          </View>
        ))}
        <Button title="Save Changes" onPress={handleSave} loading={loading} variant="primary" size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarSection: { alignItems: 'center', gap: 12 },
  avatarWrap: { position: 'relative' },
  editOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  changePhoto: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  label: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  input: { padding: 14, borderWidth: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  bioInput: { padding: 14, borderWidth: 1, fontSize: 15, fontFamily: 'Inter_400Regular', height: 90, textAlignVertical: 'top' },
  charCount: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'right', marginTop: 4 },
});

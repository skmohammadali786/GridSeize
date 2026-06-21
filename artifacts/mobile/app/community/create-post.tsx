import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/Avatar';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/Button';

const TAGS = ['#running', '#territory', '#battle', '#personal-record', '#challenge', '#team', '#event'];

export default function CreatePostScreen() {
  const colors = useColors();
  const { user } = useApp();
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const toggleTag = (t: string) => setSelectedTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const handlePost = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.back();
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Create Post" rightLabel="Post" onRightPress={handlePost} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
        <View style={styles.inputArea}>
          <Avatar name={user?.displayName || 'You'} size={40} uri={user?.avatar} />
          <TextInput
            value={content} onChangeText={setContent}
            placeholder="Share your conquest, achievement, or challenge..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            style={[styles.textInput, { color: colors.foreground }]}
            autoFocus
          />
        </View>
        {/* Attach Activity */}
        <TouchableOpacity style={[styles.attachRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="fitness-outline" size={20} color={colors.accent} />
          <Text style={[styles.attachLabel, { color: colors.foreground }]}>Attach Recent Activity</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
        </TouchableOpacity>
        {/* Tags */}
        <View>
          <Text style={[styles.tagsTitle, { color: colors.foreground }]}>Add Tags</Text>
          <View style={styles.tagsWrap}>
            {TAGS.map(t => (
              <TouchableOpacity key={t} onPress={() => toggleTag(t)}
                style={[styles.tag, { backgroundColor: selectedTags.includes(t) ? colors.accent : colors.muted, borderColor: selectedTags.includes(t) ? colors.accent : colors.border }]}>
                <Text style={[styles.tagText, { color: selectedTags.includes(t) ? '#FFF' : colors.mutedForeground }]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Privacy */}
        <View style={[styles.privacyRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="globe-outline" size={18} color={colors.mutedForeground} />
          <Text style={[styles.privacyLabel, { color: colors.foreground }]}>Everyone can see this</Text>
          <Ionicons name="chevron-down" size={16} color={colors.mutedForeground} />
        </View>
        <Button title="Share Post" onPress={handlePost} loading={loading} variant="primary" size="lg" fullWidth />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  inputArea: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  textInput: { flex: 1, fontSize: 16, fontFamily: 'Inter_400Regular', minHeight: 120, textAlignVertical: 'top', lineHeight: 24, padding: 0 },
  attachRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, gap: 10 },
  attachLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
  tagsTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 10 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1 },
  tagText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  privacyRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, gap: 10 },
  privacyLabel: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium' },
});

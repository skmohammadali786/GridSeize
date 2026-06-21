import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Ionicons } from '@expo/vector-icons';

const MOCK_MESSAGES = [
  { id: '1', sender: 'TerritoryKing', text: 'Battle me at 8PM tonight?', time: '8:32 PM', mine: false },
  { id: '2', sender: 'me', text: 'I\'m in! Which territory?', time: '8:33 PM', mine: true },
  { id: '3', sender: 'TerritoryKing', text: 'Financial District Alpha. 30min battle.', time: '8:34 PM', mine: false },
  { id: '4', sender: 'me', text: 'Deal. See you there 💪', time: '8:34 PM', mine: true },
];

export default function ChatScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages(p => [...p, { id: Date.now().toString(), sender: 'me', text, time: 'now', mine: true }]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScreenHeader title="TerritoryKing" subtitle="Online now" rightIcon="ellipsis-horizontal" />
        <FlatList
          data={messages}
          keyExtractor={i => i.id}
          contentContainerStyle={{ padding: 16, gap: 8 }}
          renderItem={({ item }) => (
            <View style={[styles.msgRow, item.mine && styles.msgRowMine]}>
              {!item.mine && <Avatar name={item.sender} size={30} />}
              <View style={[styles.bubble, { backgroundColor: item.mine ? colors.accent : colors.card, borderColor: colors.border }]}>
                <Text style={[styles.bubbleText, { color: item.mine ? '#FFF' : colors.foreground }]}>{item.text}</Text>
                <Text style={[styles.bubbleTime, { color: item.mine ? 'rgba(255,255,255,0.7)' : colors.mutedForeground }]}>{item.time}</Text>
              </View>
            </View>
          )}
        />
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity><Ionicons name="add-circle-outline" size={24} color={colors.mutedForeground} /></TouchableOpacity>
          <TextInput value={text} onChangeText={setText} placeholder="Message..." placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground }]} returnKeyType="send" onSubmitEditing={send} />
          <TouchableOpacity onPress={send} style={[styles.sendBtn, { backgroundColor: text.trim() ? colors.accent : colors.muted }]}>
            <Ionicons name="send" size={18} color={text.trim() ? '#FFF' : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  msgRowMine: { flexDirection: 'row-reverse' },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 18, borderWidth: 1, gap: 4 },
  bubbleText: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 21 },
  bubbleTime: { fontSize: 10, fontFamily: 'Inter_400Regular', textAlign: 'right' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, gap: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', padding: 8, maxHeight: 80 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});

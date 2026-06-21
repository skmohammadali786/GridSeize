import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_MESSAGES = [
  { id: '1', role: 'ai', text: 'Hi Alex! I\'m your AI running coach. Today is an interval training day. Ready to crush it? 💪' },
  { id: '2', role: 'user', text: 'Yes! What should I do today?' },
  { id: '3', role: 'ai', text: 'Based on your fitness score of 78 and recent activity, I recommend: 6×400m intervals at 4:30 pace with 90s rest. Total: ~5km. Best time: 6PM based on weather forecasts.' },
];

const QUICK_PROMPTS = ['What\'s my plan for today?', 'How\'s my progress?', 'Best route near me', 'Recovery tips'];

export default function AICoachChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);

  const send = async (msg: string) => {
    if (!msg.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', text: msg };
    setMessages(p => [...p, userMsg]);
    setText('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    setTyping(false);
    setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: 'ai', text: 'Great question! Based on your recent performance data, I\'d recommend focusing on building your aerobic base this week. Your territory captures show you\'ve been running well in the 5-8km range. Let\'s build on that!' }]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScreenHeader title="AI Coach" subtitle="Powered by GridSeize AI" />
        <FlatList
          data={messages}
          keyExtractor={i => i.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          ListFooterComponent={typing ? (
            <View style={[styles.bubble, styles.aiBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.typing, { color: colors.mutedForeground }]}>Coach is typing...</Text>
            </View>
          ) : null}
          renderItem={({ item }) => (
            <View style={[item.role === 'ai' ? styles.aiRow : styles.userRow]}>
              {item.role === 'ai' && (
                <View style={[styles.aiAvatar, { backgroundColor: colors.accent + '22' }]}>
                  <Ionicons name="sparkles" size={16} color={colors.accent} />
                </View>
              )}
              <View style={[styles.bubble, item.role === 'ai' ? [styles.aiBubble, { backgroundColor: colors.card, borderColor: colors.border }] : [styles.userBubble, { backgroundColor: colors.accent }]]}>
                <Text style={[styles.bubbleText, { color: item.role === 'ai' ? colors.foreground : '#FFF' }]}>{item.text}</Text>
              </View>
            </View>
          )}
        />
        {/* Quick prompts */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptsScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {QUICK_PROMPTS.map(p => (
            <TouchableOpacity key={p} onPress={() => send(p)} style={[styles.promptChip, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Text style={[styles.promptText, { color: colors.mutedForeground }]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TextInput value={text} onChangeText={setText} placeholder="Ask your coach..." placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground }]} returnKeyType="send" onSubmitEditing={() => send(text)} />
          <TouchableOpacity onPress={() => send(text)} style={[styles.sendBtn, { backgroundColor: text.trim() ? colors.accent : colors.muted }]}>
            <Ionicons name="send" size={18} color={text.trim() ? '#FFF' : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  aiRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  userRow: { flexDirection: 'row-reverse' },
  aiAvatar: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, borderWidth: 1 },
  aiBubble: {},
  userBubble: { borderWidth: 0 },
  bubbleText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },
  typing: { fontSize: 13, fontFamily: 'Inter_400Regular', fontStyle: 'italic' },
  promptsScroll: { paddingVertical: 8 },
  promptChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  promptText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, gap: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', padding: 8 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});

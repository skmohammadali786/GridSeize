import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useTheme } from '@/contexts/ThemeContext';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';

const OPTIONS = [
  { value: 'light', label: 'Light', icon: 'sunny-outline', desc: 'Clean white background' },
  { value: 'dark', label: 'Dark', icon: 'moon-outline', desc: 'Easy on the eyes at night' },
] as const;

export default function ThemeScreen() {
  const colors = useColors();
  const { theme, setTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Theme" />
      <View style={styles.content}>
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>Choose your preferred appearance</Text>
        <View style={styles.options}>
          {OPTIONS.map(opt => {
            const selected = theme === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setTheme(opt.value)}
                style={[styles.option, {
                  backgroundColor: selected ? colors.tintBackground : colors.card,
                  borderColor: selected ? colors.accent : colors.border,
                  borderWidth: selected ? 2 : 1,
                }]}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIcon, { backgroundColor: selected ? colors.accent + '20' : colors.muted }]}>
                  <Ionicons name={opt.icon as any} size={28} color={selected ? colors.accent : colors.mutedForeground} />
                </View>
                <Text style={[styles.optionLabel, { color: colors.foreground }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.mutedForeground }]}>{opt.desc}</Text>
                {selected && (
                  <View style={[styles.checkmark, { backgroundColor: colors.accent }]}>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  hint: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  options: { flexDirection: 'row', gap: 12 },
  option: { flex: 1, borderRadius: 18, padding: 20, alignItems: 'center', gap: 10, position: 'relative' },
  optionIcon: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  optionLabel: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  optionDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  checkmark: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});

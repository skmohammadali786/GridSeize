import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface ChipProps { label: string; selected?: boolean; onPress?: () => void; style?: ViewStyle; }

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  const colors = useColors();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={[styles.chip, { backgroundColor: selected ? colors.accent : colors.muted, borderColor: selected ? colors.accent : colors.border, borderRadius: 100 }, style]}>
      <Text style={[styles.label, { color: selected ? colors.accentForeground : colors.mutedForeground }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, alignSelf: 'flex-start' },
  label: { fontSize: 13, fontFamily: 'Inter_500Medium' },
});

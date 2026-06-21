import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', size = 'sm', style }: BadgeProps) {
  const colors = useColors();
  const bg = {
    default: colors.muted,
    success: colors.tintBackground,
    warning: 'rgba(245,158,11,0.12)',
    danger: 'rgba(239,68,68,0.12)',
    accent: colors.tintBackground,
    outline: 'transparent',
  }[variant];
  const color = {
    default: colors.mutedForeground,
    success: colors.accent,
    warning: colors.warning,
    danger: colors.destructive,
    accent: colors.accent,
    outline: colors.mutedForeground,
  }[variant];
  const px = size === 'sm' ? 8 : 12;
  const py = size === 'sm' ? 3 : 5;
  const fs = size === 'sm' ? 11 : 13;
  return (
    <View style={[styles.badge, { backgroundColor: bg, paddingHorizontal: px, paddingVertical: py, borderWidth: variant === 'outline' ? 1 : 0, borderColor: colors.border }, style]}>
      <Text style={[styles.text, { color, fontSize: fs }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 100, alignSelf: 'flex-start' },
  text: { fontFamily: 'Inter_600SemiBold', letterSpacing: 0.2 },
});

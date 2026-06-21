import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  rightLabel?: string;
  onBack?: () => void;
}

export function ScreenHeader({ title, subtitle, rightIcon, onRightPress, rightLabel, onBack }: ScreenHeaderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 12, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={onBack || (() => router.back())} style={styles.back} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="arrow-back" size={24} color={colors.foreground} />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>}
      </View>
      {(rightIcon || rightLabel) ? (
        <TouchableOpacity onPress={onRightPress} style={styles.right}>
          {rightIcon && <Ionicons name={rightIcon} size={22} color={colors.foreground} />}
          {rightLabel && <Text style={[styles.rightLabel, { color: colors.accent }]}>{rightLabel}</Text>}
        </TouchableOpacity>
      ) : <View style={styles.right} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  back: { width: 40, alignItems: 'flex-start' },
  center: { flex: 1, alignItems: 'center' },
  title: { fontSize: 17, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  right: { width: 40, alignItems: 'flex-end' },
  rightLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});

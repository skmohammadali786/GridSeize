import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface MapPlaceholderProps { style?: ViewStyle; children?: React.ReactNode; }

export function MapPlaceholder({ style, children }: MapPlaceholderProps) {
  const colors = useColors();
  return (
    <View style={[styles.placeholder, { backgroundColor: colors.muted }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, minHeight: 250 },
});

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glass?: boolean;
  padded?: boolean;
}

export function Card({ children, style, glass = false, padded = true }: CardProps) {
  const colors = useColors();
  return (
    <View style={[
      styles.card,
      {
        backgroundColor: glass ? colors.glass : colors.card,
        borderRadius: colors.radius,
        borderColor: glass ? colors.glassBorder : colors.border,
        borderWidth: 1,
        padding: padded ? 16 : 0,
      },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});

import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface MapPlaceholderProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  onLocationUpdate?: (coord: { latitude: number; longitude: number }) => void;
  trackRoute?: boolean;
}

export function MapPlaceholder({ style, children }: MapPlaceholderProps) {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.muted }, style]}>
      <View style={styles.grid}>
        {Array.from({ length: 48 }).map((_, i) => (
          <View key={i} style={[styles.cell, { borderColor: colors.border }]} />
        ))}
      </View>
      <View style={[styles.pin, { backgroundColor: colors.accent }]} />
      <Text style={[styles.label, { color: colors.mutedForeground }]}>
        Map available on device
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 250, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  grid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '12.5%',
    height: 48,
    borderWidth: 0.5,
  },
  pin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 8,
  },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
});

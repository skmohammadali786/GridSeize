import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
}

export function ProgressBar({ progress, color, height = 8, showLabel = false, label, style }: ProgressBarProps) {
  const colors = useColors();
  const anim = useRef(new Animated.Value(0)).current;
  const clamp = Math.min(1, Math.max(0, progress));
  useEffect(() => {
    Animated.timing(anim, { toValue: clamp, duration: 600, useNativeDriver: false }).start();
  }, [clamp]);
  const barColor = color || colors.accent;
  return (
    <View style={style}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>}
          {showLabel && <Text style={[styles.pct, { color: colors.foreground }]}>{Math.round(clamp * 100)}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor: colors.muted, borderRadius: height / 2 }]}>
        <Animated.View
          style={[
            styles.fill,
            { height, backgroundColor: barColor, borderRadius: height / 2, width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
  fill: {},
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  pct: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
});

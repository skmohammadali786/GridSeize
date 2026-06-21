import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  change?: string;
  style?: ViewStyle;
}

export function StatCard({ label, value, unit, icon, color, change, style }: StatCardProps) {
  const colors = useColors();
  const iconColor = color || colors.accent;
  return (
    <Card style={[styles.card, style]}>
      {icon && (
        <View style={[styles.iconWrap, { backgroundColor: iconColor + '18' }]}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
      )}
      <Text style={[styles.value, { color: colors.foreground }]}>
        {value}<Text style={[styles.unit, { color: colors.mutedForeground }]}>{unit ? ` ${unit}` : ''}</Text>
      </Text>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
      {change && (
        <Text style={[styles.change, { color: change.startsWith('+') ? colors.success : colors.destructive }]}>
          {change}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { minWidth: 100 },
  iconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  value: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  unit: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  label: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  change: { fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
});

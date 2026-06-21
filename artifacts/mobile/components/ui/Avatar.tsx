import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface AvatarProps {
  name: string;
  size?: number;
  uri?: string;
  showBadge?: boolean;
  isOnline?: boolean;
  isPremium?: boolean;
}

export function Avatar({ name, size = 40, uri, showBadge, isOnline, isPremium }: AvatarProps) {
  const colors = useColors();
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const fontSize = size * 0.38;
  return (
    <View style={{ width: size, height: size }}>
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.accent + '22', borderColor: colors.accent + '44', borderWidth: 1.5 }]}>
          <Text style={[styles.initials, { fontSize, color: colors.accent }]}>{initials}</Text>
        </View>
      )}
      {isOnline && (
        <View style={[styles.onlineDot, { width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14, backgroundColor: colors.success, borderColor: colors.background, bottom: 0, right: 0 }]} />
      )}
      {isPremium && (
        <View style={[styles.premiumDot, { borderColor: colors.background }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontFamily: 'Inter_700Bold' },
  onlineDot: { position: 'absolute', borderWidth: 2 },
  premiumDot: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#F59E0B', borderWidth: 2 },
});

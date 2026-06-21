import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface MapPlaceholderProps { style?: ViewStyle; children?: React.ReactNode; }

export function MapPlaceholder({ style, children }: MapPlaceholderProps) {
  const colors = useColors();
  const [MapView, setMapView] = useState<any>(null);

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      import('react-native-maps').then(m => setMapView(() => m.default)).catch(() => {});
    }
  }, []);

  if (Platform.OS === 'web' || !MapView) {
    return (
      <View style={[styles.placeholder, { backgroundColor: colors.muted }, style]}>
        {children}
      </View>
    );
  }

  return (
    <MapView
      style={[styles.placeholder, style]}
      initialRegion={{ latitude: 37.7749, longitude: -122.4194, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
      showsUserLocation={true}
    >
      {children}
    </MapView>
  );
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, minHeight: 250 },
});

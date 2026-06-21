import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { useColors } from '@/hooks/useColors';

interface Coord { latitude: number; longitude: number; }

interface MapPlaceholderProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  onLocationUpdate?: (coord: Coord) => void;
  trackRoute?: boolean;
}

export function MapPlaceholder({ style, children, onLocationUpdate, trackRoute = true }: MapPlaceholderProps) {
  const colors = useColors();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Coord | null>(null);
  const [route, setRoute] = useState<Coord[]>([]);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }

      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!active) return;
      const coord = {
        latitude: initial.coords.latitude,
        longitude: initial.coords.longitude,
      };
      setLocation(coord);
      setRoute([coord]);
      onLocationUpdate?.(coord);

      mapRef.current?.animateToRegion({
        ...coord,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 800);

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 2000,
        },
        (pos) => {
          if (!active) return;
          const next: Coord = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(next);
          if (trackRoute) {
            setRoute(r => [...r, next]);
          }
          onLocationUpdate?.(next);
          mapRef.current?.animateCamera(
            { center: next },
            { duration: 500 },
          );
        },
      );
    })();

    return () => {
      active = false;
      watchRef.current?.remove();
    };
  }, []);

  if (permissionDenied) {
    return (
      <View style={[styles.fallback, { backgroundColor: colors.muted }, style]}>
        <Text style={[styles.fallbackText, { color: colors.mutedForeground }]}>
          Location access denied.{'\n'}Enable it in Settings to see the map.
        </Text>
        {children}
      </View>
    );
  }

  if (!location) {
    return (
      <View style={[styles.fallback, { backgroundColor: colors.muted }, style]}>
        <Text style={[styles.fallbackText, { color: colors.mutedForeground }]}>
          Getting your location…
        </Text>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={false}
        initialRegion={{
          ...location,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="standard"
      >
        {trackRoute && route.length > 1 && (
          <Polyline
            coordinates={route}
            strokeColor={colors.accent}
            strokeWidth={4}
          />
        )}
        {location && (
          <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.dot, { borderColor: colors.accent }]} />
          </Marker>
        )}
      </MapView>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 250 },
  fallback: { flex: 1, minHeight: 250, alignItems: 'center', justifyContent: 'center', padding: 24 },
  fallbackText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});

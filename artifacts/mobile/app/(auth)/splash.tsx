import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const colors = useColors();
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(800),
    ]).start(() => router.replace('/(auth)/welcome'));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View style={[styles.logoWrap, { opacity, transform: [{ scale }] }]}>
        <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
      </Animated.View>
      <Animated.View style={[styles.textWrap, { opacity: textOpacity }]}>
        <Text style={styles.brand}>GRIDSEIZE</Text>
        <Text style={styles.tagline}>Conquer Your City</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { width: 100, height: 100, borderRadius: 24, overflow: 'hidden', marginBottom: 24 },
  logo: { width: 100, height: 100 },
  textWrap: { alignItems: 'center' },
  brand: { fontSize: 32, fontFamily: 'Inter_700Bold', color: '#FFFFFF', letterSpacing: 6 },
  tagline: { fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)', marginTop: 8, letterSpacing: 2 },
});

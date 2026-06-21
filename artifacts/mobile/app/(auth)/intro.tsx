import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: 'grid-outline' as const,
    title: 'Capture Territories',
    desc: 'Walk, run, or cycle through any area to capture hexagonal territories. Build your empire one hex at a time.',
    color: '#22C55E',
  },
  {
    id: '2',
    icon: 'trophy-outline' as const,
    title: 'Battle & Compete',
    desc: 'Defend your territories from rivals, join team wars, and climb the global leaderboard.',
    color: '#F59E0B',
  },
  {
    id: '3',
    icon: 'analytics-outline' as const,
    title: 'AI-Powered Coach',
    desc: 'Get personalized training plans, route suggestions, and performance insights from your AI coach.',
    color: '#22C55E',
  },
];

export default function IntroScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const next = () => {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '22', borderColor: item.color + '44' }]}>
              <Ionicons name={item.icon} size={64} color={item.color} />
            </View>
            <Text style={[styles.title, { color: '#FFFFFF' }]}>{item.title}</Text>
            <Text style={[styles.desc, { color: 'rgba(255,255,255,0.7)' }]}>{item.desc}</Text>
          </View>
        )}
      />
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 32 }]}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === index ? '#22C55E' : 'rgba(255,255,255,0.3)', width: i === index ? 24 : 8 }]} />
          ))}
        </View>
        <Button title={index === SLIDES.length - 1 ? 'Get Started' : 'Next'} onPress={next} variant="success" size="lg" fullWidth />
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, paddingTop: 80, gap: 24 },
  iconCircle: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  title: { fontSize: 30, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  desc: { fontSize: 16, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 24 },
  bottom: { paddingHorizontal: 28, gap: 16 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 8 },
  dot: { height: 8, borderRadius: 4 },
  skip: { alignItems: 'center', paddingVertical: 8 },
  skipText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'Inter_500Medium' },
});

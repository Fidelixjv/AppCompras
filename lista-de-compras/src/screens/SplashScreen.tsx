import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { ShoppingBagIcon } from '../components/icons';
import { StatusBar } from 'expo-status-bar';

interface Props {
  onDone: () => void;
}

export function SplashScreen({ onDone }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 60, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 380, useNativeDriver: true }).start(onDone);
    }, 1250);
    return () => clearTimeout(timer);
  }, [opacity, scale, onDone]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <StatusBar style="light" />
      <Animated.View style={{ transform: [{ scale }] }}>
        <ShoppingBagIcon size={116} color={colors.lime} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-20, { duration: 1000 }),
            withTiming(0, { duration: 1000 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  const tips = [
    'Start small, think big! 🚀',
    'Listen to your users 👥',
    'Validate before building 🎯',
    'Marketing is key 📢',
    'Keep your costs low 💰',
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Text style={styles.logo}>🚀</Text>
      </Animated.View>
      <Text style={styles.title}>Indie Hacker Journey</Text>
      <Text style={styles.subtitle}>Loading your entrepreneurial adventure...</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Pro Tip:</Text>
        <Text style={styles.tip}>
          {tips[Math.floor(Math.random() * tips.length)]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 40,
    textAlign: 'center',
  },
  tipContainer: {
    position: 'absolute',
    bottom: 40,
    width: width - 40,
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  tip: {
    fontSize: 14,
    color: '#cccccc',
    fontStyle: 'italic',
  },
});

export default LoadingScreen;

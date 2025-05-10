import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';

interface AdongoProps {
  message: string;
  onNext?: () => void;
  position?: 'left' | 'right';
}

const Adongo: React.FC<AdongoProps> = ({ message, onNext, position = 'left' }) => {
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={[styles.container, position === 'right' && styles.containerRight]}>
      <Animated.View style={[styles.characterContainer, { transform: [{ translateY }] }]}>
        <Text style={styles.emoji}>👨🏾‍💻</Text>
        <Text style={styles.name}>Adongo</Text>
      </Animated.View>
      <Surface style={styles.messageBubble}>
        <Text style={styles.message}>{message}</Text>
        {onNext && (
          <Button
            mode="contained"
            onPress={onNext}
            style={styles.button}
          >
            Next
          </Button>
        )}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  containerRight: {
    flexDirection: 'row-reverse',
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageBubble: {
    flex: 1,
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-end',
  },
});

export default Adongo;

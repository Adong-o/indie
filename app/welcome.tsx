import WelcomeScreen from '../src/screens/WelcomeScreen';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <WelcomeScreen
      onComplete={() => {
        router.replace('/(tabs)/dashboard');
      }}
    />
  );
}

import { Redirect } from 'expo-router';
import useGameStore from '../src/store/gameStore';

export default function App() {
  const { initialized, loading, player } = useGameStore();

  if (loading) {
    return <Redirect href="/loading" />;
  }

  if (!player && initialized) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/(tabs)/dashboard" />;
}

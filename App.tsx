import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGameStore from './src/store/gameStore';
import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AdvertisingScreen from './src/screens/AdvertisingScreen';
import FinanceScreen from './src/screens/FinanceScreen';
import SkillsScreen from './src/screens/SkillsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#6200ee',
      tabBarInactiveTintColor: '#666666',
      headerStyle: {
        backgroundColor: '#1a1a1a',
      },
      headerTintColor: '#fff',
      tabBarStyle: {
        paddingBottom: 8,
        height: 60,
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="view-dashboard" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Marketing"
      component={AdvertisingScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bullhorn" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Finance"
      component={FinanceScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cash-multiple" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Skills"
      component={SkillsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="star" size={26} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

function MainContent() {
  const { initializeGame, initialized, loading, player } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!player && initialized) {
    return <WelcomeScreen onComplete={() => {}} />;
  }

  return <TabNavigator />;
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainContent />
      </NavigationContainer>
    </PaperProvider>
  );
}

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

function TabBarIcon({ name, color }: { 
  name: keyof typeof MaterialCommunityIcons.glyphMap; 
  color: string 
}) {
  return <MaterialCommunityIcons size={26} name={name} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
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
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="view-dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="marketing"
        options={{
          title: 'Marketing',
          tabBarIcon: ({ color }) => <TabBarIcon name="bullhorn" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <TabBarIcon name="cash-multiple" color={color} />,
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}

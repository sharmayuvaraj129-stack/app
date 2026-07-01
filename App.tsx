import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SubjectsScreen from './screens/SubjectsScreen';
import ToolsScreen from './screens/ToolsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  background: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  inactive: '#94A3B8',
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function SubjectsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Subjects" component={SubjectsScreen} />
    </Stack.Navigator>
  );
}

function ToolsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tools" component={ToolsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === 'HomeTab') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'ChatTab') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === 'SubjectsTab') {
                iconName = focused ? 'library' : 'library-outline';
              } else if (route.name === 'ToolsTab') {
                iconName = focused ? 'construct' : 'construct-outline';
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.inactive,
            tabBarStyle: {
              backgroundColor: COLORS.background,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              paddingTop: 8,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              height: Platform.OS === 'ios' ? 88 : 64,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600' as const,
            },
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{ title: 'Home' }}
          />
          <Tab.Screen
            name="ChatTab"
            component={ChatStack}
            options={{ title: 'Chat' }}
          />
          <Tab.Screen
            name="SubjectsTab"
            component={SubjectsStack}
            options={{ title: 'Subjects' }}
          />
          <Tab.Screen
            name="ToolsTab"
            component={ToolsStack}
            options={{ title: 'Tools' }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileStack}
            options={{ title: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

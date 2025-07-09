import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import LessonScreen from './src/screens/LessonScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import GameScreen from './src/screens/GameScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Lesson: { lessonId: number; lessonTitle: string };
  Practice: { pieceType?: string };
  Game: { difficulty: 'easy' | 'medium' | 'hard' };
  Profile: undefined;
};

// Navigation prop types for screens
type NavigationProps = {
  navigation: any;
  route: any;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen as any} />
          <Stack.Screen name="Home" component={HomeScreen as any} />
          <Stack.Screen name="Lesson" component={LessonScreen as any} />
          <Stack.Screen name="Practice" component={PracticeScreen as any} />
          <Stack.Screen name="Game" component={GameScreen as any} />
          <Stack.Screen name="Profile" component={ProfileScreen as any} />
        </Stack.Navigator>
        {Platform.OS !== 'web' && (
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 
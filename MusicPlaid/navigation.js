import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Profile from './screens/Profile'
import LoginScreen from './screens/Login'

const Stack = createNativeStackNavigator()
const screenOption = {
  headerShown: false,
}

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Profile" screenOptions={screenOption}>
      <Stack.Screen name="Profile" component={HomeScreen} />
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOption}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
)
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './AuthContext';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Feed from './screens/Feed';

const screenOption = {
  headerShown: false,
}

const Stack = createStackNavigator();

const App = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('User state in App', user);
    setLoading(false);

  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOption}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'MusicPlaid' }}/>
          <Stack.Screen name="Feed" component={Feed} options={{ title: 'Discovery' }}/>
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

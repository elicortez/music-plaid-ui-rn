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
        {console.log('stack User state in App', user === null)}
        {user === null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Feed" component={Feed} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

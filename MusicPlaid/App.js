import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Feed from './screens/Feed';
import PeopleList from './screens/PeopleListScreen';
import Music from './screens/Music';
import { Image, View, Text } from 'react-native';

const screenOption = {
  //headerShown: false,
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
}

const Stack = createStackNavigator();

const App = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    console.log('User state in App', user);
    setLoading(false);
    
    const userAgent = window.navigator.userAgent;
    setIsDesktop(/Mobi/.test(userAgent) === false);

  }, [user]);

  if (loading) {
    return null;
  }

  if (isDesktop) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <Image source={require('./assets/image1.png')} style={{ width: 300, height: 100 }} />
        <Text style={{ textAlign: 'center', fontSize: 24, color: 'white' }}>Connecting people through music.</Text>
        <View style={{ height: 10 }} /> {/* Add an extra line with 10 units of height */}
        <Text style={{ textAlign: 'center', fontSize: 14, color: 'white' }}>Check our app in your mobile device.</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOption}>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="Feed" component={Feed} options={{ title: 'Discovery' }} />
        <Stack.Screen name="PeopleList" component={PeopleList} options={{ title: 'People' }} />
        <Stack.Screen name="Music" component={Music} options={{ title: 'Song' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

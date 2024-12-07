import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';  // Import SplashScreen
import LoginScreen from './screens/LoginScreen';  // Import LoginScreen
import RegistrationScreen from './screens/RegistrationScreen';  // Import RegistrationScreen
import HomeScreen from './screens/HomeScreen';  // Import HomeScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen as initial route */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        
        {/* Registration Screen */}
        <Stack.Screen 
          name="Register" 
          component={RegistrationScreen} 
          options={{ title: 'Register' }} 
        />
        
        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

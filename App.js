import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CountProvider } from './context/CountContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import BookingScreen from './screens/BookingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CountProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0bded3', 
            },
            headerTintColor: '#FFFFFF', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        >
          {/* Splash Screen */}
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />

          {/* Login Screen */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }} 
          />

          {/* Registration Screen */}
          <Stack.Screen 
            name="Register" 
            component={RegistrationScreen} 
            options={{ headerShown: false }} 
          />

          {/* Home Screen */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Home' }} 
          />

          {/* Cart Screen */}
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{ title: 'Cart' }} 
          />

          {/* Booking Screen */}
          <Stack.Screen 
            name="Booking" 
            component={BookingScreen} 
            options={{ title: 'Booking' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CountProvider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Redirect to the Login screen after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');  // Navigates to Login screen
    }, 2000);  // 2-second delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TranspoApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;

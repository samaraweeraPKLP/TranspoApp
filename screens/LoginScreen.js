import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity ,Image} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    // Here, you would normally check credentials against a backend API
    // For now, we're just passing the username to the Home screen
    navigation.navigate('Home', { username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Travel App or Website Logo.png')}  // Adjust the path to your logo
          style={styles.logo}
        />
      </View>
      
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

<TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Vertically center content
    padding: 20,
    backgroundColor: '#0bded3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginBottom: '25%',
  },
  logoContainer: {
    alignItems: 'center',  // Horizontally center the logo
    marginBottom: 30,  // Space between logo and inputs
  },
  logo: {
    width: 250,  // Set the width of the logo
    height: 250, // Set the height of the logo
  },
  input: {
    fontSize: 15,
    backgroundColor:'#F5F5F5',
    borderWidth: 2,
    borderColor: '#999797',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6b6c6e',  // Set your preferred button color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#F5F5F5',  // Text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

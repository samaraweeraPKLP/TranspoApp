import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPasswordShowPassword] = useState(false);


  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Travel App or Website Logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.title}>Password</Text>
      <View style={styles.passwordContainer}>
      
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword} // Conditionally hide password
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#999797" />
              </TouchableOpacity>
            </View>
      <Text style={styles.title}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
      
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword} // Conditionally hide password
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setConfirmPasswordShowPassword(!showConfirmPassword)} // Toggle password visibility
              >
                <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#999797" />
              </TouchableOpacity>
            </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0bded3',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    fontSize: 15,
    width:'100%',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#999797',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top:10
  },
  button: {
    backgroundColor: '#6b6c6e',
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
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },

  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,

  },
});

export default RegistrationScreen;

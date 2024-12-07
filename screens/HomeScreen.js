import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params || {};  // Retrieve the username passed from the Login Screen
  const [items, setItems] = useState([]);  // List of transportation items
  const [clickCount, setClickCount] = useState(0);  // Count of clicked items

  // Simulate fetching transportation data (you can replace this with an actual API call)
  useEffect(() => {
    const mockItems = [
      { id: '1', title: 'Bus Route A', description: 'Route from City A to City B', status: 'Available' },
      { id: '2', title: 'Train Route B', description: 'Route from City X to City Y', status: 'Delayed' },
      { id: '3', title: 'Bus Route C', description: 'Route from City C to City D', status: 'Available' },
      { id: '4', title: 'Train Route D', description: 'Route from City Y to City Z', status: 'Not Operational' },
    ];
    setItems(mockItems);
  }, []);

  // Handle item click to increase count
  const handleItemClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>

      {/* List of transportation items */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={[styles.status, item.status === 'Available' ? styles.available : styles.unavailable]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating action button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => alert(`You clicked ${clickCount} items.`)}>
        <Text style={styles.floatingText}>{clickCount}</Text>
      </TouchableOpacity>

      {/* Button to go back to Login Screen */}
      <Button title="Log Out" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  available: {
    color: 'green',
  },
  unavailable: {
    color: 'red',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

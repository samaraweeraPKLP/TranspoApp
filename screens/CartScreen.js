import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { selectedBuses, setSelectedBuses } = route.params;
  const [cartBuses, setCartBuses] = useState(selectedBuses);

  const handleRemoveBus = (busToRemove) => {
    const updatedBuses = cartBuses.filter(bus => bus.id !== busToRemove.id);
    setCartBuses(updatedBuses);
    setSelectedBuses(updatedBuses);

    if (updatedBuses.length < selectedBuses.length) {
      navigation.goBack();
    }
  };


  const handleBookBus = (bus) => {
    navigation.navigate('Booking', { bus });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={cartBuses}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.busName}</Text>
              <Text>{item.route}</Text>
              <Text>Available Seats: {item.availableSeats}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveBus(item)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookBus(item)}
                >
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 10, backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#999797',
    marginBottom: 10,
    borderRadius: 8
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  removeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'red',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },
  removeButtonText: { color: 'red', fontSize: 15, fontWeight: 'bold' },
  bookButton: {
    backgroundColor: '#0bded3',
    borderWidth: 2,
    borderColor: '#6b6c6e',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },
  bookButtonText: { color: '#6b6c6e', fontSize: 15, fontWeight: 'bold' },
});

export default CartScreen;

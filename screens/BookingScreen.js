import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const BookingScreen = ({ route, navigation }) => {
  const { bus } = route.params;
  const [passengerName, setPassengerName] = useState('');
  const [selectedSeats, setSelectedSeats] = useState('');
  const [error, setError] = useState('');

  const calculateTotalCost = () => {
    return selectedSeats * bus.price;
  };

  const handleBooking = () => {
    if (passengerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }

    const totalCost = calculateTotalCost();
    alert(`Booking successful!\n${passengerName} has booked ${selectedSeats} seat(s)\nTotal cost: Rs.${totalCost}`);
    navigation.goBack();
  };

  const handleSeatChange = (text) => {
    const seatCount = parseInt(text, 10);
    if (isNaN(seatCount) || seatCount < 1) {
      setSelectedSeats(1);
      setError('Please enter a valid number of seats.');
    } else if (seatCount > bus.availableSeats) {
      setSelectedSeats(bus.availableSeats);
      setError(`You can only select up to ${bus.availableSeats} seats.`);
    } else {
      setError('');
      setSelectedSeats(seatCount);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Booking Details</Text>

        <Text style={styles.busDetail}>Bus Name: {bus.busName}</Text>
        <Text style={styles.busDetail}>Route: {bus.route}</Text>
        <Text style={styles.busDetail}>Available Seats: {bus.availableSeats}</Text>
        <Text style={styles.busDetail}>Price per Seat: Rs.{bus.price}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={passengerName}
          onChangeText={setPassengerName}
        />

        <View style={styles.seatSelection}>
          <Text style={styles.busDetail}>Select Seats: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter seats count"
            keyboardType="numeric"
            value={String(selectedSeats)}
            onChangeText={handleSeatChange}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.totalCost}>Total Cost: Rs.{calculateTotalCost()}</Text>

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  busDetail: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#999797',
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  seatSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
  },
  totalCost: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c2c2c',
  }
});

export default BookingScreen;
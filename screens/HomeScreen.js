import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { username = 'Guest' } = route.params || {}; // Provide default 'Guest' if no username is passed
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/c/0fb8-3555-45e6-9a57') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setBuses(data);
        setFilteredBuses(data);  // Initially, show all buses
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Toggle bus selection for cart
  const handleItemClick = (bus) => {
    setSelectedBuses((prevSelectedBuses) => {
      const isBusSelected = prevSelectedBuses.some(item => item.id === bus.id);
      if (isBusSelected) {
        return prevSelectedBuses.filter(item => item.id !== bus.id);
      } else {
        return [...prevSelectedBuses, bus];
      }
    });
  };

  // Filter buses based on location and destination
  const handleFilter = () => {
    if (currentLocation && destination) {
      const filtered = buses.filter(bus =>
        bus.route.toLowerCase().includes(currentLocation.toLowerCase()) &&
        bus.route.toLowerCase().includes(destination.toLowerCase())
      );
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses(buses);  // If no filter, show all buses
    }
  };

  // Navigate to Cart screen with selected buses
  const handleCartPress = () => {
    navigation.navigate('Cart', { selectedBuses, setSelectedBuses }); // Pass selectedBuses and setSelectedBuses
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>

      {/* Location and Destination Inputs */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Current Location"
          value={currentLocation}
          onChangeText={setCurrentLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <View style={styles.buttonContainer}>
          <Button style={styles.buttons} title="Filter Buses" onPress={handleFilter} />
          <Button style={styles.buttons} title="View Cart" onPress={handleCartPress} />
        </View>
      </View>

      {/* Display filtered bus list */}
      <FlatList
        data={filteredBuses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleItemClick(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.busName}</Text>
              <Text>{item.route}</Text>
              <Text>Available Seats: {item.availableSeats}</Text>
              <Text>{item.description}</Text>
              <Text
  style={[
    styles.selectionStatus,
    { color: selectedBuses.some(bus => bus.id === item.id) ? 'green' : 'blue' }
  ]}
>
  {selectedBuses.some(bus => bus.id === item.id) ? 'Selected' : 'Not Selected'}
</Text>

            </View>
          </TouchableOpacity>
        )}
      />

      {/* Selected buses count display */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleCartPress}>
        <Text style={styles.floatingButtonText}>{selectedBuses.length}</Text>
        <Text style={styles.floatingButtonLabel}>Selected</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  filterContainer: { marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 8, borderRadius: 4 },
  card: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#fff', padding: 10, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4 },
  image: { width: 80, height: 80, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  selectionStatus: { fontSize: 12, color: 'gray', marginTop: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  buttons: {
    width: '25%', // Adjusted width for larger button size
    height: 50, // Adjusted height for larger button size
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingHorizontal: 10, // Adjust padding to make button look more spacious
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff3b30',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatingButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  floatingButtonLabel: { color: '#fff', fontSize: 12 }
});

export default HomeScreen;

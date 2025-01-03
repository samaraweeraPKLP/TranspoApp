import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { username = 'Guest' } = route.params || {};
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/c/c2eb-9da4-4128-90a9')
      .then(response => response.json())
      .then(data => {
        setBuses(data);
        setFilteredBuses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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

  const handleFilter = () => {
    if (currentLocation && destination) {
      const filtered = buses.filter(bus =>
        bus.route.toLowerCase().includes(currentLocation.toLowerCase()) &&
        bus.route.toLowerCase().includes(destination.toLowerCase())
      );
      setFilteredBuses(filtered);
    } else {
      setFilteredBuses(buses);
    }
  };

  const handleCartPress = () => {
    navigation.navigate('Cart', { selectedBuses, setSelectedBuses });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome, <Text style={styles.username}>{username}</Text>
        </Text>

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
            <TouchableOpacity style={styles.customButton} onPress={handleFilter}>
              <Text style={styles.buttonText}>Filter Buses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={handleCartPress}>
              <Text style={styles.buttonText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        <TouchableOpacity style={styles.floatingButton} onPress={handleCartPress}>
          <Text style={styles.floatingButtonText}>{selectedBuses.length}</Text>
          <Text style={styles.floatingButtonLabel}>Selected</Text>
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  username: { color: '#00bcbf', fontWeight: 'bold' },
  filterContainer: { marginBottom: 20 },
  input: {
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#999797',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  customButton: {
    backgroundColor: '#6b6c6e',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#999797',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: 80, height: 80, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  selectionStatus: { fontSize: 13, marginTop: 5, fontWeight: 'bold' },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00bcbf',
    borderWidth: 2,
    borderColor: '#6b6c6e',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  floatingButtonLabel: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

export default HomeScreen;

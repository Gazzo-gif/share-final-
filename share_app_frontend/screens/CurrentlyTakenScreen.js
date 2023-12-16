import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';

const CurrentlyTakenScreen = () => {   // screen showing items that are currently being borrowed from the user
  const lentItems = useAuthStore(state => state.lentItems);
  const getLentItems = useAuthStore(state => state.getLentItems);

  useEffect(() => {
    fetchCurrentlyTakenItems();
  }, []);

  const fetchCurrentlyTakenItems = async () => {
    try {
      getLentItems();
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.item.photos[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item.itemName}</Text>
        <Text style={styles.itemDescription}>{item.item.itemDescription}</Text>
        <Text style={styles.itemPrice}>{item.item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lentItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default CurrentlyTakenScreen;

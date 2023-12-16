import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';
import { getBorrowedItems } from "../axios/borrow-service.axios";

const CurrentlyBorrowingScreen = () => {   // screen showing items that user is currently borrowing 
  const navigation = useNavigation();
  const getBorrowedItems = useAuthStore(state => state.getBorrowedItems);
  const borrowedItems = useAuthStore(state => state.borrowedItems);
  useEffect(() => {
    // Fetch borrowed items when the component mounts
    fetchBorrowedItems();
  }, []);

  const fetchBorrowedItems = async () => {
    try {
      await getBorrowedItems();
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('ReturnItemsScreen', {
          id: item.id,
          itemName: item.item.itemName,
          itemDescription: item.item.itemDescription,
          itemPrice: item.item.price,
          photos: item.item.photos
        });
      }}
    >
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
        data={borrowedItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
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

export default CurrentlyBorrowingScreen;

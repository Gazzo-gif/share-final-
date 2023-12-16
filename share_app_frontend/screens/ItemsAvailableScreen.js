import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';

const ItemsAvailableScreen = () => { // screen that shows all the items available for user to borrow from other users
  const navigation = useNavigation();
  const availableItems = useAuthStore(state => state.availableItems);
  const getAvailableItems = useAuthStore(state => state.getAvailableItems);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      getAvailableItems();
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // Navigate to ItemDetailsScreen with item details as parameters
        navigation.navigate('ItemDetailsScreen', {
          itemId: item.id,
          itemName: item.itemName,
          itemDescription: item.itemDescription,
          itemPrice: item.price,
          photos: item.photos
        });
      }}
    >
      <Image source={{ uri: item.photos[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemDescription}>{item.itemDescription}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={availableItems}
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

export default ItemsAvailableScreen;

import React from 'react';
import { Alert, Image } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';

const ReturnItemsScreen = ({ route, navigation }) => {
  // Extract item details from the route parameters
  const { id, itemName, itemDescription, itemPrice, photos } = route.params || {};
  const updateRequestedItems = useAuthStore(state => state.updateRequestedItems);

  // Function to handle returning the item
  const handleReturnItem = async () => {
    try {
      console.log(id)
      await updateRequestedItems(id, "Returned")
      Alert.alert(`Item ${itemName} returned`);
    } catch (error) {
      console.log(error)
      Alert.alert("something went wrong try again later")
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photos[0] }} style={styles.image} />
      <Text style={styles.title}>Item Details</Text>
      <Text style={styles.detail}>{itemName}</Text>
      <Text style={styles.detail}>{itemDescription}</Text>
      <Text style={styles.detail}>{itemPrice}</Text>
      <Button title="Return Item" onPress={handleReturnItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default ReturnItemsScreen;

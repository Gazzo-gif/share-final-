import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EditItemScreen = ({ route, navigation }) => {
  const [editedItem, setEditedItem] = useState({
    // Initialize the state with the existing item details
    name: 'Initial Name', // Replace with the actual property names of your item
    description: 'Initial Description',
    price: 'Initial Price',
  });

  const handleSaveChanges = async () => {
    try {
      const apiUrl = `https://api.example.com/items/${itemId}`;
      const response = await fetch(apiUrl, {
        method: 'PUT', // Assuming your API supports updating items via a PUT request
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(editedItem), // Convert the editedItem object to JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      // If the update is successful, you might want to fetch the updated item details
      // and update the local state in AvailableScreen
      fetchAvailableItems(); // Assuming fetchAvailableItems updates the local state
  
      // Navigate back to the AvailableScreen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving changes:', error.message);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={editedItem.name}
        onChangeText={(text) => setEditedItem({ ...editedItem, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={editedItem.description}
        onChangeText={(text) => setEditedItem({ ...editedItem, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={editedItem.price}
        onChangeText={(text) => setEditedItem({ ...editedItem, price: text })}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditItemScreen;

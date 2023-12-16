import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import useAuthStore from '../zustand/auth.slice';

const AddAnItemToListScreen = () => {
  const navigation = useNavigation();

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const addItem = useAuthStore(state => state.addItem)

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  function getFileExtension(fileUri) {
    // Extract the path from the URI
    const path = decodeURI(fileUri);

    // Use regex to match the file extension
    const match = /\.[0-9a-z]+$/i.exec(path);

    // If a match is found, return the file extension (excluding the dot)
    return match ? match[0].slice(1) : null;
}


  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      const extension = getFileExtension(selected.uri);

      const file = {
        name: "selectedFile." + extension,
        uri: selected.uri,
        type: "image/" + extension
      }
      setSelectedImage(file);
    }
  };

  const handleAddItem = async () => {
    try {
      // Validation logic (you may want to add more comprehensive validation)
      if (!itemName || !itemDescription || !itemPrice) {
        Alert.alert('Validation Error', 'Please enter all item details');
        return;
      }

      // Check if an image is selected
      // if (!selectedImage) {
      //   Alert.alert('Image Error', 'Please choose an item image');
      //   return;
      // }

      await addItem(itemName, itemDescription, itemPrice, selectedImage);
    } catch (error) {
      console.error('Error:', error); // Handle network errors
      Alert.alert('Network Error', 'An error occurred while communicating with the server');
    }
  };

  const createFormData = (body) => {
    const data = new FormData();

    Object.keys(body).forEach((key) => {
      if (key === 'image') {
        // Append the image data with a name
        data.append(key, {
          uri: body[key].uri,
          type: body[key].type,
          name: body[key].fileName,
        });
      } else {
        data.append(key, body[key]);
      }
    });

    return data;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add An Item To Your Listings For Others To Borrow</Text>
      <TouchableOpacity onPress={handleChooseImage}>
        <Text>Choose Item Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: -200,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default AddAnItemToListScreen;

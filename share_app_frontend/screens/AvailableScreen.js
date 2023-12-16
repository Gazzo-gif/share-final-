import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuthStore from '../zustand/auth.slice';


const AvailableScreen = () => {

  const navigation = useNavigation();
  const myAvailableItems = useAuthStore(state => state.myAvailableItems);
  const getMyAvailableItems = useAuthStore(state => state.getMyAvailableItems);
  const deleteItem = useAuthStore(state => state.deleteMyAvailableItem)

  useEffect(() => {
    getMyAvailableItems();
  },[])
 
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.photos[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.itemDescription}>{item.itemDescription}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => deleteItem(item.id) },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={myAvailableItems}
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
    marginTop: 10
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

export default AvailableScreen;










/* import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AvailableScreen = () => {  // screen showing items user has listed that are currently available 
  const [availableItems, setAvailableItems] = useState([]);

  const itemsData3 = [        // list of items available for user to borrow 
  {
    id: '1',
    name: 'Item 1',
    description: 'Description for Item 1',
    imageUrl: 'https://example.com/item1.jpg',
    price: '$10.99',
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Description for Item 2',
    imageUrl: 'https://example.com/item2.jpg',
    price: '$8.99',
  },
  {
    id: '3',
    name: 'Item 3',
    description: 'Description for Item 1',
    imageUrl: 'https://example.com/item1.jpg',
    price: '$10.99',
  },
  // Add more items as needed
];

 // useEffect(() => {
 //   fetchAvailableItems();
 // }, []);

 /* const fetchAvailableItems = async () => {
    try {
      
      const userId = 'your_user_id'; // replace 'your_user_id' 
      const apiUrl = `https://api.example.com/users/${userId}/available-items`; // API endpoint GET to retrieve items user has listed that are currently available

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
    
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available items');
      }

      const data = await response.json();
      setAvailableItems(data.items);
    } catch (error) {
      console.error('Error fetching available items:', error.message);
    
    }
  };

  const deleteItem = async (itemId) => {
    try {
      // Assuming there is an API endpoint for deleting an item
      const apiUrl = `https://api.example.com/items/${itemId}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          // Add any headers if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Remove the deleted item from the local state
      setAvailableItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error.message);
      Alert.alert('Error', 'Failed to delete item. Please try again.');
    }
  };   */
  

  /* const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditItemScreen', { itemId: item.id });
        }}
        style={styles.editIcon}
      >
        <Icon name="edit" size={20} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => deleteItem(item.id) },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={availableItems}
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

export default AvailableScreen;  */










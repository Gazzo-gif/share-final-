import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';

// Function to generate notification data
const generateNotificationData = (id, name, itemName, type) => ({
  id,
  name,
  itemName,
  type,
});

// Sample data for notifications
const notificationsData = [
 // generateNotificationData('2', 'Jane Smith', 'Laptop', 'borrow_request'),
 // generateNotificationData('3', 'Alice Johnson', 'Camera', 'item_returned'),
  // Add more notifications as needed
];

const NotificationsScreen = () => {
  const requestedItems = useAuthStore(state => state.requestedItems);
  const setNotify = useAuthStore(state => state.setNotify);
  const updateRequestedItems = useAuthStore(state => state.updateRequestedItems);
  useEffect(() => {
    setNotify(false);
  }, [])


  // Placeholder for handling the "Accept" action for borrow requests
  const handleAcceptBorrowRequest = async (requestId, itemName) => {
    try{
    await updateRequestedItems(requestId, "Active")
    Alert.alert(`Accepted borrow request for item ${itemName}`);
    }catch(error) {
      console.log(error)
      Alert.alert("something went wrong try again later")
    }
  };

  // Placeholder for handling the "Decline" action for borrow requests
  const handleDeclineBorrowRequest = async (requestId, itemName) => {
    try{
      await updateRequestedItems(requestId, "Rejected")
      Alert.alert(`Declined borrow request for for item ${itemName}`);
    }catch(error) {
      console.log(error)
      Alert.alert("something went wrong try again later")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notifications</Text>
      <FlatList
        data={requestedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            {true ? (
              <Text>{`You have a borrow request for your ${item.item.itemName}`}</Text>
            ) : (
              <Text>{`Was your ${item.item.itemName} returned in proper condition?`}</Text>
            )}
            <View style={styles.buttonContainer}>
              {true ? (
                <>
                  <TouchableOpacity onPress={() => handleAcceptBorrowRequest(item.id, item.item.itemName)} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeclineBorrowRequest(item.id, item.item.itemName)} style={styles.declineButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={() => handleAcceptReturnRequest(item.id)} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>    Yes    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeclineReturnRequest(item.id)} style={styles.declineButton}>
                    <Text style={styles.buttonText}>    No    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    opacity: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;

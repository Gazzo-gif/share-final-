import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  useAuthStore  from '../zustand/auth.slice'

const ItemDetailsScreen = ({ route, navigation }) => {
  const { itemId, itemName, itemDescription, itemPrice, photos } = route.params || {};
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showBorrowDatePicker, setShowBorrowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const addBorrowedItem = useAuthStore(state => state.addBorrowedItem);
  const hasPaymentMethod = useAuthStore(state => state.hasPaymentMethod);

  const handleBorrowItem = async () => {
    if (!hasPaymentMethod) {
      navigation.navigate('FirstTimePaymentScreen');
    } else {
        await addBorrowedItem(itemId, borrowDate, returnDate);
    }
  };

  const handleBorrowDateChange = (event, date) => {
    setShowBorrowDatePicker(false);
    if (date && date >= new Date()) {
      setBorrowDate(date);
    }
  };

  const handleReturnDateChange = (event, date) => {
    setShowReturnDatePicker(false);
    if (date && date >= borrowDate && date >= new Date()) {
      setReturnDate(date);
    } else {
      Alert.alert('Invalid Return Date', 'Please select a date after the Borrow Date and not in the past.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details</Text>
      <Text style={styles.detail}>{itemName}</Text>
      <Text style={styles.detail}>{itemDescription}</Text>
      <Text style={styles.detail}>{itemPrice}</Text>
      <Image source={{ uri: photos[0] }} style={styles.image} />

      <TouchableOpacity onPress={() => setShowBorrowDatePicker(true)}>
        <Text style={styles.datePickerText}>Select Borrow Date</Text>
      </TouchableOpacity>

      {showBorrowDatePicker && (
        <DateTimePicker
          value={borrowDate}
          mode="date"
          display="default"
          onChange={handleBorrowDateChange}
          minimumDate={new Date()}
        />
      )}

      <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
        <Text style={styles.datePickerText}>Select Return Date</Text>
      </TouchableOpacity>

      {showReturnDatePicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={handleReturnDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.detail}>Selected Borrow Date: {borrowDate.toDateString()}</Text>
      <Text style={styles.detail}>Selected Return Date: {returnDate.toDateString()}</Text>

      <Button title="Borrow Item" onPress={handleBorrowItem} />
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
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  datePickerText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 8,
    textAlign: 'center',
  },
  datePicker: {
    width: 200,
    alignSelf: 'center',
  },
});

export default ItemDetailsScreen;

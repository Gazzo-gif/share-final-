import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import  useAuthStore  from '../zustand/auth.slice'


const FirstTimePaymentScreen = ({ navigation }) => {   // screen that allows user to enter their payment method for the first time 
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const addPaymentMethod = useAuthStore(state => state.addPaymentMethod);

  const handleChangePaymentMethod = async () => {
    try {
      // Validate payment information
      if (!creditCardNumber || !expirationDate || !cvv) {
        Alert.alert('Validation Error', 'Please enter all payment details');
        return;
      }
      await addPaymentMethod(creditCardNumber, expirationDate, cvv)
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error); // Handle network errors
      Alert.alert('Network Error', 'An error occurred while communicating with the server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Payment Method</Text>
      <TextInput
        style={styles.input}
        placeholder="Credit Card Number"
        keyboardType="numeric"
        value={creditCardNumber}
        onChangeText={setCreditCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration Date (MM/YY)"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={setCVV}
      />
      <Button title="Enter Payment Method" onPress={handleChangePaymentMethod} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
});

export default FirstTimePaymentScreen;

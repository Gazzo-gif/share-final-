import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { changePaymentMethod } from '../axios/payment-service.axios';
import useAuthStore from '../zustand/auth.slice';

const ChangePaymentMethodScreen = ({ navigation }) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const shareAppJWT = useAuthStore(state => state.shareAppJWT);

  const handleChangePaymentMethod = async() => {
    try {
      
      await changePaymentMethod(shareAppJWT, creditCardNumber, expirationDate, cvv)
      Alert.alert('Success', 'Payment information updated successfully');

    } catch (error) {
      console.error('Error updating payment information:', error.message);
      Alert.alert('Error', 'Failed to update payment information. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Payment Method</Text>
      <TextInput
        style={styles.input}
        placeholder="New Credit Card Number"
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
      <Button title="Update Payment Method" onPress={handleChangePaymentMethod} />
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

export default ChangePaymentMethodScreen;

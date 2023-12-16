import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {resetPassword} from "../axios/user-service.axios";

const ForgotPasswordScreen = ({ navigation }) => {  // screen to send one time password if user forgot their password
  const [email, setEmail] = useState('');
  const [showOneTimePassword, setShowOneTimePassword] = useState(false);
  const [oneTimePassword, setOneTimePassword] = useState('');

  const handleSendOneTimePassword = async () => {
    try {

      if (!email) {
        Alert.alert('Validation Error', 'Please enter your email');
        return;
      }

      await resetPassword(email);
      Alert.alert("A one time password is sent to your email!")
      navigation.navigate('LoginScreen')
    } catch (error) {
      console.error('Error:', error); // Handle network errors
      Alert.alert('Network Error', 'An error occurred while communicating with the server');
    }
  };

  const handleVerifyOneTimePassword = async () => {
    try {
      // Validation logic (you may want to add more comprehensive validation)
      if (!oneTimePassword) {
        Alert.alert('Validation Error', 'Please enter the one-time password');
        return;
      }

      const response = await fetch('https://your-backend-api.com/verify-one-time-password', { // API endpoint POST request to verify one-time password
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oneTimePassword }),
      });

      if (response.ok) {
        // Correct one-time password
        // Navigate to the 'TabScreen'
        navigation.navigate('TabScreen');
      } else {
        // Handle other status codes or errors
        console.error('Error:', response.status);
        Alert.alert('Verification Error', 'Incorrect one-time password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error); // Handle network errors
      Alert.alert('Network Error', 'An error occurred while communicating with the server');
    }
  };

  

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Enter Your Email To Receive A One-Time Password</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Send One-Time Password" onPress={handleSendOneTimePassword} />

      {showOneTimePassword && (
        <View style={stylesLogin.centeredView}>
          <TextInput
            style={stylesLogin.input}
            placeholder="One-Time Password"
            value={oneTimePassword}
            onChangeText={setOneTimePassword}
            secureTextEntry
          />
          <Button title="Verify One-Time Password" onPress={handleVerifyOneTimePassword} />
        </View>
      )}
    </View>
  );
};

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
  centeredView: {
    alignItems: 'center', 
  },
});

export default ForgotPasswordScreen;


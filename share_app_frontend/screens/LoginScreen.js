import { default as React, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import useAuthStore from '../zustand/auth.slice';

const LoginScreen = ({ navigation }) => {
  // login screen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useAuthStore(state => state.logIn);

  const handleForgotPassword = async () => {
    navigation.navigate('ForgotPasswordScreen');
      }

  const handleLogin = async () => {
    try {
      // Perform form validation
      if (!email || !password) {
        // Handle form validation error, e.g., show an alert
        alert('Please enter both email and password.');
        return;
      }

      await logIn(email, password, () => {
        navigation.navigate('TabScreen');
      });

    } catch (error) {
      // console.error('An unexpected error occurred:', error);
      // alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    navigation.navigate('GoogleSignUp')
  }

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Login To Your Account On SHARE!</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <TextInput
        style={stylesLogin.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Login.' onPress={handleLogin} />

      <Button title='Login with google' onPress={handleGoogleLogin} />
      <Button title='forgot password' onPress={handleForgotPassword} />
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
});

export default LoginScreen;

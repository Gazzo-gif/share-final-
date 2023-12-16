// GoogleSignUpScreen.js
//import auth from '@react-native-firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const GoogleSignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

  const handleGoogleSignUp = async () => {
    try {
      // Configure Google Sign-In
      await GoogleSignin.configure();

      // Trigger Google Sign-In
      const { idToken } = await GoogleSignin.signIn();

      // Authenticate with Firebase using the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential); 

      // Navigate to another screen after signing up
      navigation.navigate('Home'); // Replace 'Home' with the screen you want to navigate to
    } catch (error) {
      console.error('Google Sign Up Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/googleimage.png')} style={styles.logo} />
      <Text style={styles.title}>Have A Google Account?</Text>
      
      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      
      
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Sign Up With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  googleButton: {
    width: 192,
    height: 48,
    marginTop: 20,
  },
  signupText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 20,
  },
});

export default GoogleSignUpScreen;

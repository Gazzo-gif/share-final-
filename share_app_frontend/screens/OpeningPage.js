import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OpeningPage = ({ navigation }) => {
  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Insert the path to your app's logo
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToSignUp}>
        <Text style={styles.buttonText}>Sign Up With SHARE!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Login To Your SHARE Account Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 330,
    height: 150,
    marginBottom: 150,
  },
  button: {
    width: 270,
    backgroundColor: '#FF69B4', // Button background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Adjust the border radius to control the curve of the edges
    marginVertical: 25,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OpeningPage;

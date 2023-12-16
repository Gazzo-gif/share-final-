import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const SignOutScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {

    navigation.navigate('OpeningPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to sign out?</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: -190
  },
});

export default SignOutScreen;

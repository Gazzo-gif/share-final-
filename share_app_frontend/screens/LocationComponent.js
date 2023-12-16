import Geolocation from '@react-native-community/geolocation';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const LocationComponent = () => {
  useEffect(() => {
    // Request permission (iOS only)
    Geolocation.requestAuthorization();

    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
      },
      error => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View>
      <Text>Location Component</Text>
    </View>
  );
};

export default LocationComponent;

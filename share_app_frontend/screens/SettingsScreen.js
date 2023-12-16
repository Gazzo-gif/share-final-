// SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';


const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const navigateToPersonalDetailsChange = () => {
    navigation.navigate('ChangePersonalDetailsScreen');
  };
  const navigateToPasswordChange = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const navigateToChangePayment = () => {
    navigation.navigate('ChangePaymentMethodScreen');
  };
  const navigateSignOut = () => {
    navigation.navigate('SignOutScreen');
  };


  return (
    <View style={styles.container}>
    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={navigateToPersonalDetailsChange}>
        <Text style={styles.optionTitle}>Change Personal Details</Text>
      </TouchableOpacity>
      {/* Add functionality for changing personal details */}
    </View>
  

    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={navigateToPasswordChange}>
        <Text style={styles.optionTitle}>Change Password</Text>
      </TouchableOpacity>
      {/* Add functionality for changing personal details */}
    </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#EDEDED', true: '#00CC00' }}
          thumbColor={notificationsEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notificationsEnabled}
        />
      </View>

      <View style={styles.optionContainer}>
      <TouchableOpacity onPress={navigateToChangePayment}>
        <Text style={styles.optionTitle}>Change Payment Method</Text>
      </TouchableOpacity>
      {/* Add functionality for changing personal details */}
    </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>About</Text>
        {/* Add information about the app */}
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Help</Text>
        {/* Add FAQs and contact information */}
      </View>

      <View style={styles.optionContainer}>
      <TouchableOpacity onPress={navigateSignOut}>
        <Text style={styles.optionTitle}>Sign Out</Text>
      </TouchableOpacity>
      {/* Add functionality for changing personal details */}
    </View>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  optionTitle: {
    fontSize: 16,
  },
});

export default SettingsScreen;



// for settings: change personal details => password, etc, disable or enable notifications (slide bar) , change payment method, about and help (description of app and FAQs, questions can be sent to dummy)
// for address on sign up, should allow user to select address either basecamp leipzig or other
// on login page forgot password, takes you to a page that asks for email 
// icon on home page to 
// change color for search bar (white)  dont worry about this now 
// page for item listings that generates item added to page ,, think lieferando
// plus sign on each page 
// when a user requests to borrow an item 
// on header, add SHARE logo and on rightside, plus icon to add and settings icon next to it 


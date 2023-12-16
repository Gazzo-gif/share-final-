import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'babel-polyfill'; // import for API endpoints 
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import AddAnItemToListScreen from './screens/AddAnItemToListScreen';
import AvailableScreen from './screens/AvailableScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ChangePaymentMethodScreen from './screens/ChangePaymentMethodScreen';
import ChangePersonalDetailsScreen from './screens/ChangePersonalDetailsScreen';
import CurrentlyBorrowingScreen from './screens/CurrentlyBorrowingScreen';
import CurrentlyTakenScreen from './screens/CurrentlyTakenScreen';
import EditItemScreen from './screens/EditItemScreen';
import FirstTimePaymentScreen from './screens/FirstTimePaymentScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import GoogleSignUp from './screens/GoogleSignUp';
import GoogleSignUpScreen from './screens/GoogleSignUpScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import ItemsAvailableScreen from './screens/ItemsAvailableScreen';
import ItemsListScreen from './screens/ItemsListScreen';
import LoginScreen from './screens/LoginScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import OpeningPage from './screens/OpeningPage';
import ReturnItemsScreen from './screens/ReturnItemsScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignOutScreen from './screens/SignOutScreen';
import SignUpScreen from './screens/SignUpScreen';
import useAuthStore from './zustand/auth.slice';
import constants from './constants';
import { w3cwebsocket as WebSocket } from "websocket";
import AboutScreen from './screens/AboutScreen';


if (__DEV__) {
  import("./reactotron/reactotronConfig").then(() => console.log("reactotron configured"))
}

const HomeTabs = createMaterialTopTabNavigator();

const MyTopTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();



const TabScreen = () => {

  return (

    <Tab.Navigator   // to navigate between the tabs on the tabscreen 
      screenOptions={{
        headerTitle: '',
        headerStyle: { height: 0, backgroundColor: 'lightblue', },
        tabBarStyle: { backgroundColor: 'ccc2ff' }, // set the background color for the tab bar
        tabBarActiveTintColor: 'white', // set the text color for the active tab
        tabBarInactiveTintColor: 'gray', // set the text color for inactive tabs
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerTitle: '',
        headerStyle: { height: 0 }, // set header height to 0 
      }} />
      <Tab.Screen name="MyFeed" component={MyFeedScreen} options={{
        headerTitle: '',
        headerStyle: { height: 0 }, // set header height to 0
      }} />
    </Tab.Navigator>

  );
};



const HomeScreen = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const searchItem = useAuthStore(state => state.searchItem);
  const getAvailableItems = useAuthStore(state => state.getAvailableItems);

  useEffect(() => {
    let delayDebounceFn;
    if (searchQuery) {
      delayDebounceFn = setTimeout(() => {
        searchItem(searchQuery)
      }, 1500); // Adjust the delay as needed
    }
    else if (searchQuery == '') {
      getAvailableItems()
    }
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Search..."     // search bar on homescreen 
        containerStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: 'white', height: 35 }}
        inputStyle={{ color: 'black' }}
        onChangeText={handleSearch}
        value={searchQuery}
      />

      <HomeTabs.Navigator>
        <HomeTabs.Screen name="All Items" component={ItemsAvailableScreen} />
        <HomeTabs.Screen name="Currently Borrowing" component={CurrentlyBorrowingScreen} />
      </HomeTabs.Navigator>
    </View>
  );
};


const ItemRequestScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text></Text>
  </View>
);

const YourRequestsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text></Text>
  </View>
);


const MyFeedScreen = () => {

  const MyTopTab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1 }}>

      <NavigationContainer independent={true}>
        <MyTopTab.Navigator>
          <MyTopTab.Screen name="My Items" component={AvailableScreen} />
          <MyTopTab.Screen name="Currently Taken" component={CurrentlyTakenScreen} />
        </MyTopTab.Navigator>
      </NavigationContainer>
    </View>
  );
};


const manageNotif = (msg) => {
  const getRequestedItems = useAuthStore(state => state.getRequestedItems);
  msg = JSON.parse(msg)
  console.log("msg", msg)
  if (msg.notification.startsWith("New Borrowing Request")) {
    console.log("here")
    getRequestedItems();
  }
}



const App = () => {
  const name = useAuthStore(state => state.name);
  const notify = useAuthStore(state => state.notify);

  useEffect(() => {
    const ws = new WebSocket(constants.NOTIFICATION_SERVICE_URL)
    // Initialize WebSocket connection
    ws.onopen = () => {
      console.log("notification service connected")
    };

    ws.onmessage = e => {
      console.log(e.data);
      manageNotif(e.data);
    };

    ws.onerror = e => {
      console.log("error")
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log("connection closed", e.code, e.reason);
    };

  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpeningPage">
        <Stack.Screen name="OpeningPage" component={OpeningPage} options={{ title: 'Opening Page', headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up', headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, headerTitle: '', headerBackTitle: null, headerLeft: null }} />
        <Stack.Screen name="ItemsListScreen" component={ItemsListScreen} options={{ headerShown: false, headerTitle: '', headerBackTitle: null, headerLeft: null }} />
        <Stack.Screen name="AddAnItemToListScreen" component={AddAnItemToListScreen} options={{ title: 'Add Item To Lend' }} />
        <Stack.Screen name="ItemsAvailableScreen" component={ItemsAvailableScreen} />
        <Stack.Screen name="CurrentlyBorrowingScreen" component={CurrentlyBorrowingScreen} />
        <Stack.Screen name="AvailableScreen" component={AvailableScreen} />
        <Stack.Screen name="CurrentlyTakenScreen" component={CurrentlyTakenScreen} />
        <Stack.Screen name="GoogleSignUp" component={GoogleSignUp} options={{ headerShown: false, headerTitle: '', headerBackTitle: null, headerLeft: null }} />
        <Stack.Screen name="TabScreen" component={TabScreen} options={({ navigation }) => ({
          headerTitle: '', headerStyle: { backgroundColor: 'ccc2ff' }, headerLeft: null, flexDirection: 'row', headerRight: () => (
            <View style={{ width: 200, height: 90, marginRight: 10, marginTop: 15 }}>
              <View style={{ marginBottom: 2, marginLeft: -159 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom:-25, fontSize: 16 }}>{`Welcome ${name}`}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddAnItemToListScreen')}>
                  <View style={{ paddingRight: 100 }}>
                    <Icon name='add' type='ionicon' size={30} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
                  <View style={{ paddingRight: 10 }}>
                    <FontAwesome name="bell" size={30} color={notify ? "red" : "black"} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                  <View style={{ paddingRight: 10 }}>
                    <Icon name='settings' type='ionicon' size={30} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ),

        })}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerTitle: "Settings" }} />
        <Stack.Screen name="ChangePersonalDetailsScreen" component={ChangePersonalDetailsScreen} options={{ title: 'Edit Details' }} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
        <Stack.Screen name="ChangePaymentMethodScreen" component={ChangePaymentMethodScreen} options={{ title: 'Change Payment Method' }} />
        <Stack.Screen name="SignOutScreen" component={SignOutScreen} options={{ title: 'Sign Out' }} />
        <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{ title: 'Borrow Item?' }} />
        <Stack.Screen name="ReturnItemsScreen" component={ReturnItemsScreen} options={{ title: 'Return Item?' }} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: 'Notifications' }} />
        <Stack.Screen name="FirstTimePaymentScreen" component={FirstTimePaymentScreen} options={{ title: 'Enter Payment Method' }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Forgot Password?' }} />
        <Stack.Screen name="GoogleSignUpScreen" component={GoogleSignUpScreen} options={{ title: 'Sign Up With Google' }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



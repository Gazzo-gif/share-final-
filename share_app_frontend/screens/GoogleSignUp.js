import { useEffect } from 'react';
import { Linking, StyleSheet } from 'react-native';

const GoogleSignUp = ({ navigation }) => {

   useEffect(() =>{
    Linking.openURL("http://192.168.86.35:3000/user-service/auth/google")
   }, [])
}

const styles = StyleSheet.create({
    container: {
        height: 1000,
        width:450
    }
})

export default GoogleSignUp;
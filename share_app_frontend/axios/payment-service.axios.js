import axios from 'axios';
import constants from '../constants';
import { Alert } from 'react-native';

const addPaymentMethod = async (jwt, cardNumber, expirationDate, cvv, cardHolderName) => {
    const data = {
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
        cardHolderName: cardHolderName
    }
        const config = {
            url: constants.PAYMENT_SERVICE_URL + "/paymentMethod",
            method: "POST",
            headers: {
                'x-auth-token': jwt
            },
            data: data
        }
        const response = await axios(config);
        Alert.alert(`Successfully created payment card`);
        return response.data;
}

const changePaymentMethod = async (jwt, cardNumber, expirationDate, cvv) => {
    const data = Object.assign({},
        cardNumber && {cardNumber},
        expirationDate && {expirationDate},
        cvv && {cvv}
    )

    try {
        const config = {
            url: constants.PAYMENT_SERVICE_URL + "/paymentMethod",
            method: "PATCH",
            headers: {
                'x-auth-token': jwt
            },
            data: data
        }
        const response = await axios(config);
        Alert.alert(`Successfully changed payment card`);
        return response.data;
    } catch (error) {
        const response = error.response;
        if(response.status == "409") {
            console.log("Payment Method is already present for this user");
            Alert.alert("Payment Method is already present for this user");
            throw error
        }
        else {
            Alert.alert("Oops something went wrong try again later");
        }
    }
}



module.exports = {
    addPaymentMethod,
    changePaymentMethod
}
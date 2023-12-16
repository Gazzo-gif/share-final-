import axios from 'axios';
import constants from '../constants';
import { Alert } from 'react-native';

const getItems = async (jwt) => {
    try {
        const config = {
            url: constants.ITEMS_SERVICE_URL,
            method: "GET",
            headers: {
                'x-auth-token': jwt
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        const response = error.response;
        if (response.status == "404") {
            console.log("No items currently available");
            alert("No items currently available");
            return [];
        }
    }
}

const getMyAvailableItems = async (jwt) => {
    try {
        const config = {
            url: constants.ITEMS_SERVICE_URL + "/me",
            method: "GET",
            headers: {
                'x-auth-token': jwt
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        const response = error.response;
        if (response.status == "404") {
            console.log("No items currently available");
            alert("No items currently available");
            return [];
        }
    }
}

const addItem = async (jwt, itemName, itemDescription, price, photos) => {
    console.log("photos", photos)
    const data = new FormData();
    data.append("itemName", itemName);
    data.append("itemDescription", itemDescription);
    data.append("price", price);
    data.append("photos", photos);
    try {
        const config = {
            url: constants.ITEMS_SERVICE_URL,
            method: "POST",
            data: data,
            headers: {
                'x-auth-token': jwt,
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios(config);
        Alert.alert(`Successfully added new item`);
        return response.data;
    } catch (error) {
        const response = error.response;
        if (response.status == "409") {
            console.log("Item already exists");
            alert("Item already exists");
        }
        else {
            console.log("Oops, something went wrong, try again later");
            alert("Oops, something went wrong, try again later");
        }
        return [];
    }
}


const searchItem = async (jwt, keyword) => {
    params = Object.assign({},
        keyword && { keyword }
    )
    const config = {
        url: constants.ITEMS_SERVICE_URL + "/search",
        method: "GET",
        headers: {
            'x-auth-token': jwt
        },
        params
    }
    const response = await axios(config);
    return response.data;

}

const deleteItem = async (jwt, itemId) => {
    const config = {
        url: constants.ITEMS_SERVICE_URL + "/" + itemId,
        method: "DELETE",
        headers: {
            'x-auth-token': jwt
        },
    }
    const response = await axios(config);
    return response.data;
}


module.exports = {
    getItems,
    addItem,
    getMyAvailableItems,
    searchItem,
    deleteItem
}
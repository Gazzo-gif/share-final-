import { create } from 'zustand';
import { logIn, getUser, patchUser } from '../axios/user-service.axios';
import { getItems, getMyAvailableItems, addItem, searchItem, deleteItem } from '../axios/item-service.axios';
import { getBorrowedItems, getLentItems, addBorrowedItem, updateBorrowRequest } from '../axios/borrow-service.axios';
import { addPaymentMethod, changePaymentMethod } from '../axios/payment-service.axios';
import { Alert } from 'react-native';

const useAuthStore = create((set, get) => ({
    shareAppJWT: "",
    name: "",
    hasPaymentMethod: false,
    borrowedItems: [],
    availableItems: [],
    lentItems: [],
    myAvailableItems: [],
    requestedItems: [],
    notify: false,
    logIn: async (email, password, onSuccess) => {
        try {
            const response = await logIn(email, password);
            if (response.status = "200") {
                set(state => ({
                    ...state,
                    shareAppJWT: response.headers["x-auth-token"]
                }))
                get().getUser();
                get().getRequestedItems();
                onSuccess && onSuccess();
            }
        } catch (error) {
            const response = error.response
            if (response.status == "401") {
                console.error(response.data.error);
                alert(response.data.error);
            }
        }
    },
    getUser: async () => {
        try {
            const response = await getUser(get().shareAppJWT);
            if (response.status = "200") {
                set(state => ({
                    ...state,
                    name: response.data.name,
                    hasPaymentMethod: response.data.isPaymentMethodPresent
                }))
                onSuccess && onSuccess();
            }
        } catch (error) {
            const response = error.response
            console.error(response.data.error);
            alert(response.data.error);
        }
    },
    getBorrowedItems: async () => {
        try {
            const response = await getBorrowedItems(get().shareAppJWT);
            set(state => ({
                ...state,
                borrowedItems: response.filter(elm => elm.status =="Active")
            }))
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    addBorrowedItem: async (itemId, borrowDate, returnDate) => {
        try {
            await addBorrowedItem(get().shareAppJWT, itemId, borrowDate, returnDate);
            Alert.alert('Borrow Success', `Successfully borrowed ${itemId}`);
            get().getBorrowedItems();
            get().getAvailableItems();
            get().getLentItems();
            get().getMyAvailableItems();
        } catch (error) {
            const response = error.response;
            if (response.status == "409") {
                alert("Borrow Request for this item is already open for this user");
            }
            else {
                console.log("Oops, something went wrong, try again later");
                alert("Oops, something went wrong, try again later");
            }
        }
    },
    getAvailableItems: async () => {
        try {
            const response = await getItems(get().shareAppJWT);
            set(state => ({
                ...state,
                availableItems: response
            }))
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    getMyAvailableItems: async () => {
        try {
            const response = await getMyAvailableItems(get().shareAppJWT);
            set(state => ({
                ...state,
                myAvailableItems: response
            }))
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    deleteMyAvailableItem: async (email) => {
        try {
            const response = await deleteItem(get().shareAppJWT, email);
            Alert.alert('Item Deleted Successfully');
            get().getBorrowedItems();
            get().getAvailableItems();
            get().getLentItems();
            get().getMyAvailableItems();
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    getLentItems: async () => {
        try {
            const response = await getLentItems(get().shareAppJWT);
            set(state => ({
                ...state,
                lentItems: response.filter(elm => elm.status =="Active")
            }))
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    addPaymentMethod: async (creditCardNumber, expirationDate, cvv) => {
        try {
            await addPaymentMethod(get().shareAppJWT, creditCardNumber, expirationDate, cvv, get().name)
            set(state => ({
                ...state,
                hasPaymentMethod: true
            }))
        } catch (error) {
            const response = error.response;
            if (response.status == "409") {
                console.log("Payment Method is already present for this user");
                Alert.alert("Payment Method is already present for this user");
            }
            else {
                Alert.alert("Oops something went wrong try again later");
            }
        }

    },

    changePaymentMethod: async (creditCardNumber, expirationDate, cvv, onSuccess) => {
        try {
            await changePaymentMethod(get().shareAppJWT, creditCardNumber, expirationDate, cvv)
            set(state => ({
                ...state,
                hasPaymentMethod: true
            }))
        } catch (error) {
            const response = error.response;
            if (response.status == "409") {
                console.log("Payment Method is already present for this user");
                Alert.alert("Payment Method is already present for this user");
            }
            else {
                Alert.alert("Oops something went wrong try again later");
            }
        }

    },
    addItem: async (itemName, itemDescription, itemPrice, selectedImage) => {

        await addItem(get().shareAppJWT, itemName, itemDescription, itemPrice, selectedImage);
        get().getAvailableItems();

    },
    patchUser: async (name, email) => {
        try {
            response = await patchUser(get().shareAppJWT, name, email);
            set(state => ({
                ...state,
                name: response.data.user.name
            }))
        }
        catch (error) {
            Alert.alert("Oops something went wrong try again later");
        }
    },
    searchItem : async (keyword) => {
        try {
            response = await searchItem(get().shareAppJWT, keyword);
            set(state => ({
                ...state,
                availableItems: response
            }))
        }
        catch (error) {
            set(state => ({
                ...state,
                availableItems: []
            }))
        }
    },
    getRequestedItems: async () => {
        try {
            const response = await getLentItems(get().shareAppJWT);
            set(state => ({
                ...state,
                requestedItems: response.filter(elm => elm.status =="Request Sent"),
            }))

            if(get().requestedItems.length > 0) {
                get().setNotify(true);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    },
    updateRequestedItems: async (requestId, status) => {
            const response = await updateBorrowRequest(get().shareAppJWT, requestId, status);
            get().getLentItems();
            get().getRequestedItems();
            get().getBorrowedItems();
            get().setNotify(false)
    },
    setNotify: async (notify) => {
        try {
            set(state => ({
                ...state,
                notify: notify
            }))
        } catch (error) {
            console.error('something went wrong:', error);
        }
    },
}))

export default useAuthStore;
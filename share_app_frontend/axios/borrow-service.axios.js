import axios from 'axios';
import constants from '../constants';

const getBorrowedItems = async (jwt) => {
    try {
        const config = {
            url: constants.BORROW_SERVICE_URL + "/borrowed",
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
            return [];
        }
    }
}

const getLentItems = async (jwt) => {
    try {
        const config = {
            url: constants.BORROW_SERVICE_URL + "/lent",
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
            return [];
        }
    }
}

const addBorrowedItem = async (jwt, itemId, startDate, endDate) => {
    const data = {
        itemId, startDate, endDate
    }
        const config = {
            url: constants.BORROW_SERVICE_URL,
            method: "POST",
            data: data,
            headers: {
                'x-auth-token': jwt
            }
        }
        const response = await axios(config);
        return response.data;
}

const updateBorrowRequest = async (jwt, requestId, status) => {
    const data = {
        status
    }
        const config = {
            url: constants.BORROW_SERVICE_URL + "/" + requestId,
            method: "PATCH",
            data: data,
            headers: {
                'x-auth-token': jwt
            }
        }
        const response = await axios(config);
        return response.data;
}


module.exports = {
    getBorrowedItems,
    addBorrowedItem,
    getLentItems,
    updateBorrowRequest
}
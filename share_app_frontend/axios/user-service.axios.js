import axios from 'axios';
import constants from '../constants';

const signUp = async (name, email, password, birthday, latitude, longitude) => {
    console.log("here",longitude, latitude)
    const data = {
        name,
        email,
        password,
        dob: birthday,
        latitude: latitude,
        longitude: longitude,
    };

    const config = {
        url: constants.USER_SERVICE_URL + "/user",
        method: "POST",
        data: data
      }
  
    return await axios(config)
}

const logIn = async (email, password) => {
    const data = {
        email,
        password
    };

    const config = {
        url: constants.USER_SERVICE_URL + "/auth",
        method: "POST",
        data: data
      }
  
    return await axios(config)
}

const patchUser = async (jwt, name, email) => {
    const data = Object.assign({},
        name && {name},
        email && {email}
    );

    const config = {
        url: constants.USER_SERVICE_URL + "/user",
        method: "PATCH",
        data: data,
        headers : {
            "x-auth-token": jwt
        }
    }

    return await axios(config)
}

const getUser = async (jwt) => {
    const config = {
        url: constants.USER_SERVICE_URL + "/user",
        method: "GET",
        headers : {
            "x-auth-token": jwt
        }
    }

    return await axios(config)
}

const changePassword = async (jwt, currentPassword, newPassword) => {
    const data = {
        currentPassword,
        newPassword
    };

    const config = {
        url: constants.USER_SERVICE_URL + "/auth/changePassword",
        method: "POST",
        data: data,
        headers : {
            "x-auth-token": jwt
        }
    }

    return await axios(config)
}

const resetPassword = async ( email) => {
    const data = {
        email
    };

    const config = {
        url: constants.USER_SERVICE_URL + "/auth/resetPassword",
        method: "POST",
        data: data,
    }

    return await axios(config)
}

module.exports = {
    signUp,
    logIn,
    patchUser,
    changePassword,
    getUser,
    resetPassword
}
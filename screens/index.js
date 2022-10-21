import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Home/Home';
export { Login, Register, Home };

export const client = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'X-Custom-Header': 'foobar',
    },
});

console.log('in here', BASE_URL);

// Add a request interceptor
client.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        var accessToken = await AsyncStorage.getItem('accessToken');
        if (basicAuth && basicAuth != null) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
client.interceptors.response.use(
    function (response) {
        if (response.data) return response.data;
        else {
            var message = 'We had trouble connecting to the server';
            if (response.data.message) message = response.data.message;
            return Promise.reject(response);
        }
    },
    function (error) {
        return Promise.reject(error);
    }
);

import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from './axios';

export const login = async (loginBody) => {
    const response = await client.post(`${BASE_URL}/users/login`, loginBody);
    if (response?.success) {
        AsyncStorage.setItem('accessToken', response.token);
    }
    return {
        success: response?.success,
        message: response?.message,
    };
};

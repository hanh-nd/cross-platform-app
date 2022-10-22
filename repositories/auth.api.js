import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoginUser } from '../redux/features/app/appSlice';
import { store } from '../redux/store';
import { client } from './axios';

export const login = async (loginBody) => {
    const response = await client.post(`${BASE_URL}/users/login`, loginBody);
    if (response?.success) {
        store.dispatch(setLoginUser(response?.data || {}));
        await AsyncStorage.setItem('accessToken', response.token);
        await AsyncStorage.setItem('loginUserId', response.data.id);
    } else {
        throw new Error(response?.message || '');
    }
};

export const register = async (registerBody) => {
    const response = await client.post(
        `${BASE_URL}/users/register`,
        registerBody
    );
    if (response?.success) {
        store.dispatch(setLoginUser(response?.data || {}));
        await AsyncStorage.setItem('accessToken', response.token);
        await AsyncStorage.setItem('loginUserId', response.data.id);
    } else {
        throw new Error(response?.message || '');
    }
};

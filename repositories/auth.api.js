import { BASE_URL } from '@env';
import { setLoginUser } from '../redux/features/app/appSlice';
import { store } from '../redux/store';
import { client, setAccessToken } from './axios';

export const login = async (loginBody) => {
    const response = await client.post(`${BASE_URL}/users/login`, loginBody);
    if (response?.success) {
        store.dispatch(setLoginUser(response?.data || {}));
        await setAccessToken(response.token);
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
        await setAccessToken(response.token);
    } else {
        throw new Error(response?.message || '');
    }
};

export const logout = async () => {
    store.dispatch(setLoginUser({}));
    await setAccessToken('');
}
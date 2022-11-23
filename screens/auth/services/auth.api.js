import { BASE_URL } from '@env';
import { client } from '../../../plugins/axios/axios';

export const login = async (loginBody) => {
    return await client.post(`${BASE_URL}/users/login`, loginBody);
};

export const register = async (registerBody) => {
    return await client.post(`${BASE_URL}/users/register`, registerBody);
};

export const logout = () => {
    return true;
};

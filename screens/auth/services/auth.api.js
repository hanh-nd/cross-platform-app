import { env } from '../../../constants';
import { client } from '../../../plugins/axios/axios';

export const login = async (loginBody) => {
    return await client.post(`${env.BASE_URL}/users/login`, loginBody);
};

export const register = async (registerBody) => {
    return await client.post(`${env.BASE_URL}/users/register`, registerBody);
};

export const logout = () => {
    return true;
};

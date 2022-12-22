import { env } from '@/constants';
import { client } from 'plugins/axios/axios';

export const login = async (loginBody) => {
    return await client.post(`${env.BASE_URL}/users/login`, loginBody);
};

export const register = async (registerBody) => {
    return await client.post(`${env.BASE_URL}/users/register`, registerBody);
};

export const logout = () => {
    return true;
};

export const getSelfProfile = async () => {
    return await client.get(`${env.BASE_URL}/users/show`);
};

export const editSelfProfile = async (editBody) => {
    return await client.post(`${env.BASE_URL}/users/edit`, editBody);
};

export const activateAccount = async (activateAccountBody) => {
    return await client.post(
        `${env.BASE_URL}/users/activate-account`,
        activateAccountBody,
    );
};

import { env } from '../../../constants';
import { client } from '../../../plugins/axios/axios';

export const getPosts = async () => {
    return await client.get(`${env.BASE_URL}/posts/list`);
};

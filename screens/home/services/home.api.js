import { env } from '../../../constants';
import { client } from '../../../plugins/axios/axios';

export const getPosts = async () => {
    return await client.get(`${env.BASE_URL}/posts/list`);
};

export const createPost = async (post) => {
    return await client.post(`${env.BASE_URL}/posts/create`, post);
};

export const actionLikePost = async (postId) => {
    return await client.post(`${env.BASE_URL}/postLike/action/${postId}`);
};

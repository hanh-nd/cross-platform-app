import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    described: yup.required().string().trim().max(500),
});

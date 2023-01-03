import * as yup from 'yup';

export const commentSchema = yup.object().shape({
    comment: yup.required().string().max(500),
});

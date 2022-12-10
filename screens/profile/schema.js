import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
    phonenumber: yup.string().min(10).required(),
    username: yup.string().min(4).required(),
});
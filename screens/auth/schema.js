import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phonenumber: yup.string().required(),
    password: yup
        .string()
        .min(8)
        .required()
        .not([yup.ref('phonenumber')]),
});

export const registerSchema = yup.object().shape({
    phonenumber: yup.string().required(),
    username: yup.string().required(),
    password: yup
        .string()
        .min(8)
        .required()
        .not([yup.ref('phonenumber')]),
});

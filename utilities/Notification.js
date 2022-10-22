import Toast from 'react-native-toast-message';

export const showSuccessMessage = (message = '') => {
    Toast.show({
        type: 'success',
        text1: 'Thanh cong',
        text2: message,
    });
};

export const showErrorMessage = (message = '') => {
    Toast.show({
        type: 'error',
        text1: 'Loi',
        text2: message,
    });
};

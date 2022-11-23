import Toast from 'react-native-toast-message';

export const showSuccessMessage = (title = 'Thành công', message = '') => {
    Toast.show({
        type: 'success',
        text1: title,
        text2: message,
    });
};

export const showErrorMessage = (title = 'Lỗi', message = '') => {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message,
    });
};

import { Button, Image, Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DismissKeyboardView } from '../../components';
import { colors } from '../../constants';
import { PageName } from '../../navigation/constants';
import { handleRegister, setIsLoggedIn } from './reducers/auth.reducer';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';
import validator from 'validator';
import { isValidPassword } from '../../utilities/Validations';
import { useDispatch } from 'react-redux';

function Register(props) {
    // redux
    const dispatch = useDispatch();
    const setLoginState = (state) => {
        dispatch(setIsLoggedIn(state));
    };
    //states for validating
    const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState();
    const [errorMessagePassword, setErrorMessagePassword] = useState();
    //states to store email/password
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isValidationOK = () =>
        validator.isMobilePhone(phoneNumber || '') &&
        isValidPassword(password || '') === true;
    const [loading, setLoading] = useState(false);

    const onRegister = async () => {
        if (!phoneNumber) {
            setErrorMessagePhoneNumber('Vui lòng nhập số điện thoại của bạn!');
            return;
        }
        if (!password) {
            setErrorMessagePassword('Vui lòng nhập mật khẩu!');
            return;
        }

        setLoading(true);

        try {
            await dispatch(
                handleRegister({
                    phonenumber: phoneNumber,
                    username,
                    password,
                })
            );
            showSuccessMessage('Đăng ký thành công');
            navigate({
                name: PageName.HOME,
            });
            setLoginState(true);
        } catch (error) {
            showErrorMessage(error?.message);
        }

        setLoading(false);
    };
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    useEffect(() => {
        if (phoneNumber) {
            if (!validator.isMobilePhone(phoneNumber)) {
                setErrorMessagePhoneNumber('Số điện thoại không hợp lệ');
            } else {
                setErrorMessagePhoneNumber();
            }
        } else {
            setErrorMessagePhoneNumber();
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (password) {
            if (!isValidPassword(password)) {
                setErrorMessagePassword('Mật khẩu phải tối thiểu 8 ký tự');
            } else {
                setErrorMessagePassword();
            }
        } else {
            setErrorMessagePassword();
        }
    }, [password]);

    return (
        <>
            <DismissKeyboardView style={styles.layout}>
                <View style={styles.registerForm}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        containerStyle={styles.logoContainer}
                    />
                    <Input
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        onChangeText={(phoneNumber) =>
                            setPhoneNumber(phoneNumber)
                        }
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                        errorMessage={
                            errorMessagePassword ? (
                                <View style={styles.errorLayout}>
                                    <Icon
                                        name="warning"
                                        color="#FFFF00"
                                        size={15}
                                    />
                                    <Text style={styles.error}>
                                        &nbsp;{errorMessagePassword}
                                    </Text>
                                </View>
                            ) : null
                        }
                    ></Input>
                    <Input
                        label="Tên tài khoản"
                        placeholder="Nhập tên tài khoản"
                        onChangeText={(username) => setUsername(username)}
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                    ></Input>
                    <Input
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                        errorMessage={
                            errorMessagePassword ? (
                                <View style={styles.errorLayout}>
                                    <Icon
                                        name="warning"
                                        color="#FFFF00"
                                        size={15}
                                    />
                                    <Text style={styles.error}>
                                        &nbsp;{errorMessagePassword}
                                    </Text>
                                </View>
                            ) : null
                        }
                    ></Input>
                    <Button
                        title="Đăng ký"
                        type="solid"
                        loading={loading}
                        onPress={onRegister}
                        buttonStyle={styles.button}
                        disabled={!isValidationOK()}
                    ></Button>
                </View>
                <View>
                    <Text
                        style={styles.text}
                        onPress={() => navigate({ name: PageName.LOGIN })}
                    >
                        Đã có tài khoản? Đăng nhập
                    </Text>
                </View>
            </DismissKeyboardView>
        </>
    );
}

const styles = {
    layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
        height: '100%',
        backgroundColor: colors.facebook,
    },
    registerForm: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        color: colors.white,
    },
    logoContainer: {
        margin: 50,
        alignSelf: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: colors.grayBlue,
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    input: {
        color: colors.white,
    },
    label: {
        fontSize: 18,
        color: colors.white,
    },
    error: {
        color: '#FFFF00',
        fontWeight: '550',
    },
    errorLayout: {
        alignItems: 'center',
        flexDirection: 'row',
    },
};

export default Register;

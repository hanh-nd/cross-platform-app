import { Button, Image, Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { DismissKeyboardView } from '../../components';
import { colors } from '../../constants';
import { PageName } from '../../navigation/constants';
import { setIsLoggedIn } from '../../redux/features/app/appSlice';
import { login } from '../../repositories/auth.api';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';
import { isValidPassword } from '../../utilities/Validations';

function Login(props) {
    // redux
    const dispatch = useDispatch();
    const setLoginState = (state) => {
        dispatch(setIsLoggedIn(state));
    };
    //states for validating
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    //states to store email/password
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const isValidationOK = () =>
        phoneNumber.length > 0 &&
        password.length > 0 &&
        isValidPassword(password) === true;
    const [loading, setLoading] = useState(false);

    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const onLogin = async () => {
        setLoading(true);

        try {
            await login({
                phonenumber: phoneNumber,
                password,
            });
            showSuccessMessage('Đăng nhập thành công');
            navigate({
                name: PageName.BOTTOM_NAVIGATION,
            });
            setLoginState(true);
        } catch (error) {
            showErrorMessage(error?.message);
        }

        setLoading(false);
    };

    return (
        <>
            <DismissKeyboardView style={styles.layout}>
                <View style={styles.loginForm}>
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
                    />
                    <Input
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                    />
                    <Button
                        title="Đăng nhập"
                        type="solid"
                        onPress={onLogin}
                        loading={loading}
                        buttonStyle={styles.button}
                    ></Button>
                </View>
                <View>
                    <Text
                        style={styles.text}
                        onPress={() => navigate({ name: PageName.REGISTER })}
                    >
                        Chưa có tài khoản? Đăng ký
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
    loginForm: {
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
};

export default Login;

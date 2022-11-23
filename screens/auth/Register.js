import { Button, Image, Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DismissKeyboardView } from '../../components';
import { colors } from '../../constants';
import { PageName } from '../../navigation/constants';
import { handleRegister } from './reducers/auth.reducer';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';
import { useDispatch } from 'react-redux';

function Register(props) {
    // redux
    const dispatch = useDispatch();

    //states for validating
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    //states to store email/password
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onRegister = async () => {
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
        } catch (error) {
            showErrorMessage(error?.message);
        }

        setLoading(false);
    };
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

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
                    ></Input>
                    <Button
                        title="Đăng ký"
                        type="solid"
                        loading={loading}
                        onPress={onRegister}
                        buttonStyle={styles.button}
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
};

export default Register;

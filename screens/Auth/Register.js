import { Button, Image, Input, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DismissKeyboardView } from '../../components';
import { colors } from '../../constants';
import { PageName } from '../../navigation/constants';
import { register } from '../../repositories/auth.api';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../utilities/Notification';

function Register(props) {
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
            await register({
                phonenumber: phoneNumber,
                username,
                password,
            });
            showSuccessMessage('Dang ky thanh cong');
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
                        label="So dien thoai"
                        placeholder="Nhap so dien thoai"
                        keyboardType="numeric"
                        onChangeText={(phoneNumber) =>
                            setPhoneNumber(phoneNumber)
                        }
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        input={styles.input}
                    ></Input>
                    <Input
                        label="Ten tai khoan"
                        placeholder="Nhap ten tai khoan"
                        onChangeText={(username) => setUsername(username)}
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        input={styles.input}
                    ></Input>
                    <Input
                        label="Mat khau"
                        placeholder="Nhap mat khau"
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                        placeholderTextColor={colors.gray}
                        labelStyle={styles.label}
                        input={styles.input}
                    ></Input>
                    <Button
                        title="Dang ky"
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
                        Da co tai khoan? Dang nhap
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

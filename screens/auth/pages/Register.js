import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { setAccessToken } from '../../../plugins/axios/axios';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import {
    handleRegister,
    selectIsLoading,
    setIsLoggedIn,
} from '../reducers/auth.reducer';
import { Formik } from 'formik';
import { registerSchema } from '../schema';

function Register(props) {
    // redux
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    const initialValues = {
        phonenumber: '',
        username: '',
        password: '',
    };

    const register = async ({ phonenumber, username, password }) => {
        const response = await dispatch(
            handleRegister({
                phonenumber,
                username,
                password,
            })
        ).unwrap();

        if (response?.success) {
            showSuccessMessage('Đăng ký thành công');
            setIsLoggedIn(true);
            setAccessToken(response.token);
            navigate({
                name: PageName.TAB_NAVIGATOR,
            });
            return;
        }

        showErrorMessage('Đăng ký thất bại', response?.message);
    };

    return (
        <>
            <DismissKeyboardView style={styles.layout}>
                <View style={styles.registerForm}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                        containerStyle={styles.logoContainer}
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={(values) => register(values)}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            isValid,
                        }) => (
                            <>
                                <Input
                                    name="phonenumber"
                                    label="Số điện thoại"
                                    value={values.phonenumber}
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('phonenumber')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.phonenumber}
                                ></Input>
                                <Input
                                    name="username"
                                    label="Tên tài khoản"
                                    value={values.username}
                                    placeholder="Nhập tên tài khoản"
                                    onChangeText={handleChange('username')}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.username}
                                ></Input>
                                <Input
                                    name="password"
                                    label="Mật khẩu"
                                    value={values.password}
                                    placeholder="Nhập mật khẩu"
                                    onChangeText={handleChange('password')}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.gray}
                                    labelStyle={styles.label}
                                    inputStyle={styles.input}
                                    errorMessage={errors.password}
                                ></Input>
                                <Button
                                    title="Đăng ký"
                                    type="solid"
                                    loading={isLoading}
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    disabled={!isValid}
                                ></Button>
                            </>
                        )}
                    </Formik>
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

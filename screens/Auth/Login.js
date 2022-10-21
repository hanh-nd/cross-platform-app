import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import UIButton from '../../components/UIButton';
import { isValidPassword } from '../../utilities/Validations';
function Login(props) {
    const [keyboardIsShown, setKeyboardIsShown] = useState(false);
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

    useEffect(() => {
        //componentDidMount
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false);
        });
    });
    //navigation
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 100,
                backgroundColor: 'white',
            }}
        >
            <View>
                <Image source={require('../../assets/favicon.png')} />
                <TextInput
                    placeholder="So dien thoai"
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <TextInput
                    placeholder="Mat khau"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <UIButton
                    title="Login"
                    onPress={() => {
                        // TODO: Call login API
                        console.log(
                            `Phone = ${phoneNumber}, Password = ${password}`
                        );
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
}
export default Login;

import { Button, Dialog, Input } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { DismissKeyboardView } from '../../components';
import { PageName } from '../../navigation/constants';
import { login } from '../../repositories/login';
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
    const [loading, setLoading] = useState(false);
    let dropdown = useRef();

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

    const onLogin = async () => {
        setLoading(true);
        const result = await login({
            phonenumber: phoneNumber,
            password,
        });
        if (result?.success) {
            navigate({
                name: PageName.HOME,
            });
        } else {
            dropdown.alertWithType('error', 'Error', result?.message);
        }
        setLoading(false);
    };

    return (
        <DismissKeyboardView>
            <View>
                <Image source={require('../../assets/favicon.png')} />
                <Input
                    placeholder="So dien thoai"
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <Input
                    placeholder="Mat khau"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <Button title="Login" type="solid" onPress={onLogin}></Button>
            </View>
            <Dialog
                isVisible={loading}
                onBackdropPress={() => setLoading(false)}
            >
                <Dialog.Loading />
            </Dialog>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropdown = ref;
                    }
                }}
            />
        </DismissKeyboardView>
    );
}
export default Login;

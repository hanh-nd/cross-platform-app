import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { DismissKeyboardView } from '../../components';
import { PageName } from '../../navigation/constants';
import { setIsLoggedIn } from '../../redux/features/app/appSlice';
import { logout } from '../../repositories/auth.api';

function Home(props) {
    const dispatch = useDispatch();
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    backAction
                );
            };
        }, [])
    );

    const backAction = async () => {
        BackHandler.exitApp();
    };

    const onLogout = () => {
        logout();
        dispatch(setIsLoggedIn(false));
        navigate({
          name: PageName.LOGIN,
        });
    }

    return (
        <DismissKeyboardView>
            <Text>HOME</Text>
            <Button onPress={onLogout} title='logout'/>
        </DismissKeyboardView>
    );
}

export default Home;

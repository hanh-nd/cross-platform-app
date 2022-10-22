import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, Text, Button } from 'react-native';
import { DismissKeyboardView } from '../../components';
import { PageName } from '../../navigation/constants';

function Home(props) {
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

    return (
        <DismissKeyboardView>
            <Text>HOME</Text>
            <Button onPress={() => props.navigation.navigate(PageName.LOGIN)} title='logout'/>
        </DismissKeyboardView>
    );
}

export default Home;

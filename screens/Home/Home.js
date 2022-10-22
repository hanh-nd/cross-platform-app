import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, Text } from 'react-native';
import { DismissKeyboardView } from '../../components';

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
        </DismissKeyboardView>
    );
}

export default Home;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { PageName } from '../../navigation/constants';
import * as Font from 'expo-font';

function Loading(props) {
    const { navigation } = props;
    useEffect(() => {
        async function load() {
            await loadFonts();
            await checkLoginUser();
        }
        load();
    });

    const loadFonts = async () => {
        await Font.loadAsync({
            MaterialIcons: require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
            FontAwesome: require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
        });
    };
    const checkLoginUser = async () => {
        const loginUserId = await AsyncStorage.getItem('loginUserId');
        if (isEmpty(loginUserId)) {
            navigation.navigate({ name: PageName.LOGIN });
        } else {
            navigation.navigate({ name: PageName.BOTTOM_NAVIGATION });
        }
    };
    return null;
}

export default Loading;

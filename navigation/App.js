import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from '../plugins/redux-toolkit/store';
import Drawer from './Drawer';

function App(props) {
    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <NavigationContainer>
                    <Drawer />
                </NavigationContainer>
                <Toast />
            </Provider>
        </>
    );
}
export default App;

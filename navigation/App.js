import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PageName } from './constants';
import { routes } from './routers';

const Stack = createNativeStackNavigator();

function App(props) {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
    });

    const backAction = async () => {
        if (store.getState().app.isLoggedIn === false) {
            //
        } else {
            BackHandler.exitApp();
        }
    };

    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={PageName.LOADING}
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        {routes.map((router) => {
                            return (
                                <Stack.Screen
                                    name={router.name}
                                    component={router.component}
                                    key={router.name}
                                />
                            );
                        })}
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast />
            </Provider>
        </>
    );
}
export default App;

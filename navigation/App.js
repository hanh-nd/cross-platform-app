import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from '../plugins/redux-toolkit/store';
import { routes } from './routers';
import { PageName } from './constants';

const Stack = createNativeStackNavigator();

function App(props) {
    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={PageName.LOADING}
                    >
                        {routes.map((router) => {
                            return (
                                <Stack.Screen
                                    name={router.name}
                                    component={router.component}
                                    key={router.name}
                                    options={{
                                        headerShown: router.headerShown
                                    }}
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

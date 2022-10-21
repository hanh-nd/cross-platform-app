import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login } from '../screens';
import { routers } from './routers';
const Stack = createNativeStackNavigator();
function App(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {routers.map((router) => {
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
    );
}
export default App;

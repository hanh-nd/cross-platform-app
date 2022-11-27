import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { colors, fontSizes } from '../constants';
import { PageName } from './constants';
import { tabNavigatorRoutes } from './routers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { isIOS } from '../utilities/Device';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.inactive,
    tabBarStyle: { backgroundColor: colors.primary, height: 50 },
    tabBarShowLabel: false,

    tabBarBackground: () => (
        <View style={{ backgroundColor: colors.primary, flex: 1 }}></View>
    ),
});

function TabNavigator(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Tab.Navigator
                screenOptions={screenOptions}
                initialRouteName={PageName.HOME}
                backBehavior="initialRoute"
            >
                {tabNavigatorRoutes.map((route) => {
                    return (
                        <Tab.Screen
                            name={route.name}
                            component={route.component}
                            key={route.name}
                            options={{
                                tabBarLabel: route.name,
                                tabBarLabelStyle: {
                                    fontSize: fontSizes.h6,
                                },
                                tabBarIcon: route.icon,
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default TabNavigator;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { colors, fontSizes } from '../constants';
import { PageName } from './constants';
import { bottomNavigationRoutes } from './routers';
const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.inactive,
    tabBarActiveBackgroundColor: colors.primary,
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarBackground: () => (
        <View style={{ backgroundColor: colors.primary, flex: 1 }}></View>
    ),
});

function BottomNavigation(props) {
    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            initialRouteName={PageName.HOME}
            backBehavior="initialRoute"
        >
            {bottomNavigationRoutes.map((route) => {
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
    );
}
export default BottomNavigation;

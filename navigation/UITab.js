/**
yarn add react-navigation
yarn add react-native-safe-area-context
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add @react-navigation/drawer
yarn add react-native-gesture-handler 
yarn add react-native-reanimated
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fontSizes } from '../constants';
import { Chat, FoodList, ProductGridView, Profile, Settings } from '../screens';
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
    tabBarIcon: ({ focused, color, size }) => {
        /*
        let screenName = route.name
        let iconName = "facebook";
        if(screenName == "ProductGridView") {
            iconName = "align-center"
        } else if(screenName == "FoodList") {
            iconName = "accusoft"
        } else if(screenName == "Settings") {
            iconName = "cogs"
        }
        */
        return (
            <Icon
                style={{
                    paddingTop: 5,
                }}
                name={
                    route.name == 'ProductGridView'
                        ? 'align-center'
                        : route.name == 'FoodList'
                        ? 'accusoft'
                        : route.name == 'Settings'
                        ? 'cogs'
                        : route.name == 'Profile'
                        ? 'user'
                        : route.name == 'Chat'
                        ? 'comment-dots'
                        : ''
                }
                size={23}
                color={focused ? 'white' : colors.inactive}
            />
        );
    },
});
function UITab(props) {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            {/* <Tab.Screen 
            name={"Home"} 
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h6
                }
            }}
        /> */}
        </Tab.Navigator>
    );
}
export default UITab;

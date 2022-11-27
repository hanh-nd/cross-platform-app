import { Icon } from '@rneui/themed';
import { Chat, Home, Loading, Login, Register } from '../screens';
import TabNavigator from './TabNavigator';
import { PageName } from './constants';

export const routes = [
    {
        name: PageName.LOADING,
        component: Loading,
    },
    {
        name: PageName.TAB_NAVIGATOR,
        component: TabNavigator,
    },
    {
        name: PageName.LOGIN,
        component: Login,
    },
    {
        name: PageName.REGISTER,
        component: Register,
    },
    {
        name: PageName.HOME,
        component: Home,
    },
    {
        name: PageName.CHAT,
        component: Chat,
    },
];

export const tabNavigatorRoutes = [
    {
        name: PageName.HOME,
        component: Home,
        icon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
        ),
    },
    {
        name: PageName.CHAT,
        component: Chat,
        icon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
        ),
    },
];

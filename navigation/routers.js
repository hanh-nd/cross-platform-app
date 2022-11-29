import { Icon } from '@rneui/themed';
import { Chat, Home, Loading, Login, Register, Profile, ListFriends, EditProfile, EditUser } from '../screens';
import TabNavigator from './TabNavigator';
import { PageName } from './constants';

export const routes = [
    {
        name: PageName.LOADING,
        component: Loading,
        headerShown: false
    },
    {
        name: PageName.TAB_NAVIGATOR,
        component: TabNavigator,
        headerShown: false
    },
    {
        name: PageName.LOGIN,
        component: Login,
        headerShown: false
    },
    {
        name: PageName.REGISTER,
        component: Register,
        headerShown: false
    },
    {
        name: PageName.HOME,
        component: Home,
        headerShown: false
    },
    {
        name: PageName.CHAT,
        component: Chat,
        headerShown: false
    },
    {
        name: PageName.PROFILE,
        component: Profile,
        headerShown: false
    },
    {
        name: PageName.LIST_FRIENDS,
        component: ListFriends,
        headerShown: true
    },
    {
        name: PageName.EDIT_PROFILE,
        component: EditProfile,
        headerShown: true
    },
    {
        name: PageName.EDIT_USER,
        component: EditUser,
        headerShown: true
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
    {
        name: PageName.PROFILE,
        component: Profile,
        icon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
        ),
    },
];

import { Icon } from '@rneui/themed';
import {
    Chat,
    Home,
    Loading,
    Logout,
    Login,
    Register,
    Profile,
    ListFriends,
    EditProfile,
    EditUser,
    CreatePostPage,
    FriendProfile,
} from '../screens';
import TabNavigator from './TabNavigator';
import { PageName } from './constants';
import ChatDetail from '../screens/chat/pages/ChatDetail';
import ChatPersonal from '../screens/chat/pages/ChatPersonal';
import PostDetailPage from '../screens/post-detail/pages/PostDetailPage';

export const routes = [
    {
        name: PageName.LOADING,
        component: Loading,
        headerShown: false,
    },
    {
        name: PageName.TAB_NAVIGATOR,
        component: TabNavigator,
        headerShown: false,
    },
    {
        name: PageName.LOGIN,
        component: Login,
        headerShown: false,
    },
    {
        name: PageName.LOGOUT,
        component: Logout,
        headerShown: false,
    },
    {
        name: PageName.REGISTER,
        component: Register,
        headerShown: false,
    },
    {
        name: PageName.HOME,
        component: Home,
        headerShown: false,
    },
    {
        name: PageName.CHAT,
        component: Chat,
        headerShown: false,
    },
    {
        name: PageName.PROFILE,
        component: Profile,
        headerShown: false,
    },
    {
        name: PageName.FRIEND_PROFILE,
        component: FriendProfile,
        headerShown: true,
    },
    {
        name: PageName.LIST_FRIENDS,
        component: ListFriends,
        headerShown: true,
    },
    {
        name: PageName.EDIT_PROFILE,
        component: EditProfile,
        headerShown: true,
    },
    {
        name: PageName.EDIT_USER,
        component: EditUser,
        headerShown: true,
    },
    {
        name: PageName.CREATE_POST_PAGE,
        component: CreatePostPage,
        headerShown: true,
    },
    {
        name: PageName.CHAT_DETAIL,
        component: ChatDetail,
        headerShown: true,
    },
    {
        name: PageName.CHAT_PERSONAL,
        component: ChatPersonal,
        headerShown: true,
    },
    {
        name: PageName.POST_DETAIL_PAGE,
        component: PostDetailPage,
        headerShown: true,
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

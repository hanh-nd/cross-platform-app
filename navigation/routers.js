import { Home, Login, Register } from '../screens';
import { PageName } from './constants';
import UITab from './UITab';

export const routers = [
    {
        name: PageName.UI_TAB,
        component: UITab,
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
];

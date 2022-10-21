import { Login, Register } from '../screens';
import UITab from './UITab';
import { PageName } from './constants';

export const routers = [
    {
        name: PageName.LOGIN,
        component: Login,
    },
    {
        name: PageName.REGISTER,
        component: Register,
    },
    {
        name: PageName.UI_TAB,
        component: UITab,
    },
];

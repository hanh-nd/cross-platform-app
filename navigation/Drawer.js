import { createDrawerNavigator } from '@react-navigation/drawer';
import Exit from '../screens/auth/pages/Exit';
import Logout from '../screens/auth/pages/Logout';
import { PageName } from './constants';
import ScreenStack from './ScreenStack';

const DrawerNavigator = createDrawerNavigator();

function Drawer(props) {
    return (
        <DrawerNavigator.Navigator
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <DrawerNavigator.Screen
                name={PageName.ROOT}
                component={ScreenStack}
            />
            <DrawerNavigator.Screen name={PageName.LOGOUT} component={Logout} />
            <DrawerNavigator.Screen name={PageName.EXIT} component={Exit} />
        </DrawerNavigator.Navigator>
    );
}

export default Drawer;

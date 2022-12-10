import { createDrawerNavigator } from '@react-navigation/drawer';
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
        </DrawerNavigator.Navigator>
    );
}

export default Drawer;

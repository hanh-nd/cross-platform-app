import { Badge } from '@rneui/themed';
import { useCallback, useEffect } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { screen } from '../../../constants';
import { SocketProvider } from '../../../plugins/socket';
import NotificationItem from '../components/NotificationItem';
import {
    fetchNotificationList,
    selectIsLoading,
    selectNotificationList,
    selectUnreadNotificationCount,
} from '../reducers/notification.reducer';

function NotificationPage(props) {
    const { navigation } = props;
    const notificationList = useSelector(selectNotificationList);
    const unreadNotificationCount = useSelector(selectUnreadNotificationCount);
    const refreshing = useSelector(selectIsLoading);

    useEffect(() => {
        navigation.setOptions({
            tabBarBadge: () =>
                unreadNotificationCount ? (
                    <Badge
                        status="error"
                        value={unreadNotificationCount}
                        badgeStyle={{ position: 'absolute', right: 25, top: 5 }}
                    />
                ) : null,
        });
    }, [unreadNotificationCount]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNotificationList());
        setTimeout(() => {
            SocketProvider.onNotification(({ sender, module, action }) => {
                dispatch(fetchNotificationList());
            });
        }, 1000);
    }, []);

    const onRefresh = useCallback(() => {
        dispatch(fetchNotificationList());
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={true}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <FlatList
                data={notificationList}
                renderItem={({ item }) => <NotificationItem item={item} />}
                style={{ width: screen.width }}
            />
        </ScrollView>
    );
}

export default NotificationPage;

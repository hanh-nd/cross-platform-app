import { env } from '@constants';
import { Avatar, BottomSheet, Divider, Icon, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SocketProvider } from '../../../plugins/socket';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import ConversationItem from '../components/ConversationItem';
import {
    fetchChatList,
    fetchMessageListByFriend,
    selectChatList,
} from '../reducers/chat.reducer';

function Chat(props) {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const chatList = useSelector(selectChatList);
    const loginUser = useSelector(selectLoginUser);

    useEffect(() => {
        dispatch(fetchChatList());
        setTimeout(() => {
            SocketProvider.onMessage(
                ({ _id, chatId, content, receiverId, senderId, time }) => {
                    dispatch(fetchMessageListByFriend(senderId));
                    dispatch(fetchChatList());
                },
            );

            SocketProvider.onRecallMessage((msg) => {
                const { _id, chatId, content, receiverId, senderId, time } =
                    msg.data;
                dispatch(fetchMessageListByFriend(senderId));
                dispatch(fetchChatList());
            });
        }, 100);
    }, []);

    const list = [
        {
            title: 'Xóa',
            iconName: 'delete',
        },
        {
            title: 'Chặn',
            iconName: 'block',
        },
    ];
    return (
        <ScrollView>
            <View style={styles.inputHeader}>
                <View style={{ flex: 0.2, paddingHorizontal: 10 }}>
                    <Avatar
                        rounded
                        size={60}
                        source={
                            loginUser?.avatar
                                ? {
                                      uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                                  }
                                : require('assets/default_avt.jpg')
                        }
                    />
                </View>
                <View style={{ flex: 1.1 }}>
                    <TextInput
                        keyboardType="default"
                        placeholder="Tìm kiếm"
                        style={styles.inputSearch}
                    />
                </View>
            </View>
            <Divider width={1} style={{ marginTop: 5, marginBottom: 20 }} />
            {chatList
                ? chatList.map((chat) => {
                      const { friend, seen, lastMessage } = chat;
                      return (
                          <ConversationItem
                              key={Math.random()}
                              receiver={friend}
                              lastMessage={lastMessage.content}
                              setIsVisibleBlockSheet={setIsVisible}
                          />
                      );
                  })
                : null}
            <BottomSheet
                isVisible={isVisible}
                modalProps={{
                    animationType: 'fade',
                }}
                onBackdropPress={() => setIsVisible(false)}
            >
                {list.map((l, i) => (
                    <ListItem key={i} onPress={l.onPress}>
                        <ListItem.Content style={styles.contentStyle}>
                            <Icon
                                name={l.iconName}
                                type="material"
                                color="#ff0000"
                            />
                            <ListItem.Title style={styles.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    inputHeader: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputSearch: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: '100%',
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#ff0000',
    },
    titleStyle: {
        fontWeight: '700',
        color: '#ff0000',
        marginHorizontal: 10,
    },
});
export default Chat;

import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, BottomSheet, Icon, ListItem } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import {
    Button,
    Pressable,
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import ConversationHeader from '../components/ConversationHeader';
import Message from '../components/Message';

function ChatDetail(props) {
    const { params } = props;
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params.item;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <ConversationHeader item={item} />,
            headerRight: () => (
                <Icon
                    type="font-awesome"
                    name="info-circle"
                    color={colors.grayBlue}
                    onPress={() => {
                        navigation.navigate({
                            name: PageName.CHAT_PERSONAL,
                            params: {
                                item: item,
                            },
                        });
                    }}
                />
            ),
        });
    }, []);

    const loginUser = useSelector(selectLoginUser);
    const [chatMessages, setChatMessages] = useState([
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
        {
            id: Math.random(),
            text: 'Xin chào, cậu khỏe không?',
            time: '08:50',
            userId: '6391ee3b20e93c474ca05719',
        },
        {
            id: Math.random(),
            text: 'Xin chào',
            time: '07:50',
            userId: '6391ee3b20e93c474ca05718',
        },
    ]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const handleNewMessage = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;
    };
    return (
        <View style={styles.messagingScreen}>
            <View
                style={[
                    styles.messagingScreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Message item={item} userId={loginUser._id} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    ''
                )}
            </View>

            <View style={styles.messagingInputContainer}>
                <TextInput
                    style={styles.messagingInput}
                    multiline
                    onChangeText={(value) => setMessage(value)}
                />

                <Icon
                    type="material"
                    name="send"
                    color={colors.grayBlue}
                    onPress={() => {}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    messagingScreen: {
        flex: 1,
    },
    messagingInputContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    messagingInput: {
        borderWidth: 1,
        minHeight: 40,
        maxHeight: 100,
        padding: 5,
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
    },
    messagingButtonContainer: {
        width: '30%',
        backgroundColor: 'green',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
});

export default ChatDetail;

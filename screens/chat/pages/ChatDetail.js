import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Input } from '@rneui/themed';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { SocketProvider } from '../../../plugins/socket';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import ConversationHeader from '../components/ConversationHeader';
import Message from '../components/Message';
import {
    fetchMessageListByFriend,
    selectMessageList,
} from '../reducers/chat.reducer';

function ChatDetail(props) {
    const { params } = props;
    const navigation = useNavigation();
    const route = useRoute();
    const {
        chatId,
        lastMessage,
        receiver,
        seen = false,
        blockers = [],
    } = route.params;
    const messageList = useSelector(selectMessageList);
    const dispatch = useDispatch();

    const messageListRef = useRef();

    const initialValues = {
        content: '',
    };

    useEffect(() => {
        if (receiver) {
            dispatch(fetchMessageListByFriend(receiver._id));
        }
    }, []);

    useEffect(() => {
        messageListRef.current.scrollToEnd();
    }, [messageList])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <ConversationHeader user={receiver} />,
            headerRight: () => (
                <Icon
                    type="font-awesome"
                    name="info-circle"
                    color={colors.grayBlue}
                    onPress={() => {
                        navigation.navigate({
                            name: PageName.CHAT_PERSONAL, // TODo: FIx
                            params: {
                                item: item,
                            },
                        });
                    }}
                />
            ),
        });
    }, []);

    const sendMessage = ({ content }, { resetForm }) => {
        SocketProvider.emitChatMessage(receiver._id, content, chatId)
        dispatch(fetchMessageListByFriend(receiver._id));
        resetForm();
    };
    return (
        <View style={styles.messagingScreen}>
            <View style={styles.messageList}>
                <FlatList
                    ref={messageListRef}
                    data={messageList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Message
                            sender={item.senderId}
                            content={item.content}
                            time={item.time}
                        />
                    )}
                />
            </View>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    sendMessage(values, { resetForm });
                }}
            >
                {({ handleChange, handleSubmit, values, isValid }) => (
                    <Input
                        name="content"
                        inputContainerStyle={styles.messagingInputContainer}
                        inputStyle={styles.messagingInput}
                        renderErrorMessage={false}
                        placeholder="Nhập tin nhắn"
                        multiline
                        onChangeText={handleChange('content')}
                        value={values.content}
                        rightIcon={
                            <Icon
                                style={{ padding: 8 }}
                                type="material"
                                name="send"
                                color={colors.grayBlue}
                                disabled={!isValid}
                                onPress={handleSubmit}
                            />
                        }
                    />
                )}
            </Formik>
        </View>
    );
}

const styles = {
    messagingScreen: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom: 6,
    },
    messageList: {
        flex: 1,
    },
    messagingInputContainer: {
        borderBottomWidth: 0,
        borderRadius: 20,
    },
    messagingInput: {
        padding: 8,
        maxHeight: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
};

export default ChatDetail;

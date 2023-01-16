import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomSheet, Button, Icon, Input } from '@rneui/themed';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { SocketProvider } from '../../../plugins/socket';
import { isAuthor } from '../../../utilities/User';
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
    const loginUser = useSelector(selectLoginUser);
    const dispatch = useDispatch();
    const [selectedMessageIndex, setSelectedMessageIndex] = useState();
    const [isShowMessageMenu, setIsShowMessageMenu] = useState(false);
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
        setTimeout(() => {
            messageListRef.current.scrollToEnd();
        }, 100);
    }, [messageList]);

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
                            name: PageName.CHAT_PERSONAL,
                            params: {
                                receiver,
                            },
                        });
                    }}
                />
            ),
        });
    }, []);

    const sendMessage = ({ content }, { resetForm }) => {
        SocketProvider.emitChatMessage(receiver._id, content, chatId);
        dispatch(fetchMessageListByFriend(receiver._id));
        resetForm();
    };

    const openMessageMenu = (id) => {
        setSelectedMessageIndex(id);
        setIsShowMessageMenu(true);
    };

    const recallMessage = () => {
        if (selectedMessageIndex)
            SocketProvider.emitRecallMessage(
                receiver._id,
                selectedMessageIndex,
            );
    };

    return (
        <View style={styles.messagingScreen}>
            <View style={styles.messageList}>
                <FlatList
                    ref={messageListRef}
                    data={messageList}
                    showsVerticalScrollIndicator={false}
                    disableScrollViewPanResponder={true}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onLongPress={() => {
                                if (isAuthor(item.senderId, loginUser))
                                    openMessageMenu(index);
                            }}
                        >
                            <Message
                                sender={item.senderId}
                                content={item.content}
                                time={item.time}
                            />
                        </Pressable>
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
            <BottomSheet
                isVisible={isShowMessageMenu}
                onBackdropPress={() => setIsShowMessageMenu(false)}
            >
                <Button title="Thu hồi" onPress={recallMessage}></Button>
            </BottomSheet>
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

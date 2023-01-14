import { env } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

let _socket;
export const SocketProvider = {
    initialize: (accessToken) => {
        if (_socket?.connected) {
            return console.log('socket is connected!');
        }
        console.log('initializing...', accessToken);
        _socket = io.connect(env.SOCKET_URL, {
            extraHeaders: {
                token: accessToken,
            },
        });
    },

    emitChatMessage: async (receiverId, chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('chatmessage', {
            token,
            receiverId,
        });
    },

    emitBlockers: async (receiverId, type, chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('blockers', {
            token,
            receiverId,
            type,
            chatId,
        });
    },

    emitRecallMessage: async (receiverId, chatId, index) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('recallmessage', {
            token,
            receiverId,
            chatId,
            index,
        });
    },

    emitSeenMessage: async (chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('seenMessage', {
            token,
            chatId,
        });
    },

    emitUserLike: async (targetId, module) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('user_like', {
            token,
            targetId,
            module,
        });
    },

    emitUserComment: async (targetId, module) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('user_comment', {
            token,
            targetId,
            module,
        });
    },

    emitUserSendRequest: async (targetId, module) => {
        const token = await AsyncStorage.getItem('accessToken');
        _socket.emit('user_send_request', {
            token,
            targetId,
            module,
        });
    },

    onMessage: (callback) => {
        _socket.on('message', (msg) => {
            // console.log(`at onMessage:`, msg);
            if (callback) {
                callback(msg);
            }
        });
    },

    onBlockers: (callback) => {
        _socket.on('blockers', (msg) => {
            // console.log(`at onBlockers`, msg);
            if (callback) {
                callback(msg);
            }
        });
    },

    onRecallMessage: (callback) => {
        _socket.on('recallmessage', (msg) => {
            // console.log(`at onRecallMessage`, msg);
            if (callback) {
                callback(msg);
            }
        });
    },

    onNotification: (callback) => {
        _socket.on('notification', (msg) => {
            // console.log(`at notification`, msg);
            if (callback) {
                callback(msg);
            }
        });
    },
};

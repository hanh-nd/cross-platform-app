import { env } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import { getAccessToken } from '../axios/axios';

class SocketProvider {
    static _socket;

    /**
     * các hàm emitXXX thì gọi khi muốn bắn 1 sự kiện, ví dụ button SendChat() {
     *  SocketProvider.emitChatMessage(receiverId, chatId)
     * }
     *
     * các hàm onXXX thì gọi trong useEffect() của page Chat (hoặc page liên quan),
     * đoạn này nó trả về data rùi xử lý sao thì em chưa đọc
     */

    static initialize = (accessToken) => {
        SocketProvider._socket = io.connect(env.SOCKET_URL, {
            extraHeaders: {
                token: accessToken,
            },
        });
    };

    /**
     *
     * @param {*} receiverId (required)
     * @param {*} chatId (optional) - la cai gi y em chua ro~
     */
    static emitChatMessage = async (receiverId, chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        SocketProvider._socket.emit('chatmessage', {
            token,
            receiverId,
        });
    };

    /**
     *
     * @param {*} receiverId
     * @param {*} type: block
     * @param {*} chatId
     */
    static emitBlockers = async (receiverId, type, chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        SocketProvider._socket.emit('blockers', {
            token,
            receiverId,
            type,
            chatId,
        });
    };

    /**
     *
     * @param {*} receiverId
     * @param {*} chatId
     * @param {*} index )
     */
    static emitRecallMessage = async (receiverId, chatId, index) => {
        const token = await AsyncStorage.getItem('accessToken');
        SocketProvider._socket.emit('recallmessage', {
            token,
            receiverId,
            chatId,
            index,
        });
    };

    /**
     *
     * @param {*} chatId
     */
    static emitSeenMessage = async (chatId) => {
        const token = await AsyncStorage.getItem('accessToken');
        SocketProvider._socket.emit('seenMessage', {
            token,
            chatId,
        });
    };

    static onMessage = (callback) => {
        SocketProvider._socket.on('message', (msg) => {
            console.log(`at onMessage:`, msg);
            if (callback) {
                callback(msg);
            }
        });
    };

    static onBlockers = (callback) => {
        SocketProvider._socket.on('blockers', (msg) => {
            console.log(`at onBlockers`, msg);
            if (callback) {
                callback(msg);
            }
        });
    };

    static onRecallMessage = (callback) => {
        SocketProvider._socket.on('recallmessage', (msg) => {
            console.log(`at onRecallMessage`, msg);
            if (callback) {
                callback(msg);
            }
        });
    };
}

export default SocketProvider;

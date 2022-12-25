import { env } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import { getAccessToken } from '../axios/axios';

// class SocketProvider {
//     static _socket;

//     static initialize = () => {
//         SocketProvider._socket = io.connect(env.SOCKET_URL);
//     };

//     static getSocket = () => {
//         if (!SocketProvider._socket) {
//             SocketProvider.initialize();
//         }
//         return SocketProvider._socket;
//     };
// }
// export default SocketProvider.getSocket();



const Socket = async () => {

    const token = await getAccessToken();
    // console.log("🚀 ~ file: index.js:27 ~ getSocket ~ token", token)
    const socket = io.connect(env.SOCKET_URL, {
        extraHeaders: {
            token
        },
    });
    return socket;
}
export default Socket;

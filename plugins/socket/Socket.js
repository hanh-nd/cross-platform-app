import { env } from '@/constants';
import { io } from "socket.io-client";

class SocketProvider {
    static _socket;

    static initialize = () => {
        SocketProvider._socket = io.connect(env.SOCKET_URL);
    }

    static getSocket = () => {
        if (!SocketProvider._socket) {
            this.initialize()
        }
        return SocketProvider._socket
    }
}

export default SocketProvider.getSocket()
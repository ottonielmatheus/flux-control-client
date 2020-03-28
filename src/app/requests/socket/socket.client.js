import io from 'socket.io-client';
import baseApi from '../../../base-api';

const socket = io.connect(baseApi, { autoConnect: false });

export default socket;
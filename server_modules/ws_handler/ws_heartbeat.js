export const start_heartbeat = (ws_server) => {
	return setInterval(
        () => (check_socket_all(ws_server)),
        1000
    );
};

// check the state of every socket
export const check_socket_all = (ws_server) => {
    ws_server.clients.forEach((socket) => {check_socket(socket)})
};

// check the state of a socket and close it if it is dead
export const check_socket = (socket) => {
    if (socket.is_alive === false) {
        socket.close();
        ws_data.remove_user(data, dead_socket_uid[i]);
    } else {
        socket.is_alive = false;
        socket.ping(() => {});
    }
};

// when pong event fired, keep the socket alive
export const heartbeat = (socket) => {
    socket.is_alive = true;
};

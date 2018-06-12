export const ping_all = (ws_server) => {
    ws_server.clients.forEach((socket) => {
        if (socket.is_alive === false) {
            socket.close();
            return socket.uid;
        }
        socket.is_alive = false;
        socket.ping(() => {});
    })
    return null;
};

export const heartbeat = (socket) => {
    socket.is_alive = true;
};

export const handle_ws_server = (data, ws_server) => {
    ws_server.on("connection", async (socket) => {
        await connect_to_socket(data, socket);
        await create_new_player();
    });
    const heartbeat_interval = setInterval(() => (ping_all(ws_server)), 1000);
};

export const ping_all = (ws_server) => {
    ws_server.clients.forEach((socket) => {
        if (socket.is_alive === false) {
            return socket.terminate();
        }
        socket.is_alive = false;
        socket.ping(() => {});
    })
};

export const connect_to_socket = (data, socket) => {
    // data.users.push("user");
    // data.users.forEach(() => (console.log("user")));
    socket.is_alive = true;
    socket.on("pong", () => (heartbeat(socket)));
    socket.on("message", (message) => {
        console.log(message);
    });
};

export const heartbeat = (socket) => {
    socket.is_alive = true;
};

export const create_new_player = () => {
    console.log("weee");
};

const ws_heartbeat  = require("./ws_heartbeat");
const ws_uid        = require("./ws_uid");
const ws_data       = require("./ws_data");

export const handle_ws_server = (data, ws_server) => {
    ws_server.on("connection", async (socket) => {
        socket.uid = await ws_uid.get_new_uid(data.users);
        await handle_socket_interactions(data, socket);
        await ws_data.create_user(data, socket.uid);
    });
    const heartbeat_interval = setInterval(() => {
        let dead_socket_uid = ws_heartbeat.ping_all(ws_server);
        if (dead_socket_uid !== null) {
            ws_data.remove_user(data, dead_socket_uid);
        }
    }, 1000);
};

export const handle_socket_interactions = (data, socket) => {
    socket.is_alive = true;
    socket.on("pong", () => (ws_heartbeat.heartbeat(socket)));
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.on("close", (() => (handle_socket_closure(data, socket))));
};

export const handle_socket_closure = (data, socket) => {
    ws_data.remove_user(data, socket.uid);
};

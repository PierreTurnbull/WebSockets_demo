const ws_heartbeat  = require("./ws_heartbeat");
const ws_uid        = require("./ws_uid");
const ws_data       = require("./ws_data");

// handle every websocket on the websocket server
export const handle_ws_server = (data, ws_server) => {
    ws_server.on("connection", (socket) => (handle_socket(data, ws_server, socket)));
    const heartbeat_interval = setInterval(
        () => (ws_heartbeat.check_socket_all(ws_server)),
        1000
    );
};

// handle a socket
export const handle_socket = (data, ws_server, socket) => {
    socket.uid = ws_uid.get_new_uid(data.users);
    handle_socket_interactions(data, socket);
    ws_data.create_user(data, socket.uid);
};

// handle interactions between the client and the server
export const handle_socket_interactions = (data, socket) => {
    socket.is_alive = true;
    socket.on("pong", () => (ws_heartbeat.heartbeat(socket)));
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.on("close", (() => (handle_socket_closure(data, socket))));
};

// cleans data concerning the user who disconnected
export const handle_socket_closure = (data, socket) => {
    ws_data.remove_user(data, socket.uid);
};

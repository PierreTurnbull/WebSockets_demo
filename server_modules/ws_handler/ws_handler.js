const ws_communication 	= require("./ws_communication");
const ws_data       	= require("./ws_data");
const ws_heartbeat  	= require("./ws_heartbeat");
const ws_uid        	= require("./ws_uid");

// handle sockets on the websocket server
export const handle_ws_server = (data, ws_server) => {
    ws_server.on("connection", async (socket) => {
		await handle_socket(data, ws_server, socket);
		ws_communication.broadcast_app_state(data, ws_server);
	});
    const heartbeat_interval = ws_heartbeat.start_heartbeat(ws_server);
};

// handle a socket
export const handle_socket = async (data, ws_server, socket) => {
    socket.uid = await ws_uid.get_new_uid(data.users);
    handle_socket_interactions(data, socket);
    ws_data.create_user(data, socket.uid);
};

// handle socket interactions between the client and the server
export const handle_socket_interactions = (data, socket) => {
    socket.is_alive = true;
    socket.on("pong", () => (ws_heartbeat.heartbeat(socket)));
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.on("close", (() => (handle_socket_closure(data, socket))));
};

// clean data concerning the user who disconnected
export const handle_socket_closure = (data, socket) => {
    ws_data.remove_user(data, socket.uid);
};

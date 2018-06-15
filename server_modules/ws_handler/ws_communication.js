// broadcast data 'data' to all clients of the websocket server 'ws_server'
export const broadcast_app_state = (data, ws_server) => {
	ws_server.clients.forEach((client) => {
		client.send(JSON.stringify(data));
	});
}

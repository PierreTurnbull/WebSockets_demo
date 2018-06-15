const socket = new WebSocket("ws://127.0.0.1:3001");

console.log(socket);
socket.onopen = () => {
    socket.send("new co");
};
socket.onmessage = (message) => {
	console.log(JSON.parse(message.data));
};

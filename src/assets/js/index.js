const socket = new WebSocket("ws://127.0.0.1:3001");
var data;
var root = document.querySelector("#root");

console.log(socket);
socket.onopen = () => {
    socket.send("new co");
};
socket.onmessage = (message) => {
	data = JSON.parse(message.data);
	render();
};

function render() {
	root.innerHTML = "";
	data.users.forEach((user) => {
		var element = document.createElement("div");
		for (var style_element in user.style) {
			element.style[style_element] = user.style[style_element];
		}
		element.textContent = user.uid;
		root.appendChild(element);
	});
}

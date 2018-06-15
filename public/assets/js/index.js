"use strict";

var socket = new WebSocket("ws://127.0.0.1:3001");
var data;
var root = document.querySelector("#root");

console.log(socket);
socket.onmessage = function (message) {
	data = JSON.parse(message.data);
	render();
};

function render() {
	root.innerHTML = "";
	data.users.forEach(function (user) {
		var element = document.createElement("div");
		for (var style_element in user.style) {
			element.style[style_element] = user.style[style_element];
		}
		root.appendChild(element);
	});
}

window.addEventListener("keydown", function (event) {
	if (event.key === "z" || event.key === "q" || event.key === "s" || event.key === "d") {
		socket.send(JSON.stringify({
			type: "input",
			body: {
				key: event.key
			}
		}));
	}
});
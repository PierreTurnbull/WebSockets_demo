"use strict";

var socket = new WebSocket("ws://127.0.0.1:3001");
var data;
var root = document.querySelector("#root");

console.log(socket);
socket.onopen = function () {
	socket.send("new co");
};
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
		element.textContent = user.uid;
		root.appendChild(element);
	});
}
"use strict";

var socket = new WebSocket("ws://127.0.0.1:3001");

console.log(socket);
socket.onopen = function () {
  socket.send("new co");
};
socket.onmessage = function (message) {
  console.log(JSON.parse(message.data));
};
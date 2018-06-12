// modules
const http = require("http");
const express = require("express");
const fs = require("fs");
const url = require("url");
const WebSocket = require("ws");

// server constants
const hostname = "localhost";
const port = 3000;
const ws_port = 3001;
const root = "public";
const app = express();

// websocket server
const ws_server = new WebSocket.Server({
    port: ws_port
});

// router
app.get("*", (request, response) => {
    let path = "./" + root + url.parse(request.url, true).pathname;
    if (path.substr(path.length - 1) === "/") {
        path += "index.html";
    }
    let extension = path.substr(path.length - 2);
    console.log(path);
    fs.readFile(path, (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "plain text");
            response.write("Error 404: the file you asked for couldn't be found :(");
            return response.end();
        } else if (extension === "js") {
            response.statusCode = 200;
            response.setHeader("Content-Type", "plain text");
            response.write(data);
            return response.end();
        } else {
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            response.write(data);
            return response.end();
        }
    });
});

// server
const server = http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

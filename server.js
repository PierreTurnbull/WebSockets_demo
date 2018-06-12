// modules
const http = require("http");
const express = require("express");
const fs = require("fs");
const WebSocket = require("ws");

// server constants
const hostname = "localhost";
const port = 3000;
const root = "public";
const app = express();

// router
app.get("*", (request, response) => {
    fs.readFile("public/index.html", (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "plain text");
            response.write("Error 404: the file you asked for couldn't be found :(");
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

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");
const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(3000, ()=>{
    console.log("Server rodando na porta 3000");
});

const io = socketIo(server);

const messages = [];




io.on("connection", (socket) => {

    console.log("new connection");

    socket.emit('update_message' , messages);
    
    socket.on("new_message", (data)=>{
        messages.push(data);
        io.emit('update_message' , messages);
    })



});
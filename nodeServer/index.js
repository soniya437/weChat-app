
const express = require('express')
const app = express()
const server = require('http').createServer(app);

//Node server which will handle socket io connections.
const io = require('socket.io')(server) //port=8000

const users = {}

// if any new user connects, inform to all
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone send message, broadcast that to all
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    
    //if someone leaves, inform to all
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',  users[socket.id])
        delete users[socket.id];
    });

})

server.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
 });

 server.listen(8000,()=>{
    console.log('This is the socket server')
 })



const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});
io.on('connection', socket => {
    socket.emit('chat-message', 'User Entered');
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
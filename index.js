let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('Disconnected')
    });

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data))
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data))

    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data))

    })

    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('stopTyping', (data))

    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
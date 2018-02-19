require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('new user connected');

    // socket.emit('newMessage', {
    //   from: 'naresh',
    //   text: 'this is awsome',
    //   createdAt: 123
    // });

    socket.on('createMessage', (message) => {

      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from client');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
})

//node server to handle the socket io connections

const io = require('socket.io')({
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  });
  
  io.attach(8000);
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', namee =>{
        users[socket.id]= namee;
        socket.broadcast.emit('user-joined', namee);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('recieve',{message: message, name: users[socket.id]})
    });
    
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})
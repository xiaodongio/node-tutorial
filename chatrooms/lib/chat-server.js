const socket = require('socket.io');
let io;
let guestNum = 1;
const nickNames = {};
const namesUsed = [];
const currentRoom = {};


function assignGuestName(socket, guestNum, nickNames, namesUsed) {
  const name = 'Guest' + guestNum;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNum + 1;
}

function joinRoom(socket, room) {
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + 'has joined ' + room + ' . '
  });
  let usersInRoom = io.sockets.clients(room);
  if(usersInRoom.length > 1) {
    let usersInRoomSummary = 'Users currently in ' + room + ' : ';
    for (let index in usersInRoom) {
      let userSocketId = usersInRoom[index].id;
      if(userSocketId != socket.id) {
        if(index > 0) {
          usersInRoomSummary += ',  ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '.';
    socket.emit('message', {text: usersInRoomSummary});
  }

}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', name => {
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest"'
      });
    } else {
      if (namesUsed.indexOf(name) == -1) {
        let previousName = nickNames[socket.id];
        let previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + 'is now known as ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'This name is already in use.'
        });
      }
    }
  })
}

function handleMessageBroadcasting(socket, nickNames) {
  socket.on('message', message => {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}


function handleRoomJoining(socket) {
  socket.on('join', room => {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}

function handleClientDisconnect(socket, nickNames, namesUsed) {
  socket.on('disconnect', () => {
    let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}


exports.listen = server => {
  io = socket.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', socket => {
    guestNum = assignGuestName(socket, guestNum, nickNames, namesUsed);
    joinRoom(socket, 'chat');
    handleMessageBroadcasting(socket, nickNames);

    handleNameChangeAttempts(socket, nickNames, namesUsed);

    handleRoomJoining(socket);

    socket.on('rooms', () => {
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    
    handleClientDisconnect(socket, nickNames, namesUsed);
  });
}

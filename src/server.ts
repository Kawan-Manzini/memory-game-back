import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
  console.log('User connected');

  socket.on('guess', (guess: number) => {
    // Implemente a lógica do jogo aqui
    const randomNumber = Math.floor(Math.random() * 100);
    if (guess === randomNumber) {
      io.emit('message', 'Congratulations! You guessed the correct number.');
    } else {
      io.emit('message', 'Try again.');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

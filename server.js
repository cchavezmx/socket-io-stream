import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import path from 'path';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

const __dirname = path.resolve();

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})


io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('howdy', (msg) => {
    console.log(msg)    
    
  })

  
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})



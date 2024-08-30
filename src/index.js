
import express from 'express'
import { Server } from 'socket.io';
import http from 'http'
import routes  from './api/routes/index.js'
import database  from '../src/api/models/index.js';

const app = express();
const port = 3000;
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5137'
  }
});
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

database.sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

export default app;
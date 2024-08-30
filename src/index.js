
import express from 'express'
import app from 'express'
import server from 'express'
import io from 'socket.io'
import { Server } from 'socket.io';

import routes  from './api/routes/index.js'
import database  from '../src/api/models/index.js';
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
const app = express();
const port = 3000;

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
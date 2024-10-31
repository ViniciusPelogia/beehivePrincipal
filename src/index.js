import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import routes from './api/routes/index.js';
import database from '../src/api/models/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para URL encoded

routes(app); // Use as rotas definidas no arquivo routes

server.listen(port, () => {
  console.log(`servidor está rodando na porta ${port}`);
});

database.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

export { app, io };

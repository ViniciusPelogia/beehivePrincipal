import express from "express";
import { Server } from "socket.io";
import http from "http";
import routes from "./api/routes/index.js";
import database from "../src/api/models/index.js";
import bodyParser from "body-parser";
import multer from 'multer'
import cors from 'cors';

const upload = multer()
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Adicione o middleware CORS antes das rotas
app.use(cors({
  origin: 'http://localhost:5173', // Permita requisições apenas desta origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json()); // Para analisar JSON no corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('imagem'));

routes(app);

server.listen(port, () =>
  console.log(`servidor está rodando na porta ${port}`)
);

// RESPOSTA DO BANCO:
database.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

export { app, io };

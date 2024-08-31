import express from "express";
import { Server } from "socket.io";
import http from "http";
import routes from "./api/routes/index.js";
import database from "../src/api/models/index.js";
import cors from 'cors'

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

routes(app);

server.listen(port, () =>
  console.log(`servidor está rodando na porta ${port}`)
);

app.use(cors())

//RESPOSTA DO BANCO:
database.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

export {app, io};

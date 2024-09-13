import {io} from "./index.js";
import axios from "axios";

io.on("connection", (socket) => {
  console.log("Novo cliente conectado, id: " + socket.id);

  socket.on("selecionar_hive", async (idHive, devolverTexto)=>{
    socket.join(idHive);

    const encontraHive = await axios.get(`http://localhost:3000/hive/id/${idHive}`)

    console.log(encontraHive)
  })













  //===========================================
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  //==========================================

  socket.on("teste", (texto) => {
    console.log(texto)
  });
});

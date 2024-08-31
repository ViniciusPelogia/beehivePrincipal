import {io} from "./index.js";

io.on("connection", (socket) => {
  console.log("Novo cliente conectado, id: " + socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("texto_editor", (texto) => {
    io.emit("texto_editor_clientes", texto);
  });
});

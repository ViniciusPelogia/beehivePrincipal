import { io } from "./index.js";
import axios from "axios";

// Função para emitir as hives públicas sempre que forem atualizadas
const emitPublicHives = async (token) => {
  try {
    const allHivesResponse = await axios.get("http://localhost:3000/hive/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const publicHives = allHivesResponse.data.filter((hive) => !hive.privada);
    io.emit("updateHives", publicHives);
  } catch (error) {
    console.error("Erro ao emitir hives públicas:", error);
  }
};

io.on("connection", (socket) => {
  console.log("Novo cliente conectado, id: " + socket.id);
  //===========================================
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  //==========================================

  socket.on("teste", (texto) => {
    console.log(texto);
  });

  socket.on("joinHive", (hiveId) => {
    socket.join(hiveId);
    console.log("==================================================")
    console.log(`Cliente ${socket.id} entrou na hive ${hiveId}`);
    console.log("==================================================")
  });

  socket.on("leaveHive", (hiveId) => {
    socket.leave(hiveId);
    console.log("==================================================")
    console.log(`Cliente ${socket.id} saiu da hive ${hiveId}`);
    console.log("==================================================")

  });

  socket.on("message", (data) => {
    const { hiveId, message } = data;
    io.to(hiveId).emit("message", message);
    console.log(`Mensagem na hive ${hiveId}: ${message}`);
  });

  socket.on("updateHives", () => {
    emitPublicHives();
  });
});

export { emitPublicHives };

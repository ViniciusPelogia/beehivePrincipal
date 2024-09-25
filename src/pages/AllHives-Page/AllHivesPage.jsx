/* eslint-disable no-unused-vars */
import "./AllHivesPage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import EnterHiveCode from "./popups/enterHiveCode/EnterHiveCode";
import EnterHive from "./popups/enterHive/EnterHive";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [enterHiveCode, setEnterHiveCode] = useState(false);
  const [enterHive, setEnterHive] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  const [hives, setHives] = useState([]);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Conectado ao servidor, id: " + socket.id);
    });

    socket.on("disconnect", () => {
      console.error("Conexão com o servidor perdida. Tentando reconectar...");
    });

    socket.on("error", (error) => {
      console.error("Erro na conexão WebSocket:", error);
    });

    socket.emit("teste", "isso é um teste");
//=======================================================

const fetchUserHives = async (userId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost:3000/hive/usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("A resposta da API não é um array:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch user hives", error);
    return [];
  }
};

const fetchHives = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const [allHivesResponse, userHives] = await Promise.all([
      axios.get("http://localhost:3000/hive/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetchUserHives(userId),
    ]);

    if (Array.isArray(allHivesResponse.data)) {
      const filteredHives = allHivesResponse.data.filter(
        (hive) => !userHives.some((userHive) => userHive.id === hive.id)
      );
      setHives(filteredHives);
    } else {
      console.error("A resposta da API não é um array:", allHivesResponse.data);
    }
  } catch (error) {
    console.error("Failed to fetch hives", error);
  }
};
const fetchUserImage = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // Obtém o token do localStorage
    const userId = localStorage.getItem("userId")
    const userResponse = await axios.get(
      `http://localhost:3000/usuarios/id/${userId}`, // Usa o userId da prop
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token de autorização
        },
      }
    );
    setUserImage(userResponse.data.imagem); // Armazena a URL da imagem no estado
  } catch (error) {
    console.error("Failed to fetch user image", error);
  }
};

    fetchHives();
    fetchUserImage();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEnterHive = async (hive) => {
    if (!hive) {
      console.error("Hive is null or undefined");
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    const usuario_id = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:3000/usuarios/entrarEmHive', {
        usuario_id: usuario_id,
        hive_id: hive.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Usuário entrou na hive:', response.data);
      navigate(`/hive/${hive.id}`);
    } catch (error) {
      console.error('Erro ao entrar na hive:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <main id="AllHivesPage" className="page_layout">
      <Sidebar />
      <section className="header">
        <div className="header_btn_container">
          <Link to="/createhive" className="header_btn f_s">
            Create Hive
          </Link>
          <button
            className="header_btn f_s"
            onClick={() => setEnterHiveCode(true)}
          >
            Enter code
          </button>
        </div>
        <div className="header_image_container">
          <img
           src={userImage} // Usa a imagem do usuário ou uma imagem padrão
           alt="Beehive user"
           className="header_image"
          />
        </div>
      </section>
      <section className="your_hives">
        <h2 className="title">Todas as Hives</h2>
        <article className="hives_container">
          {Array.isArray(hives) &&
            hives
              .filter((hive) => !hive.privada)
              .map((hive) => (
                <div
                  key={hive.id}
                  className="hive"
                  onClick={() => {
                    if (hive) {
                      setSelectedHive(hive);
                      setEnterHive(true);
                    } else {
                      console.error("Hive is null or undefined");
                    }
                  }}
                >
                  <img
                    src={hive.imagem}
                    alt={hive.nome}
                    className="hive_image"
                  />
                  <p>{hive.nome}</p>
                </div>
              ))}
        </article>
      </section>

      {enterHiveCode && (
        <EnterHiveCode onCancel={() => setEnterHiveCode(false)} />
      )}

      {enterHive && (
        <EnterHive
          hive={selectedHive}
          onCancel={() => setEnterHive(false)}
          onEnter={handleEnterHive}
        />
      )}
    </main>
  );
}

export default Home;

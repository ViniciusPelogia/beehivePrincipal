/* eslint-disable react/prop-types */
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import EnterHiveCode from "./popups/enterHiveCode/EnterHiveCode";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

function Home({ userId }) {
  const [enterHiveCode, setEnterHiveCode] = useState(false);
  const [hives, setHives] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Conectado ao servidor, id: " + socket.id);
    });

    socket.on("disconnect", () => {
      console.error("Conexão com o servidor perdida.");
    });

    socket.on("error", (error) => {
      console.error("Erro na conexão WebSocket:", error);
    });

    socket.on("updateHives", (updatedHives) => {
      setHives(updatedHives);
    });

    const fetchHives = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:3000/hive/usuario/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setHives(response.data);
        } else {
          console.error("A resposta da API não é um array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch hives", error);
      }
    };

    const fetchUserImage = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userResponse = await axios.get(
          `http://localhost:3000/usuarios/id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserImage(userResponse.data.imagem);
      } catch (error) {
        console.error("Failed to fetch user image", error);
      }
    };

    if (userId) {
      fetchHives();
      fetchUserImage();
    }

    return () => {
      socket.disconnect();
    };
  }, [userId]);
  return (
    <div
      className={`page_layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} />

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Open"}
      </button>

      <main id="home">
        <header className="header">
          <div className="header_btn_container">
            <Link to="/createhive" className="header_btn f_s">
              Criar Hive
            </Link>
            <button
              className="header_btn f_s"
              onClick={() => setEnterHiveCode(true)}
            >
              Entrar com código
            </button>
          </div>
          <div className="header_image_container">
            <img src={userImage} alt="Beehive user" className="header_image" />
          </div>
        </header>

        <section className="your_hives">
          <h2>Suas Hives</h2>
          <article className="hives_container">
            {hives.map((hive) => (
              <Link to={`/hive/${hive.id}`} key={hive.id} className="hive">
                <img src={hive.imagem} alt={hive.nome} className="hive_image" />
                <p>{hive.nome}</p>
              </Link>
            ))}
          </article>
        </section>

        {enterHiveCode && (
          <EnterHiveCode onCancel={() => setEnterHiveCode(false)} />
        )}
      </main>
    </div>
  );
}

export default Home;

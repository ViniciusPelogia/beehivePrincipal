/* eslint-disable no-unused-vars */
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import EnterHiveCode from "./popups/enterHiveCode/EnterHiveCode";
import { Link } from "react-router-dom";
import React, { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";

import hives_list from "../../data/hives";

function Home() {
  const [enterHiveCode, setEnterHiveCode] = useState(false);
  const [hives, setHives] = useState([]);
  //messages, setMessages
  useEffect(() => {
    const socket = io.connect("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Conectado ao servidor, id: " + socket.id);
    });

    // socket.on('message', (message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    socket.on("disconnect", () => {
      console.error("Conexão com o servidor perdida. Tentando reconectar...");
      // Implementar lógica de reconexão aqui
    });

    socket.on("error", (error) => {
      console.error("Erro na conexão WebSocket:", error);
    });

    //===================================
    socket.emit("teste", "isso é um teste");

    const fetchHives = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Obtenha o token do localStorage
        const response = await axios.get('/hive', {
          headers: {
            Authorization: `Bearer ${token}` // Adicione o cabeçalho de autorização
          }
        });
        console.log(response.data); // Log da resposta para verificar o formato
        if (Array.isArray(response.data)) {
          setHives(response.data);
        } else {
          console.error('A resposta da API não é um array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch hives', error);
      }
    };

    fetchHives();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main id="home" className="page_layout">
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
            src="/icons/user.png"
            alt="Beehive user"
            className="header_image"
          />
        </div>
      </section>
      {/* AQUI COMEÇA AS SUAS HIVES */}
      <section className="your_hives">
        <h2 className="title">Your Hives</h2>
        <article className="hives_container">
          {hives_list.map((hive) => (
            <Link to="/hive" key={hive.name} className="hive">
              <img src={hive.image} alt={hive.name} className="hive_image" />
              <p>{hive.name}</p>
            </Link>
          ))}
        </article>
      </section>
      {/* AQUI ACABA SUAS HIVES */}
      <section className="your_hives">
        <h2 className="title">Todas as Hives</h2>
        <article className="hives_container">
          {Array.isArray(hives) && hives.map((hive) => (
            <div key={hive.name} className="hive">
              <img src={hive.image} alt={hive.name} className="hive_image" />
              <p>{hive.name}</p>
            </div>
          ))}
        </article>
      </section>
      {enterHiveCode && (
        <EnterHiveCode onCancel={() => setEnterHiveCode(false)} />
      )}
    </main>
  );
}

export default Home;

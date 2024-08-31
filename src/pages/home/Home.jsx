/* eslint-disable no-unused-vars */
import './Home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import EnterHiveCode from './popups/enterHiveCode/EnterHiveCode';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import io from 'socket.io-client';

import hives_list from '../../data/hives';

function Home() {
  const [enterHiveCode, setEnterHiveCode] = useState(false);
  //messages, setMessages
  useEffect(() => {
    const socket = io.connect('http://localhost:3000');
  
    socket.on('connect', () => {
      console.log('Conectado ao servidor, id: ' + socket.id);
    });
  
    // socket.on('message', (message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });
  
    socket.on('disconnect', () => {
      console.error('Conexão com o servidor perdida. Tentando reconectar...');
      // Implementar lógica de reconexão aqui
    });
  
    socket.on('error', (error) => {
      console.error('Erro na conexão WebSocket:', error);
    });


    //===================================
  
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
      <section className="your_hives">
        <h2 className="title">Discovery</h2>
        <article className="hives_container">
          {hives_list.map((hive) => (
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

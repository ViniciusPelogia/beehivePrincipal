import './Home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import EnterHiveCode from './popups/enterHiveCode/EnterHiveCode';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import io from 'socket.io-client';

import hives_list from '../../data/hives';

function Home() {
  const [enterHiveCode, setEnterHiveCode, messages, setMessages] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5137');

    socket.on('connect', () => {
      console.log('Conectado ao servidor');
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

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

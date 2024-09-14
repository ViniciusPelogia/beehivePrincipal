/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Hive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { IoMdShare } from "react-icons/io";
import Docs from "./components/docs/Docs";
import Midia from "./components/midia/Midia";
import Saves from "./components/saves/Saves";
import NewPost from "./popup/newPost/NewPost";
import PostContent from "./popup/postContent/PostContent";

function Hive() {
  const { id } = useParams();
  const [hive, setHive] = useState(null);
  const [options, setOptions] = useState("midia");
  const [newPostPopup, setNewPostPopup] = useState(false);
  const [postContentPopup, setPostContentPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Obtenha o token do localStorage
    console.log("Token no Hive:", token); // Verifique se o token está presente
    if (!token) {
      console.error("Access token não informado");
      return;
    }
    const fetchHive = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/hive/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHive(response.data);
      } catch (error) {
        console.error("Failed to fetch hive", error);
      }
    };

    fetchHive();
  }, [id]);

  const renderComponent = () => {
    switch (options) {
      case "midia":
        return <Midia setPostContentPopup={setPostContentPopup} />;
      case "docs":
        return <Docs />;
      case "saves":
        return <Saves />;
      default:
        return <Midia />;
    }
  };

   if (!hive) {
    return <div>Loading...</div>;
  }

  return (
    <main id="hive" className="page_layout">
      <Sidebar />
      <section className="header_container">
        <article className="header_top">
          <div className="header_btn_container">
            <button className="header_btn">
              Share
              <IoMdShare />
            </button>
          </div>
          <div className="header_image_container">
            <h1>{hive.nome}</h1>
            <img src={hive.imagem} alt={hive.nome} className="header_image" />
          </div>
        </article>
        <article className="header_bottom">
          <div className="header_bottom__links">
            <button
              className={`hive_header_btn ${
                options === "midia" ? "hive_header_btn--active" : ""
              }`}
              onClick={() => setOptions("midia")}
            >
              Midia
            </button>
            <button
              className={`hive_header_btn ${
                options === "docs" ? "hive_header_btn--active" : ""
              }`}
              onClick={() => setOptions("docs")}
            >
              Docs
            </button>
            <button
              className={`hive_header_btn ${
                options === "saves" ? "hive_header_btn--active" : ""
              }`}
              onClick={() => setOptions("saves")}
            >
              Saves
            </button>
          </div>
          <button id="new_post_btn" onClick={() => setNewPostPopup(true)}>
            New post
          </button>
          {newPostPopup && <NewPost onCancel={() => setNewPostPopup(false)} />}
          {postContentPopup && (
            <PostContent onCancel={() => setPostContentPopup(false)} />
          )}
        </article>
      </section>
      <section className="hive_data_container">{renderComponent()}</section>
    </main>
  );
}

export default Hive;

import { useState, useEffect } from "react";
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
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState("midia");
  const [newPostPopup, setNewPostPopup] = useState(false);
  const [postContentPopup, setPostContentPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
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

    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/hive/imagens/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(response.data);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchHive();
    fetchImages();
  }, [id]);

  const handleShareClick = () => {
    const token = localStorage.getItem('accessToken');
    axios.get(`http://localhost:3000/hives/${id}/access-code`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const codigoAcesso = response.data;
      navigator.clipboard.writeText(codigoAcesso)
        .then(() => {
          alert("Código de Acesso copiado para a área de transferência!");
        })
        .catch(err => {
          alert("Falha ao copiar para a área de transferência.");
          console.error("Erro ao copiar código de acesso:", err);
        });
    })
    .catch(error => {
      alert("Erro ao buscar o código de acesso.");
      console.error("Error fetching access code:", error);
    })
  };
  
  const renderComponent = () => {
    switch (options) {
      case "midia":
        return <Midia setPostContentPopup={setPostContentPopup} images={images} setSelectedImage={setSelectedImage} />;
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
            <button className="header_btn" onClick={handleShareClick}>
              Share
              <IoMdShare />
            </button>
          </div>
          <div className="header_image_container">
            <h1>{hive.nome}</h1>
            <img src={'../'+hive.imagem} className="header_image" />
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
          {newPostPopup && <NewPost onCancel={() => setNewPostPopup(false)} id={id} />}
          {postContentPopup && (
            <PostContent onCancel={() => setPostContentPopup(false)} selectedImage={selectedImage} />
          )}
        </article>
      </section>
      <section className="hive_data_container">{renderComponent()}</section>
    </main>
  );
}

export default Hive;

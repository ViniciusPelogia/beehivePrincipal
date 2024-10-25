/* eslint-disable no-undef */
import "./NewPost.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function NewPost({ onCancel, id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hiveImageUrl, setHiveImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token não informado");
      return;
    }

    const formData = new FormData();
    formData.append("nome", title);
    formData.append("descricao", description);
    formData.append("file", file);
    formData.append("usuario_id", usuarioId);

    try {
      const response = await axios.post(`http://localhost:3000/hive/imagem/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const newPost = response.data;

      // Emitir evento de novo post
      const socket = io("http://localhost:3000");
      socket.emit("newPost", id, newPost);
      console.log("Novo post enviado:", newPost);
  
      onCancel(); // Fechar o popup após o envio bem-sucedido
    } catch (error) {
      console.error("Failed to create new post", error.message);
    }
    
    window.alert("Post criado com sucesso");
    // window.location.reload(); // Recarregar a página inteira
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setHiveImageUrl(URL.createObjectURL(file));
    } else {
      setFile(null);
      setHiveImageUrl("");
    }
  };

  return (
    <div id="new_post">
      <div className="new_post__popup">
        <form className="popup_form" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form__second_inputs_container">
            <div className="form__description_container">
              <label>Description</label>
              <textarea
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form__image_container">
              <label className="form__image_top_label">Image</label>
              <div className="form__image">
                {hiveImageUrl && <img src={hiveImageUrl} alt="Hive" />}
              </div>
              <div className="form__image_button_container">
                <input
                  type="file"
                  id="form__input_image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <label
                  htmlFor="form__input_image"
                  className="form__input_label"
                >
                  Add Image
                </label>
              </div>
            </div>
          </div>
          <div className="buttons_container">
            <button type="button" className="cancel_button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="enter_button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewPost.propTypes = {
  onCancel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default NewPost;

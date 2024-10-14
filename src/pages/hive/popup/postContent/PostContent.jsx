/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import "./PostContent.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GoComment, GoHeart, GoTrash } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";

import Comments from "./components/Comments";

function PostContent({ onCancel, selectedImage }) {
  const { id: hiveId } = useParams(); // Obter hive_id da URL
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLikes = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token não informado");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/post/curtir/${selectedImage.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetch Likes Response:", response.data); // Log para verificar a resposta
      setLikes(response.data); // Supondo que o endpoint retorna o número de curtidas
      setLiked(response.data); // Supondo que o endpoint informa se o usuário já curtiu
    } catch (error) {
      console.error("Failed to fetch likes", error);
    }
  };

  useEffect(() => {
    fetchLikes(); // Fazer a requisição GET ao montar o componente
  }, [selectedImage.id]);

  const likePost = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!token || !userId || !hiveId) {
      console.error("Dados não informados corretamente");
      return;
    }
    try {
      await axios.post(
        `http://localhost:3000/post/curtir/${selectedImage.id}`,
        {
          usuario_id: userId,
          hive_id: hiveId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(!liked); // Alterna o estado do coração
      fetchLikes(); // Atualizar a contagem de curtidas após a requisição POST
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  const handleDeletPost = async (selectedImage) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.delete(
        `http://localhost:3000/hive/imagens/${selectedImage.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            usuario: userId,
          },
        }
      );
      console.log("Delete Response:", response.data); // Log para verificar a resposta
      if (response.data.message === "Post excluido com sucesso") {
        window.alert("Post excluído com sucesso");
        window.location.reload(); // Recarregar a página inteira
      } else {
        throw new Error("Falha ao excluir o comentário");
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message; // Capturar a mensagem de erro personalizada
      console.log("Error Message:", errorMessage); // Log para verificar a mensagem de erro
      setErrorMessage(errorMessage); // Definir mensagem de erro personalizada
    }
  };

  return (
    <div id="post_content">
      <div className="post_content__popup">
        <h2 className="right_section__title">{selectedImage.nome}</h2>
        {errorMessage && <p className="error_message"> {errorMessage}</p>}
        <button onClick={onCancel} className="popup__close_btn">
          <AiOutlineClose />
        </button>
        <div className="popup__left_section">
          <img
            src={"../" + selectedImage.caminho}
            alt={selectedImage.descricao}
            className="left_section__image"
          />
          <div className="left_section__buttons_container">
            <GoHeart onClick={likePost} className={liked ? "red-heart" : ""} />
            <span>{likes}</span>
            <span></span>
            <span></span>
            <span></span>
            <GoComment
              onClick={() => {
                console.log(
                  "Comment button clicked, postId:",
                  selectedImage.id
                );
                setShowComments(!showComments);
              }}
            />
            <span></span>
            <span></span>
            <span></span>
            <GoTrash onClick={() => handleDeletPost(selectedImage)} className="trash"/>
          </div>
        </div>
        <div className="popup__right_section">
          {showComments ? (
            <Comments postId={selectedImage.id} />
          ) : (
            <>
              <p className="right_section__description">
                {selectedImage.descricao}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

PostContent.propTypes = {
  onCancel: PropTypes.func.isRequired,
  selectedImage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caminho: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostContent;

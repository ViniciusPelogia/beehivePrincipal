import "./Comments.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GoTrash, GoStop } from "react-icons/go";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

function Comments({ postId }) {
  const { id: hiveId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:3000/post/comentar/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
    const socket = io("http://localhost:3000");
    socket.emit("joinPost", postId);
    console.log(`Entrou na sala do post ${postId}`);

    socket.on("newComment", (comment) => {
      console.log("Recebeu novo comentário:", comment);
      setComments((prevComments) => [...prevComments, comment]);
    });

    socket.on("deleteComment", (commentId) => {
      console.log("Recebeu evento deleteComment:", commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    });

    return () => {
      socket.emit("leavePost", postId);
      socket.disconnect();
    };
  }, [postId]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const userImage = localStorage.getItem("userImage");

    if (!token || !userId) {
      setErrorMessage("Dados não informados corretamente");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/post/comentar/${postId}`,
        { comentario: newComment, usuario_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentData = {
        ...response.data,
        usuario: {
          id: userId,
          username: username || "Usuário desconhecido",
          imagem: userImage || "",
        },
      };

      const socket = io("http://localhost:3000");
      socket.emit("newComment", postId, newCommentData);
      console.log("Novo comentário enviado:", newCommentData);
      setNewComment(""); // Limpar o campo de comentário após o envio
    } catch (error) {
      setErrorMessage(error.message); // Definir mensagem de erro personalizada
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.delete(
        `http://localhost:3000/post/comentar/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { usuario: userId, hive: hiveId },
        }
      );

      if (response.data.message === "comentario excluido com sucesso") {
        const socket = io("http://localhost:3000");
        socket.emit("deleteComment", postId, commentId);
        console.log(`Comentário ${commentId} excluído no post ${postId}`);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        window.alert("Comentário excluído com sucesso");
      } else {
        throw new Error("Falha ao excluir o comentário");
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      const errorMessage = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setErrorMessage(errorMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  const toggleExpandComment = (index) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="comments_section">
      <div className="comments_list">
        {errorMessage && (
          <p className="error_message">
            <GoStop /> {errorMessage}
          </p>
        )}
        {comments.length === 0 ? (
          <p className="no_comments">Nenhum comentário ainda.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment__avatar">
                {comment.usuario && comment.usuario.imagem ? (
                  <img
                    src={"../" + comment.usuario.imagem}
                    alt={comment.usuario.username}
                  />
                ) : (
                  <div className="placeholder-avatar"></div>
                )}
              </div>
              <div className="comment__content">
                <div className="comment__header">
                  <span className="comment__username">
                    {comment.usuario
                      ? comment.usuario.username
                      : "Usuário desconhecido"}
                  </span>
                </div>
                <span className="comment__text">
                  {expandedComments[index]
                    ? comment.comentario
                    : comment.comentario && comment.comentario.length > 30
                    ? `${comment.comentario.substring(0, 30)}...`
                    : comment.comentario}
                  {comment.comentario && comment.comentario.length > 30 && (
                    <button
                      className="read-more-button"
                      onClick={() => toggleExpandComment(index)}
                    >
                      {expandedComments[index] ? "Mostrar menos" : "Mostrar mais"}
                    </button>
                  )}
                </span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="delete-button"
                >
                  <GoTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="comments_section__input">
        <input
          type="text"
          placeholder="Adicione um comentário..."
          value={newComment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={handleCommentSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Comments;

import "./Comments.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { GoTrash, GoStop } from "react-icons/go";
import axios from "axios";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedComments, setExpandedComments] = useState({}); // Estado para controlar quais comentários estão expandidos

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:3000/post/comentar/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      setErrorMessage("Dados não informados corretamente");
      return;
    }
    try {
      await axios.post(
        `http://localhost:3000/post/comentar/${postId}`,
        {
          comentario: newComment,
          usuario_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment(""); // Limpar o campo de comentário após o envio
      window.alert("Comentário enviado com sucesso");
      window.location.reload(); // Recarregar a página inteira
    } catch (error) {
      setErrorMessage(error.message); // Definir mensagem de erro personalizada
    }
  };
  // const fetchComments = async () => {
  //   const token = localStorage.getItem('accessToken');
  //   try {
  //     const response = await axios.get(`http://localhost:3000/post/comentar/${postId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch comments:", error);
  //   }
  // };
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.delete(`http://localhost:3000/post/comentar/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                usuario: userId,
            },
        });
        console.log('Delete Response:', response.data); // Log para verificar a resposta
        if (response.data.message === "comentario excluido com sucesso") {
            window.alert('Comentário excluído com sucesso');
            window.location.reload(); // Recarregar a página inteira
        } else {
            throw new Error("Falha ao excluir o comentário");
        }
    } catch (error) {
        console.error("Failed to delete comment:", error);
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message; // Capturar a mensagem de erro personalizada
        console.log('Error Message:', errorMessage); // Log para verificar a mensagem de erro
        setErrorMessage(errorMessage); // Definir mensagem de erro personalizada
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
      {errorMessage && <p className="error_message"> <GoStop /> {errorMessage}</p>}
      {comments.map((comment, index) => (
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
      ))}
      <div className="comments_section__input">
        <input
          type="text"
          placeholder="Adicione um comentário..."
          value={newComment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Adicionando o event listener aqui
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

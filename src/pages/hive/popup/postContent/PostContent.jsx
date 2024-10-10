import './PostContent.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoComment, GoHeart } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Comments from './components/Comments';

function PostContent({ onCancel, selectedImage }) {
  const { id: hiveId } = useParams(); // Obter hive_id da URL
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchLikes = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("Access token não informado");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/post/curtir/${selectedImage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetch Likes Response:', response.data); // Log para verificar a resposta
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
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (!token || !userId || !hiveId) {
      console.error("Dados não informados corretamente");
      return;
    }
    try {
      await axios.post(`http://localhost:3000/post/curtir/${selectedImage.id}`, {
        usuario_id: userId,
        hive_id: hiveId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLiked(!liked); // Alterna o estado do coração
      fetchLikes(); // Atualizar a contagem de curtidas após a requisição POST
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  return (
    <div id="post_content">
      <div className="post_content__popup">
        <button onClick={onCancel} className="popup__close_btn">
          <AiOutlineClose />
        </button>
        <div className="popup__left_section">
          <img
            src={'../'+selectedImage.caminho}
            alt={selectedImage.descricao}
            className="left_section__image"
          />
          <div className="left_section__buttons_container">
            <GoHeart onClick={likePost} className={liked ? 'red-heart' : ''} />
            <span>{likes}</span>
            <span></span>
            <span></span>
            <span></span>
            <GoComment onClick={() => setShowComments(!showComments)} />
          </div>
        </div>
        <div className="popup__right_section">
          {showComments ? (
            <Comments />
          ) : (
            <>
              <h2 className="right_section__title">{selectedImage.descricao}</h2>
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

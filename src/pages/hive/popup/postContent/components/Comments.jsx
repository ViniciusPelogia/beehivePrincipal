import './Comments.scss';
import PropTypes from 'prop-types';

function Comments() {
  const exampleComment = {
    username: "joao_silva",
    text: "Isso é um comentário de exemplo!",
    avatar: "path/to/avatar.jpg"
  };

  return (
    <div className="comments_section">
      <div className="comment">
        <div className="comment__avatar">
          <img src={exampleComment.avatar} alt='' />
        </div>
        <div className="comment__content">
          <span className="comment__username">{exampleComment.username}</span>
          <span className="comment__text">{exampleComment.text}</span>
        </div>
      </div>
      <div className="comments_section__input">
        <input type="text" placeholder="Adicione um comentário..." />
        <button type="submit">Enviar</button>
      </div>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default Comments;

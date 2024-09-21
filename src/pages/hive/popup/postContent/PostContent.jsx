import './PostContent.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { GoDownload } from 'react-icons/go';
// import { GoShareAndroid } from 'react-icons/go';
import { GoComment } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';

import Comments from './components/Comments';

function PostContent({ onCancel, selectedImage }) {
  const [showComments, setShowComments] = useState(false);

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
            <GoHeart />
            <GoComment onClick={() => setShowComments(!showComments)} />
            {/* <GoShareAndroid />
            <GoDownload /> */}
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

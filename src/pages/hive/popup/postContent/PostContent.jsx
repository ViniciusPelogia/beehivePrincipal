import './PostContent.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { GoDownload } from 'react-icons/go';
import { GoShareAndroid } from 'react-icons/go';
import { GoComment } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';

import hives_content_list from '../../../../data/hives_content';
import Comments from './components/Comments';

function PostContent({ onCancel }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div id="post_content">
      <div className="post_content__popup">
        <button onClick={onCancel} className="popup__close_btn">
          <AiOutlineClose />
        </button>
        <div className="popup__left_section">
          <img
            src={hives_content_list[0].image}
            alt="title"
            className="left_section__image"
          />
          <div className="left_section__buttons_container">
            <GoHeart />
            <GoComment onClick={() => setShowComments(!showComments)} />
            <GoShareAndroid />
            <GoDownload />
          </div>
        </div>
        <div className="popup__right_section">
          {showComments ? (
            <Comments />
          ) : (
            <>
              <h2 className="right_section__title">Cabaço</h2>
              <p className="right_section__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum deserunt dolor deleniti velit nihil enim incidunt,
                dolores ipsum doloremque suscipit hic, quasi sed rerum possimus
                molestiae excepturi, iste libero illum.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

PostContent.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default PostContent;

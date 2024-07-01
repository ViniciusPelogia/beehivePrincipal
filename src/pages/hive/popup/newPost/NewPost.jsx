import './NewPost.scss';
import PropTypes from 'prop-types';

function NewPost({ onCancel }) {
  return (
    <div id="new_post">
      <div className="new_post__popup">
        <form className="popup_form">
          <div>
            <label>Title</label>
            <input type="text" />
          </div>
          <div className="form__second_inputs_container">
            <div className="form__description_container">
              <label>Description</label>
              <textarea cols="30" rows="10"></textarea>
            </div>
            <div className="form__image_container">
              <label className="form__image_top_label">Image</label>
              <div className="form__image"></div>
              <div className="form__image_button_container">
                <input type="file" id="form__input_image" accept="image/*" />
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
            <button className="cancel_button" onClick={onCancel}>
              Cancel
            </button>
            <button className="enter_button">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewPost.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default NewPost;

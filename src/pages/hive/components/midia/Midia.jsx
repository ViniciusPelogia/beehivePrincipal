import './Midia.scss';
import PropTypes from 'prop-types';

function Midia({ setPostContentPopup, images, setSelectedImage }) {
  return (
    <>
      {images.map((image) => (
        <div
          key={image.id}
          className="hive_content_container"
          onClick={() => {
            setSelectedImage(image);
            setPostContentPopup(true);
          }}
        >
          <img src={'../'+image.caminho} className="image" />
          <p>{image.nome}</p>
        </div>
      ))}
    </>
  );
}

Midia.propTypes = {
  setPostContentPopup: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};

export default Midia;

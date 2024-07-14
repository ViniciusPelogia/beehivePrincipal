import './Midia.scss';
import PropTypes from 'prop-types';

import hives_content_list from '../../../../data/hives_content';

function Midia({ setPostContentPopup }) {
  return (
    <>
      {hives_content_list.map((hive) => (
        <div
          key={hive.username}
          className="hive_content_container"
          onClick={setPostContentPopup}
        >
          <img src={hive.image} alt={hive.username} className="image" />
          <p>{hive.username}</p>
        </div>
      ))}
    </>
  );
}

Midia.propTypes = {
  setPostContentPopup: PropTypes.func.isRequired
};

export default Midia;

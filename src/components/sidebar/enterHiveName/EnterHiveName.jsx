import PropTypes from 'prop-types';
import './EnterHiveName.scss';

function EnterHiveName({ onCancel }) {
  return (
    <section id="enter_name_container">
      <article className="enter_name_popup">
        <input
          type="text"
          className="name_input"
          placeholder="Search for the Hive name..."
        />
        <div className="buttons_container">
          <button className="cancel_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="enter_button">Search</button>
        </div>
      </article>
    </section>
  );
}

EnterHiveName.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default EnterHiveName;

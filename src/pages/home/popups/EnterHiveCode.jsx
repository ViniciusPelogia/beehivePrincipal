import PropTypes from 'prop-types';
import './EnterHiveCode.scss';

function EnterHiveCode({ onCancel }) {
  return (
    <section id="enter_code_container">
      <article className="enter_code_popup">
        <input
          type="text"
          className="code_input"
          placeholder="Enter the Hive code..."
        />
        <div className="buttons_container">
          <button className="cancel_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="enter_button">Enter</button>
        </div>
      </article>
    </section>
  );
}

EnterHiveCode.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default EnterHiveCode;

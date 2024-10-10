import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EnterHiveCode.scss";

function EnterHiveCode({ onCancel }) {
  const [codigo, setCodigo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEnter = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `http://localhost:3000/usuarios/entrarComCodigo/${codigo}`,
        { usuario_id: userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const hiveId = response.data.hiveId;
      navigate(`/hive/${hiveId}`);
    } catch (error) {
      setErrorMessage(error.response.data.message || "Erro ao entrar na hive");
    }
  };

  return (
    <section id="enter_code_container">
      <article className="enter_code_popup">
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <input
          type="text"
          className="code_input"
          placeholder="Enter the Hive code..."
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <div className="buttons_container">
          <button className="cancel_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="enter_button" onClick={handleEnter}>
            Enter
          </button>
        </div>
      </article>
    </section>
  );
}

EnterHiveCode.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default EnterHiveCode;

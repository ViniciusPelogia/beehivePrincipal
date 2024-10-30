import PropTypes from "prop-types";
import "./EnterHiveName.scss";
import axios from "axios";
import { useState } from "react";
import EnterHive from "../../../pages/AllHives-Page/popups/enterHive/EnterHive"; 
import { useNavigate } from 'react-router-dom';

function EnterHiveName({ onCancel }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHive, setSelectedHive] = useState(null); // Estado para armazenar a hive selecionada
  const [enterHive, setEnterHive] = useState(false); // Estado para abrir o popup EnterHive
  const navigate = useNavigate();

  const fetchHivesByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:3000/hive/nome/${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch hives by name", error);
    }
  };

  const handleHiveClick = async (hive) => {
    const token = localStorage.getItem("accessToken");
    const usuario_id = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        "http://localhost:3000/hive/usuario",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: usuario_id,
            hiveId: hive.id,
          },
        }
      );
      if (response.status === 200) {
        navigate(`/hive/${hive.id}`);
      } else {
        setSelectedHive(hive);
        setEnterHive(true);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário na hive", error);
      setSelectedHive(hive);
      setEnterHive(true);
    }
  };

  const handleEnterHive = async (hive) => {
    if (!hive) {
      console.error("Hive is null or undefined");
      return;
    }
    const token = localStorage.getItem("accessToken");
    const usuario_id = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        "http://localhost:3000/usuarios/entrarEmHive",
        {
          usuario_id: usuario_id,
          hive_id: hive.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Usuário entrou na hive:", response.data);
      navigate(`/hive/${hive.id}`);
    } catch (error) {
      console.error(
        "Erro ao entrar na hive:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section id="enter_name_container">
      <article className="enter_name_popup">
        <input
          type="text"
          className="name_input"
          placeholder="Search for the Hive name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="buttons_container">
          <button className="cancel_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="enter_button" onClick={fetchHivesByName}>
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <ul className="search_results">
            {searchResults.map((hive) => (
              <li key={hive.id} onClick={() => handleHiveClick(hive)}>
                <img src={hive.imagem} alt="" />
                <p>{hive.nome}</p>
              </li>
            ))}
          </ul>
        )}
      </article>
      {enterHive && (
        <EnterHive
          hive={selectedHive}
          onCancel={() => setEnterHive(false)}
          onEnter={handleEnterHive}
        />
      )}
    </section>
  );
}

EnterHiveName.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default EnterHiveName;

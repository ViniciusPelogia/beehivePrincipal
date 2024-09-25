import PropTypes from "prop-types";
import "./EnterHiveName.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState } from "react";

function EnterHiveName({ onCancel }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
              <Link to={`/hive/${hive.id}`} key={hive.id}>
              <img src={hive.imagem} alt="" />
              <p>{hive.nome}</p>
            </Link>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}

EnterHiveName.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default EnterHiveName;

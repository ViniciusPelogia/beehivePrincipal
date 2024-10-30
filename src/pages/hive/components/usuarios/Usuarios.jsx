import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoBlocked } from "react-icons/go";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import './Usuarios.scss';

function Usuarios({ usuarios }) {
  const { id: hiveId } = useParams();
  const userId = localStorage.getItem('userId');
  const [descricao, setDescricao] = useState('');
  const [isDescricaoOpen, setIsDescricaoOpen] = useState(false);
  const [isUsuariosOpen, setIsUsuariosOpen] = useState(false);

  useEffect(() => {
    async function fetchDescricao() {
      try {
        const response = await axios.get(`http://localhost:3000/hive/id/${hiveId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setDescricao(response.data.descricao);
      } catch (error) {
        console.error("Erro ao buscar descrição:", error);
      }
    }
    fetchDescricao();
  }, [hiveId]);

  const handleDeleteClick = async (usuarioId) => {
    try {
      await axios.delete(`http://localhost:3000/hive/usuario/${usuarioId}`, {
        data: {
          usuario: userId,
          hive: hiveId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      alert("Usuário expulso com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao expulsar usuário:", error);
      const errorMessage = error.response?.data?.message || "Erro ao expulsar usuário.";
      document.getElementById(`error-${usuarioId}`).innerText = errorMessage;
    }
  };

  return (
    <div className="usuarios">
      <div className="accordion">
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => setIsDescricaoOpen(!isDescricaoOpen)}>
            Descrição {isDescricaoOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isDescricaoOpen && <div className="accordion-content"><p>{descricao}</p></div>}
        </div>
        <div className="accordion-item">
          <button className="accordion-button" onClick={() => setIsUsuariosOpen(!isUsuariosOpen)}>
            Usuários {isUsuariosOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isUsuariosOpen && (
            <div className="accordion-content accordion-content--usuarios">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="usuario">
                  <img src={"../../../" + usuario.imagem} alt={usuario.nome} className="usuario__imagem" />
                  <p className="usuario__nome">{usuario.username}</p>
                  <GoBlocked className="usuario__icon" onClick={() => handleDeleteClick(usuario.id)} />
                  <p id={`error-${usuario.id}`} className="error-message"></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Usuarios;

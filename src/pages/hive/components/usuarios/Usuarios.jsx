/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"; // Adicione isso para usar os parâmetros da URL
import { GoBlocked } from "react-icons/go";
import axios from "axios";
import './Usuarios.scss';

function Usuarios({ usuarios }) {
  const { id: hiveId } = useParams(); // Use isso para obter o parâmetro da URL
  const userId = localStorage.getItem('userId');

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
      window.location.reload()
    } catch (error) {
      console.error("Erro ao expulsar usuário:", error);
      const errorMessage = error.response?.data?.message || "Erro ao expulsar usuário.";
      document.getElementById(`error-${usuarioId}`).innerText = errorMessage;
    }
  };

  return (
    <div className="usuarios">
      {usuarios.map(usuario => (
        <div key={usuario.id} className="usuario">
          <img src={"../../../"+usuario.imagem} alt={usuario.nome} className="usuario__imagem" />
          <p className="usuario__nome">{usuario.username}</p>
          <GoBlocked className="usuario__icon" onClick={() => handleDeleteClick(usuario.id)} />
          <p id={`error-${usuario.id}`} className="error-message"></p>
        </div>
      ))}
    </div>
  );
}

export default Usuarios;

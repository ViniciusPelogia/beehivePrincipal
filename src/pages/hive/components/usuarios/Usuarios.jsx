/* eslint-disable react/prop-types */
import { GoBlocked } from "react-icons/go"; // Certifique-se de importar o ícone
import './Usuarios.scss';

function Usuarios({ usuarios }) {
  return (
    <div className="usuarios">
      {usuarios.map(usuario => (
        <div key={usuario.id} className="usuario">
          <img src={"../../../"+usuario.imagem} alt={usuario.nome} className="usuario__imagem" />
          <p className="usuario__nome">{usuario.username}</p>
          <GoBlocked className="usuario__icon" /> {/* Ícone adicionado */}
        </div>
      ))}
    </div>
  );
}

export default Usuarios;

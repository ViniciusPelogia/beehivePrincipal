/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import './EnterHive.scss';
import axios from 'axios';

function EnterHive({ hive, onCancel, onEnter }) {
  if (!hive) {
    return <div>Erro: Hive não encontrada.</div>;
  }

  return (
    <section id="enter_hive_container">
      <article className="enter_hive_popup">
        <img src={hive.imagem} alt={hive.nome} className="hive_image" />
        <p className="hive_name">{hive.nome}</p>
        <div className="buttons_container">
          <button className="cancel_button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="enter_button" onClick={() => onEnter(hive)}>
            Entrar
          </button>
        </div>
      </article>
    </section>
  );
}

EnterHive.propTypes = {
  hive: PropTypes.shape({
    imagem: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default EnterHive;

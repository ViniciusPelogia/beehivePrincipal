/* eslint-disable react/prop-types */
import './Sidebar.scss';
import { MdHive } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { GiTreeBeehive } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import EnterHiveName from './enterHiveName/EnterHiveName';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen }) {
  const [enterHiveName, setEnterHiveName] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <nav id="sidebar" className={isOpen ? 'open' : 'closed'}>
      <div>
        <div className="logo_container">
          <img className="logo" src="/icons/logo-yellow.png" alt="Beehive" />
          <h1>Beehive</h1>
        </div>
        <ul>
          <li
            onClick={() => { setEnterHiveName(true); handleItemClick(1); }}
            className={activeItem === 1 ? 'active' : ''}
            title="Pesquisar na colmeia"
          >
            <IoIosSearch />
            <p>Pesquisar</p>
          </li>
          <Link
            to="/home"
            className={`list_item ${activeItem === 2 ? 'active' : ''}`}
            onClick={() => handleItemClick(2)}
            title="Ir para hives"
          >
            <MdHive />
            <p>Hives</p>
          </Link>
          <Link
            to="/hives"
            className={`list_item ${activeItem === 3 ? 'active' : ''}`}
            onClick={() => handleItemClick(3)}
            title="Veja a colmeia"
          >
            <GiTreeBeehive />
            <p>Explorar</p>
          </Link>
        </ul>
      </div>
      <ul className="account-section">
        <Link
          to="/profile"
          className={`list_item ${activeItem === 4 ? 'active' : ''}`}
          onClick={() => handleItemClick(4)}
          title="Perfil da conta"
        >
          <FiUser />
          <p>Conta</p>
        </Link>
      </ul>
      {enterHiveName && (
        <EnterHiveName onCancel={() => setEnterHiveName(false)} />
      )}
    </nav>
  );
}

export default Sidebar;

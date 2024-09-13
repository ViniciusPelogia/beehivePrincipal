import './Sidebar.scss';
import { MdHive } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiTreeBeehive } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import EnterHiveName from './enterHiveName/EnterHiveName';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [enterHiveName, setEnterHiveName] = useState(false);

  return (
    <nav id="sidebar">
      <div>
        <div className="logo_container">
          <img className="logo" src="/icons/logo-yellow.png" alt="Beehive" />
          <h1>Beehive</h1>
        </div>
        <ul>
          <li onClick={() => setEnterHiveName(true)}>
            <IoIosSearch />
            <p>Search</p>
          </li>
          <Link to="/home" className="list_item">
            <MdHive />
            <p>Hives</p>
          </Link>
          <Link to="/hives" className="list_item">
            <GiTreeBeehive />
            <p>Beehive</p>
          </Link>
        </ul>
      </div>
      <ul>
        <Link to="/settings" className="list_item">
          <IoSettingsOutline />
          <p>Settings</p>
        </Link>
        <Link to="/profile" className="list_item">
          <FiUser />
          <p>Account</p>
        </Link>
      </ul>
      {enterHiveName && (
        <EnterHiveName onCancel={() => setEnterHiveName(false)} />
      )}
    </nav>
  );
}

export default Sidebar;

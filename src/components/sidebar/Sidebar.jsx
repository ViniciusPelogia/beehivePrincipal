import './Sidebar.scss';
import { MdHive } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiTreeBeehive } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import EnterHiveName from './enterHiveName/EnterHiveName';

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
          <li>
            <MdHive />
            <p>Hives</p>
          </li>
          <li>
            <GiTreeBeehive />
            <p>Beehive</p>
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <IoSettingsOutline />
          <p>Settings</p>
        </li>
        <li>
          <FiUser />
          <p>Account</p>
        </li>
      </ul>
      {enterHiveName && (
        <EnterHiveName onCancel={() => setEnterHiveName(false)} />
      )}
    </nav>
  );
}

export default Sidebar;

import '../../styles/Sidebar.scss';
import { MdHive } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiTreeBeehive } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi';

function Sidebar() {
  return (
    <nav id="sidebar">
      <div>
        <img className="logo" src="/icons/logo-yellow.png" alt="Beehive" />
        <ul>
          <li>
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
    </nav>
  );
}

export default Sidebar;

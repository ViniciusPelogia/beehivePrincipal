import '../../styles/Sidebar.scss';
import { MdHive } from 'react-icons/md';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import { GiTreeBeehive } from 'react-icons/gi';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

function Sidebar() {
  return (
    <nav id="sidebar">
      <ul>
        <li>
          <img className="logo" src="/icons/logo-black.png" alt="Beehive" />
        </li>
        <li>
          <BiSolidSearchAlt2 />
        </li>
        <li>
          <MdHive />
        </li>
        <li>
          <GiTreeBeehive />
        </li>
      </ul>
      <ul>
        <li>
          <IoSettingsSharp />
        </li>
        <li>
          <FaUser />
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

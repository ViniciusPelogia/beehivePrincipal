import './SettingsSidebar.scss';
import PropTypes from 'prop-types';
import { useRef } from 'react';

function SettingsSidebar({ setOptions }) {
  const notificationsRef = useRef(null);
  const categoriesRef = useRef(null);
  const privacyAndDataRef = useRef(null);
  const permissionsRef = useRef(null);

  const handleItemClick = (option) => {
    setOptions(option);
    switch (option) {
      case 'notifications':
        notificationsRef.current.classList.add('active');
        categoriesRef.current.classList.remove('active');
        permissionsRef.current.classList.remove('active');
        privacyAndDataRef.current.classList.remove('active');
        break;

      case 'categories':
        notificationsRef.current.classList.remove('active');
        categoriesRef.current.classList.add('active');
        permissionsRef.current.classList.remove('active');
        privacyAndDataRef.current.classList.remove('active');
        break;

      case 'permissions':
        notificationsRef.current.classList.remove('active');
        categoriesRef.current.classList.remove('active');
        permissionsRef.current.classList.add('active');
        privacyAndDataRef.current.classList.remove('active');
        break;

      case 'privacyAndData':
        notificationsRef.current.classList.remove('active');
        categoriesRef.current.classList.remove('active');
        permissionsRef.current.classList.remove('active');
        privacyAndDataRef.current.classList.add('active');
        break;
    }
  };

  return (
    <nav id="settings_sidebar">
      <h2 className="title">Create Hive</h2>
      <ul className="list">
        <li
          onClick={() => handleItemClick('notifications')}
          ref={notificationsRef}
          className="active"
        >
          Notifications
        </li>
        <li onClick={() => handleItemClick('categories')} ref={categoriesRef}>
          Categories
        </li>
        <li
          onClick={() => handleItemClick('privacyAndData')}
          ref={privacyAndDataRef}
        >
          Privacy and data
        </li>
        <li onClick={() => handleItemClick('permissions')} ref={permissionsRef}>
          Permissions
        </li>
      </ul>
    </nav>
  );
}

SettingsSidebar.propTypes = {
  setOptions: PropTypes.func.isRequired
};

export default SettingsSidebar;

import './SettingsSidebar.scss';

function SettingsSidebar() {
  return (
    <nav id="settings_sidebar">
      <h2 className="title">Create Hive</h2>
      <ul className="list">
        <li className="active">Notifications</li>
        <li>Categories</li>
        <li>Privacy and data</li>
        <li>Permissions</li>
        <li>About us</li>
      </ul>
    </nav>
  );
}

export default SettingsSidebar;

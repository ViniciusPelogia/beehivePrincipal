import './Settings.scss';
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SettingsSidebar from '../../components/userSettings/sidebar/SettingsSidebar';
import Categories from '../../components/userSettings/categories/Categories';
import Notifications from '../../components/userSettings/notifications/Notifications';
import Permissions from '../../components/userSettings/permissions/Permissions';
import PrivacyAndData from '../../components/userSettings/privacyAndData/PrivacyAndData';

function Settings() {
  const [options, setOptions] = useState('notifications');

  const renderComponent = () => {
    switch (options) {
      case 'notifications':
        return <Notifications />;
      case 'categories':
        return <Categories />;
      case 'permissions':
        return <Permissions />;
      case 'privacyAndData':
        return <PrivacyAndData />;
      default:
        return <Notifications />;
    }
  };

  return (
    <>
      <Sidebar />
      <main id="settings" className="container page_layout">
        <SettingsSidebar setOptions={setOptions} />
        <section className="content_container">{renderComponent()}</section>
      </main>
    </>
  );
}

export default Settings;

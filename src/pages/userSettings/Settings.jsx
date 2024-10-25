import "./Settings.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SettingsSidebar from "../../components/userSettings/sidebar/SettingsSidebar";
import Categories from "../../components/userSettings/categories/Categories";
import Notifications from "../../components/userSettings/notifications/Notifications";
import Permissions from "../../components/userSettings/permissions/Permissions";
import PrivacyAndData from "../../components/userSettings/privacyAndData/PrivacyAndData";

function Settings() {
  const [options, setOptions] = useState("notifications");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderComponent = () => {
    switch (options) {
      case "notifications":
        return <Notifications />;
      case "categories":
        return <Categories />;
      case "permissions":
        return <Permissions />;
      case "privacyAndData":
        return <PrivacyAndData />;
      default:
        return <Notifications />;
    }
  };

  return (
    <>
      <div
        className={`page_layout ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      ></div>
      <Sidebar isOpen={isSidebarOpen} />
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      <main id="settings">
        <SettingsSidebar setOptions={setOptions} />
        <section className="content_container">{renderComponent()}</section>
      </main>
    </>
  );
}

export default Settings;

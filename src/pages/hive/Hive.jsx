import './Hive.scss';
import Sidebar from '../../components/sidebar/Sidebar';

function Hive() {
  return (
    <main id="home" className="page_layout">
      <Sidebar />
      <section className="header">
        <div className="header_btn_container">
          <button className="header_btn">Create Hive</button>
          <button className="header_btn">Enter code</button>
        </div>
        <div className="header_image_container">
          <img
            src="/icons/user.png"
            alt="Beehive user"
            className="header_image"
          />
        </div>
      </section>
    </main>
  );
}

export default Hive;

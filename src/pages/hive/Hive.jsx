import './Hive.scss';
import Sidebar from '../../components/sidebar/Sidebar';

import { IoMdShare } from 'react-icons/io';

import hives_content_list from '../../data/hives_content';

function Hive() {
  return (
    <main id="hive" className="page_layout">
      <Sidebar />
      <section className="header_container">
        <article className="header_top">
          <div className="header_btn_container">
            <button className="header_btn">
              Share
              <IoMdShare />
            </button>
          </div>
          <div className="header_image_container">
            <h1>Marmota</h1>
            <img
              src="/icons/user.png"
              alt="Beehive user"
              className="header_image"
            />
          </div>
        </article>
        <article className="header_bottom">
          <button className="hive_header_btn hive_header_btn--active">
            Midia
          </button>
          <button className="hive_header_btn">Docs</button>
          <button className="hive_header_btn">Saves</button>
        </article>
      </section>
      <section className="hive_data_container">
        {hives_content_list.map((hive) => (
          <div key={hive.username} className="hive_content_container">
            <img src={hive.image} alt={hive.username} className="image" />
            <p>{hive.username}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Hive;

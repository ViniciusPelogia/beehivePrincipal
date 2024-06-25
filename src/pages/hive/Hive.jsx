import './Hive.scss';
import Sidebar from '../../components/sidebar/Sidebar';

import { IoMdShare } from 'react-icons/io';

import { useState } from 'react';
import Docs from '../../components/hive/docs/Docs';
import Midia from '../../components/hive/midia/Midia';
import Saves from '../../components/hive/saves/Saves';


function Hive() {
  const [options, setOptions] = useState('midia');

  const renderComponent = () => {
    switch (options) {
      case 'midia':
        return <Midia />;

      case 'docs':
        return <Docs />;

      case 'saves':
        return <Saves />;
      default:
        return <Midia />;
    }
  };

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
          <button
            className={`hive_header_btn ${
              options === 'midia' ? 'hive_header_btn--active' : ''
            }`}
            onClick={() => setOptions('midia')}
          >
            Midia
          </button>
          <button
            className={`hive_header_btn ${
              options === 'docs' ? 'hive_header_btn--active' : ''
            }`}
            onClick={() => setOptions('docs')}
          >
            Docs
          </button>
          <button
            className={`hive_header_btn ${
              options === 'saves' ? 'hive_header_btn--active' : ''
            }`}
            onClick={() => setOptions('saves')}
          >
            Saves
          </button>
        </article>
      </section>
      <section className="hive_data_container">{renderComponent()}
      </section>
    </main>
  );
}

export default Hive;

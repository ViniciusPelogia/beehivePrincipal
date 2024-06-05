import '../../styles/Home.scss';
import Sidebar from '../../components/sidebar/Sidebar';

import hives_list from '../../data/hives';

function Home() {
  return (
    <main id="home">
      <Sidebar />
      <section className="header">
        <div className="header_btn_container">
          <button className="header_btn f_s">Create Hive</button>
          <button className="header_btn f_s">Enter code</button>
        </div>
        <div className="header_image_container">
          <img
            src="/icons/user.png"
            alt="Beehive user"
            className="header_image"
          />
        </div>
      </section>
      <section className="your_hives">
        <h2 className="title">Your Hives</h2>
        <article className="hives_container">
          {hives_list.map((hive) => (
            <div key={hive.name} className="hive">
              <img src={hive.image} alt={hive.name} className="hive_image" />
              <p>{hive.name}</p>
            </div>
          ))}
        </article>
      </section>
      <section className="your_hives">
        <h2 className="title">Discovery</h2>
        <article className="hives_container">
          {hives_list.map((hive) => (
            <div key={hive.name} className="hive">
              <img src={hive.image} alt={hive.name} className="hive_image" />
              <p>{hive.name}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}

export default Home;

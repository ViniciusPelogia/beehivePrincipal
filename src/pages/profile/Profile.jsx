import './Profile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { MdEdit } from 'react-icons/md';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <>
      <Sidebar />
      <main id="profile" className="page_layout">
        <section className="profile_left_section">
          <article className="profile_image_container">
            <img src="/icons/user.png" alt="" className="profile_image" />
            <h2 className="profile_username">Paulão</h2>
            <p>107 anos</p>
          </article>
          <div className="profile_social_container">
            <img src="/icons/instagram-logo.png" alt="Instagram" />
            <img
              src="/icons/facebook-logo.png"
              alt="Facebook"
              className="facebook"
            />
          </div>
          <p>Join date: 10 november 1984</p>
        </section>

        <section className="profile_right_section">
          <article className="profile_about_container">
            <h2>About</h2>
            <p className="fs_m profile_about_text">
              Hi, everyone! My name is Peeter, Im a lawyer, but in my spare time
              Im a photographer and car enthusiast. Im passionate about cars and
              Im here to share some photos of the most beautiful cars in the
              world.
            </p>
          </article>
          <article className="profile_hives_container">
            <h2 className="profile_hives_title">Hives</h2>
            <ul className="profile_hives_list">
              <Link to="/hive">
                <img src="/icons/teste-hive.jpg" alt="" />
                <p>Ovomaltine</p>
              </Link>
              <Link to="/hive">
                <img src="/icons/teste-hive.jpg" alt="" />
                <p>Jukebox</p>
              </Link>
            </ul>
            <div className="hives_buttons_container">
              <Link to="/createhive" className="button">
                Create Hive
              </Link>
              <button className="button">Enter code</button>
            </div>
          </article>
        </section>

        <div className="profile_icons_container">
          <Link to="/editprofile" className="profile_edit button">
            <MdEdit />
          </Link>
          <Link to="/" className="profile_leave button">
            <RiLogoutBoxRFill />
          </Link>
        </div>
      </main>
    </>
  );
}

export default Profile;

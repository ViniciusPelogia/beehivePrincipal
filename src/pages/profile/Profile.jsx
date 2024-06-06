import '../../styles/Profile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { MdEdit } from 'react-icons/md';
import { RiLogoutBoxRFill } from 'react-icons/ri';

function Profile() {
  return (
    <>
      <Sidebar />
      <main id="profile">
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
              <li>
                <img src="/icons/teste-hive.jpg" alt="" />
                <p>Ovomaltine</p>
              </li>
              <li>
                <img src="/icons/teste-hive.jpg" alt="" />
                <p>Jukebox</p>
              </li>
            </ul>
            <div className="hives_buttons_container">
              <button>
                Create Hive
              </button>
              <button>
                Enter code
              </button>
            </div>
          </article>
        </section>

        <div className="profile_icons_container">
          <button className="profile_edit">
            <MdEdit />
          </button>
          <button className="profile_leave">
            <RiLogoutBoxRFill />
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;

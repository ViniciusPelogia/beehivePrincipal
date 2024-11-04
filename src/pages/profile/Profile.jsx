import './Profile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { MdEdit } from 'react-icons/md';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [hives, setHives] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');

      try {
        const userResponse = await axios.get(`http://localhost:3000/usuarios/id/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(userResponse.data);

        const hivesResponse = await axios.get(`http://localhost:3000/hive/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setHives(hivesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div
      className={`page_layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      >
      <Sidebar isOpen={isSidebarOpen} />
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      <Sidebar />
      <main id="profile" className="page_layout">
        <section className="profile_left_section">
          <article className="profile_image_container">
            <img src={userData.imagem} alt="" className="profile_image" />
            <h2 className="profile_username">{userData.username}</h2>
            <p>{userData.idade} anos</p>
          </article>
          <div className="profile_social_container">
            <a href={`https://instagram.com/${userData.rede_social}`} target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram-logo.png" alt="Instagram" />
            </a>
          </div>
          <p>Data de adesão: {new Date(userData.createdAt).toLocaleDateString()}</p>
        </section>

        <section className="profile_right_section">
          <article className="profile_about_container">
            <h2>About</h2>
            <p className="fs_m profile_about_text">
              {userData.biografia}
            </p>
          </article>
          <article className="profile_hives_container">
            <h2 className="profile_hives_title">Hives</h2>
            <ul className="profile_hives_list">
              {hives.map(hive => (
                <Link to={`/hive/${hive.id}`} key={hive.id}>
                  <img src={hive.imagem} alt={hive.nome} />
                  <p>{hive.nome}</p>
                </Link>
              ))}
            </ul>
            <div className="hives_buttons_container">
              <Link to="/createhive" className="button">
                Criar Hive
              </Link>
            </div>
          </article>
        </section>

        <div className="profile_icons_container">
          <Link to="/editprofile" className="profile_edit button">
            <MdEdit />
          </Link>
          <button onClick={handleLogout} className="profile_leave button">
            <RiLogoutBoxRFill />
          </button>
        </div>
      </main>
    </div>
    </>
  );
}

export default Profile;

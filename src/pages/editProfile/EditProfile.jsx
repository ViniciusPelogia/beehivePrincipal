import './EditProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const [username, setNome] = useState('');
  const [biografia, setDescricao] = useState('');
  const [rede_social, setRede_social] = useState('');
  const [imagem, setImagem] = useState(null);
  const [hiveImageUrl, setHiveImageUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setHiveImageUrl(URL.createObjectURL(file));
    } else {
      setImagem(null);
      setHiveImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('biografia', biografia);
    formData.append('rede_social', rede_social);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    

    try {
      await axios.put(`http://localhost:3000/usuarios/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <>
      <Sidebar />
      <main id="edit_profile" className="page_layout">
        <section>
          <h2 className="title">Edit Profile</h2>
          <form className="hive_form" onSubmit={handleSubmit}>
            <div className="hive_image_container">
              <div className="hive_image">{hiveImageUrl && <img src={hiveImageUrl} alt="Hive" />}</div>
              <div className="Hive_image_button_container">
                <input type="file" id="hive_input_image" accept="image/*" onChange={handleImageChange} />
                <label htmlFor="hive_input_image" className="hive_input_label">
                  Upload Image
                </label>
              </div>
            </div>
            <div className="hive_inputs_container">
              <input
                type="text"
                placeholder="New username..."
                className="hive_input"
                value={username}
                onChange={(e) => setNome(e.target.value)}
              />
              <textarea
                rows="5"
                placeholder="New desc..."
                className="hive_input"
                value={biografia}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Instagram (optional)"
                className="hive_input"
                value={rede_social}
                onChange={(e) => setRede_social(e.target.value)}
              />
            </div>
            <button type="submit" className="create_hive_buton">
              Update
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditProfile;

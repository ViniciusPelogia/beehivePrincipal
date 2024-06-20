import './EditProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';

function EditProfile() {
  return (
    <>
      <Sidebar />
      <main id="edit_profile" className="page_layout">
        <section>
          <h2 className="title">Edit Profile</h2>
          <form className="hive_form">
            <div className="hive_image_container">
              <div className="hive_image"></div>
              <div className="Hive_image_button_container">
                <input type="file" id="hive_input_image" accept="image/*" />
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
              />
              <textarea
                rows="5"
                placeholder="New bio..."
                className="hive_input"
              ></textarea>
              <input
                type="text"
                placeholder="Facebook (optional)"
                className="hive_input"
              />
              <input
                type="text"
                placeholder="Instagram (optional)"
                className="hive_input"
              />
            </div>
            <Link to="/profile" className="create_hive_buton">
              Update
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditProfile;

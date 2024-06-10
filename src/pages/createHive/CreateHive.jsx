import '../../styles/CreateHive.scss';
import Sidebar from '../../components/sidebar/Sidebar';

function CreateHive() {
  return (
    <>
      <Sidebar />
      <main id="create_hive">
        <section>
          <h2 className="title">Create Hive</h2>
          <form className="hive_form">
            <div className="hive_image"></div>
            <div className="Hive_image_button_container">
              <input type="file" id="hive_input_image" accept="image/*" />
              <label htmlFor="hive_input_image" className="hive_input_label">Add Image</label>
            </div>
            <input type="checkbox" name="private" id="private_input" />
            <input type="text" placeholder="Hive name..." />
            <input type="text" />
            <input type="text" placeholder="Hive description..." />
            <button className="create_hive_buton">Create</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateHive;

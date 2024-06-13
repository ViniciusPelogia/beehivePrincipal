import './CreateHive.scss';
import Sidebar from '../../components/sidebar/Sidebar';

function CreateHive() {
  return (
    <>
      <Sidebar />
      <main id="create_hive" className="page_layout">
        <section>
          <h2 className="title">Create Hive</h2>
          <form className="hive_form">
            <div className="hive_image_container">
              <div className="hive_image"></div>
              <div className="Hive_image_button_container">
                <input type="file" id="hive_input_image" accept="image/*" />
                <label htmlFor="hive_input_image" className="hive_input_label">
                  Add Image
                </label>
              </div>
            </div>
            <div className="hive_inputs_container">
              <input
                type="text"
                placeholder="Hive name..."
                className="hive_input"
              />
              <textarea
                rows="5"
                placeholder="Hive description..."
                className="hive_input"
              ></textarea>
              <label htmlFor="dog-names">Choose a type for the hive:</label>
              <select name="dog-names" id="dog-names" className="hive_input">
                <option value=""></option>
                <option value="construction">Construction</option>
                <option value="work">Work</option>
                <option value="fruits">Fruits</option>
                <option value="party">Party</option>
                <option value="vacations">Vacations</option>
              </select>
              <div className="hive_private_input">
                <input id="private_input" type="checkbox" />
                <label htmlFor="private_input">Private Hive</label>
              </div>
            </div>
            <button className="create_hive_buton">Create</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateHive;

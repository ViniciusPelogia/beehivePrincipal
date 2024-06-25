import './Midia.scss';

import hives_content_list from '../../../data/hives_content';

function Midia() {
  return (
    <>
      {hives_content_list.map((hive) => (
        <div key={hive.username} className="hive_content_container">
          <img src={hive.image} alt={hive.username} className="image" />
          <p>{hive.username}</p>
        </div>
      ))}
    </>
  );
}

export default Midia;

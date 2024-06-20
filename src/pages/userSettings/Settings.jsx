import './Settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';

function Settings() {
  return (
    <>
      <Sidebar />
      <main className="container page_layout">
        <div className="sidebar">
          <h2>Configuration</h2>
          <ul>
            <li className="active">Notifications</li>
            <li>Categories</li>
            <li>Privacy and data</li>
            <li>Permissions</li>
            <li>About us</li>
          </ul>
        </div>
        <div className="content">
          <div className="notifications">
            <h2>Notifications</h2>
            <p>Notify me about</p>
            <p>Choose when and how you want to be notified</p>
            <div className="toggle">
              <label htmlFor="email">
                Email
                <br />
                <small>Notify me by email.</small>
              </label>
              <input type="checkbox" id="email" checked />
            </div>
            <div className="toggle">
              <label htmlFor="posts">
                Posts
                <br />
                <small>Notify me when someone makes a new post.</small>
              </label>
              <input type="checkbox" id="posts" checked />
            </div>
            <div className="toggle">
              <label htmlFor="comments">
                Comments
                <br />
                <small>
                  Notify me when someone makes a new comment on post.
                </small>
              </label>
              <input type="checkbox" id="comments" checked />
            </div>
            <button className="save-btn">Save</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;

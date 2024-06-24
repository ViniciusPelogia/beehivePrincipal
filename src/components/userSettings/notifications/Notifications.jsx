function Notifications() {
  return (
    <article className="settings__view">
      <h3 className="view__title">Notifications</h3>
      <p className="view__subtitle">
        Choose when and how you want to be notified.
      </p>
      <form className="view__form">
        <h4 className="form__title">Email</h4>
        <div className="form__input_container">
          <label htmlFor="email">Notify me by email:</label>
          <input type="checkbox" name="email" id="email" checked />
        </div>
        <h4 className="form__title">Posts</h4>
        <div className="form__input_container">
          <label htmlFor="email">Notify me about new posts:</label>
          <input type="checkbox" name="email" id="email" checked />
        </div>
        <h4 className="form__title">Comments</h4>
        <div className="form__input_container">
          <label htmlFor="email">Notify me about new comments:</label>
          <input type="checkbox" name="email" id="email" checked />
        </div>
      </form>
    </article>
  );
}

export default Notifications;

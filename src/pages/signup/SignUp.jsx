import './SignUp.scss';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

function SignUp() {
  return (
    <main id="signup">
      <section className="container">
        <article className="article article--cadastro">
          <img
            className="logo"
            src="/icons/CADASTRO/logo_trasparente.png"
            alt="Beehive"
          />
          <h2 className="title">Welcome!</h2>
          <p className="text">Sign up</p>
          <a className="button" href="#">
            <span>
              <em>Make login</em>
            </span>
            <span>
              <em>Make login</em>
            </span>
          </a>
        </article>
        <article className="article article--signup">
          <h2 className="title">Register</h2>
          <form className="form">
            <div className="input_container">
              <label htmlFor="email">
                <AiOutlineMail />
              </label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input_container">
              <label htmlFor="username">
                <FaRegUser />
              </label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="input_container">
              <label htmlFor="age">
                <LiaBirthdayCakeSolid />
              </label>
              <input type="age" name="age" id="age" placeholder="Age" />
            </div>
            <div className="input_container">
              <label htmlFor="password">
                <AiOutlineLock />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="assets_texts">
              <div className="remember_container">
                <input id="remember" type="checkbox" name="remember"></input>
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#" className="forgot">
                Esqueceu a senha?
              </a>
            </div>
            <button className="button">
              <span>
                <em>Create</em>
              </span>
              <span>
                <em>Create</em>
              </span>
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default SignUp;

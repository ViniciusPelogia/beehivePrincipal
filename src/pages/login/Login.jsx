import './Login.scss';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

function Login() {
  return (
    <main id="login">
      <section className="container">
        <article className="article article--cadastro">
          <img
            className="logo"
            src="/icons/CADASTRO/logo_trasparente.png"
            alt="Beehive"
          />
          <h2 className="title">Welcome!</h2>
          <p className="text">New Login</p>
          <a className="button" href="#">
            <span>
              <em>Create Account</em>
            </span>
            <span>
              <em>Create Account</em>
            </span>
          </a>
        </article>
        <article className="article article--login">
          <h2 className="title">Fazer Login</h2>
          <form className="form">
            <div className="input_container">
              <label htmlFor="email">
                <AiOutlineMail />
              </label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input_container">
              <label htmlFor="password">
                <AiOutlineLock />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
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
                <em>Login</em>
              </span>
              <span>
                <em>Login</em>
              </span>
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default Login;

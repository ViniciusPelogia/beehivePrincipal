import './Login.scss';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, senha });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/home');
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

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
          <Link className="button" to="/signup">
            <span>
              <em>Create Account</em>
            </span>
            <span>
              <em>Create Account</em>
            </span>
          </Link>
        </article>
        <article className="article article--login">
          <h2 className="title">Fazer Login</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label htmlFor="email">
                <AiOutlineMail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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
            {error && <p className="error">{error}</p>}
            <button type="submit" className="button">
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

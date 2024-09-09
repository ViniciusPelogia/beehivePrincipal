import './SignUp.scss';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    age: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/', formData);
      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

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
          <Link className="button" to="/login">
            <span>
              <em>Make login</em>
            </span>
            <span>
              <em>Make login</em>
            </span>
          </Link>
        </article>
        <article className="article article--signup">
          <h2 className="title">Register</h2>
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="username">
                <FaRegUser />
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="age">
                <LiaBirthdayCakeSolid />
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="assets_texts">
              <div className="remember_container">
                <input id="remember" type="checkbox" name="remember" />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#" className="forgot">
                Esqueceu a senha?
              </a>
            </div>
            <button type="submit" className="button">
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

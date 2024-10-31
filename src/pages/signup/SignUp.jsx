import "./SignUp.scss";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    idade: "",
    nome: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setError("Por favor, insira um email válido.");
      return;
    }
    for (const key in formData) {
      if (formData[key].trim() === "") {
        alert("Todos os campos devem ser preenchidos corretamente.");
        return;
      }
      if (formData.senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (parseInt(formData.idade) < 18) {
        alert("A idade deve ser maior que 18 anos!");
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/usuarios",
        formData
      );
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
          <Link className="button" to="/">
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="idade">
                <LiaBirthdayCakeSolid />
              </label>
              <input
                type="number"
                name="idade"
                id="idade"
                placeholder="Idade"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="nome">
                <FaRegUser />
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="senha">
                <AiOutlineLock />
              </label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="button">
              <span>
                <em>Register</em>
              </span>
              <span>
                <em>Register</em>
              </span>
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default SignUp;

import { useState } from "react";
import sendEmail from "./sendEmail"; // caminho para o arquivo sendEmail

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(email, "https://seu-servidor.com/confirmar-email");
      alert("Um email foi enviado com as instruções para redefinir sua senha.");
    } catch (error) {
      alert("Erro ao enviar email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Esqueci minha senha</button>
    </form>
  );
}

export default ForgotPassword;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../ui/PageHeader";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    const sucesso = await login({
      usuario,
      senha,
      lembrarUsuario,
    });

    if (!sucesso) {
      setErro("Usuário ou senha inválidos.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <ShieldCheck size={48} />
          <h2>Controle Staging</h2>
          <p>Inventário Corporativo de Equipamentos</p>
        </div>

        <PageHeader
          title="Entrar"
          subtitle="Acesse sua conta para continuar."
        />

        <form onSubmit={handleLogin} className="login-form">

          <div className="mb-3">
            <label className="form-label">Usuário</label>

            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>

            <div className="password-input">

              <input
                type={mostrarSenha ? "text" : "password"}
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>
          </div>

          <div className="login-options">

            <label className="form-check-label remember-option">
              <input
                type="checkbox"
                className="form-check-input"
                checked={lembrarUsuario}
                onChange={(e) => setLembrarUsuario(e.target.checked)}
              />

              Lembrar meu usuário
            </label>

          </div>

          {erro && (
            <div className="alert alert-danger mt-2">
              {erro}
            </div>
          )}
                    <button type="submit" className="btn btn-primary login-button">
            <LogIn size={18} />
            Entrar
          </button>

        </form>

        <div className="login-footer">
          <span>Controle Staging</span>
          <small>v2.0 Beta • Build 004</small>
        </div>

      </div>

    </div>
  );
}

export default Login;
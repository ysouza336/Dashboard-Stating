import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function voltar() {
    navigate(-1);
  }

  function irParaDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="not-found-page">
      <div className="not-found-card">

        <div className="not-found-icon">
          <AlertTriangle size={52} />
        </div>

        <span className="not-found-code">404</span>

        <h1>Página não encontrada</h1>

        <p>
          A página que você tentou acessar não existe ou não está mais
          disponível.
        </p>

        <div className="not-found-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={voltar}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={irParaDashboard}
          >
            <Home size={18} />
            Ir para o Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default NotFound;
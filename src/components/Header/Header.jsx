import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const titulos = {
  "/": "Dashboard",
  "/novo": "Novo Registro",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações"
};

function Header() {
  const location = useLocation();
  const [dataHora, setDataHora] = useState("");

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();

      setDataHora(
        agora.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short"
        })
      );
    };

    atualizar();

    const timer = setInterval(atualizar, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">

      <div>
        <h4>{titulos[location.pathname] || "Controle Staging"}</h4>
        <span>{dataHora}</span>
      </div>

      <div className="header-actions">

        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar (em breve)"
          disabled
        />

        <div className="user-avatar">
          YS
        </div>

      </div>

    </header>
  );
}

export default Header;
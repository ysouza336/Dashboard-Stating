import { useEffect, useMemo, useState } from "react";
import {
  Search,
  X,
  LogOut,
  Laptop,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useRegistros } from "../../context/RegistroContext";

import "./Header.css";

const titulos = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/novo": "Novo Registro",
  "/novo-registro": "Novo Registro",
  "/relatorios": "Relatórios",
  "/auditoria": "Auditoria",
  "/importar-excel": "Importação Excel",
  "/usuarios": "Usuários",
  "/administracao": "Administração",
  "/configuracoes": "Configurações",
};

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    usuarioLogado,
    logout,
  } = useAuth();

  const {
    registros = [],
  } = useRegistros();

  const [dataHora, setDataHora] = useState("");

  const [busca, setBusca] = useState("");

  const [
    mostrarResultados,
    setMostrarResultados,
  ] = useState(false);

  const [saindo, setSaindo] = useState(false);

  /* ==========================================================
     DATA E HORA
  ========================================================== */

  useEffect(() => {
    function atualizarDataHora() {
      const agora = new Date();

      setDataHora(
        agora.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        })
      );
    }

    atualizarDataHora();

    const timer = setInterval(
      atualizarDataHora,
      60000
    );

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* ==========================================================
     PESQUISA UNIVERSAL
  ========================================================== */

  const resultados = useMemo(() => {
    const termo = busca
      .trim()
      .toLowerCase();

    if (!termo) {
      return [];
    }

    return registros
      .filter((registro) => {
        const campos = [
          registro.patrimonio,
          registro.hostname,
          registro.serviceTag,
          registro.serial,
          registro.tipo,
          registro.marca,
          registro.modelo,
          registro.solicitadoPor,
          registro.responsavel,
          registro.status,
        ];

        return campos.some((campo) =>
          String(campo ?? "")
            .toLowerCase()
            .includes(termo)
        );
      })
      .slice(0, 8);
  }, [busca, registros]);

  function abrirRegistro(registro) {
    setBusca("");
    setMostrarResultados(false);

    navigate("/novo-registro", {
      state: {
        registroEmEdicao: registro,
      },
    });
  }

  function limparBusca() {
    setBusca("");
    setMostrarResultados(false);
  }

  /* ==========================================================
     LOGOUT
  ========================================================== */

  function handleLogout() {
    if (saindo) {
      return;
    }

    setSaindo(true);

    logout();

    navigate("/login", {
      replace: true,
    });
  }

  /* ==========================================================
     INICIAIS DO USUÁRIO
  ========================================================== */

  function obterIniciais(nome) {
    if (!nome) {
      return "US";
    }

    return nome
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) =>
        parte
          .charAt(0)
          .toUpperCase()
      )
      .join("");
  }

  const iniciaisUsuario =
    obterIniciais(
      usuarioLogado?.nome
    );

  return (
    <header className="header">

      {/* =====================================================
          TÍTULO
      ===================================================== */}

      <div className="header-title">

        <h4>
          {
            titulos[
              location.pathname
            ] || "Controle Staging"
          }
        </h4>

        <span>
          {dataHora}
        </span>

      </div>

      {/* =====================================================
          AÇÕES
      ===================================================== */}

      <div className="header-actions">

        {/* =============================
            PESQUISA UNIVERSAL
        ============================== */}

        <div className="header-search">

          <Search
            size={18}
            className="header-search-icon"
          />

          <input
            type="text"
            className="form-control header-search-input"
            placeholder="Pesquisar patrimônio, hostname, TAG..."
            value={busca}
            onFocus={() => {
              if (busca.trim()) {
                setMostrarResultados(true);
              }
            }}
            onChange={(event) => {
              setBusca(
                event.target.value
              );

              setMostrarResultados(true);
            }}
          />

          {busca && (
            <button
              type="button"
              className="header-search-clear"
              onClick={limparBusca}
              aria-label="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}

          {mostrarResultados &&
            busca.trim() && (
              <div className="header-search-results">

                {resultados.length === 0 ? (
                  <div className="header-search-empty">

                    <Search size={18} />

                    <span>
                      Nenhum equipamento encontrado.
                    </span>

                  </div>
                ) : (
                  resultados.map(
                    (registro) => (
                      <button
                        key={registro.id}
                        type="button"
                        className="header-search-result"
                        onClick={() =>
                          abrirRegistro(
                            registro
                          )
                        }
                      >

                        <div className="header-search-result-icon">
                          <Laptop size={18} />
                        </div>

                        <div className="header-search-result-info">

                          <strong>
                            {
                              registro.patrimonio ||
                              "Sem patrimônio"
                            }
                          </strong>

                          <span>
                            {
                              registro.hostname ||
                              "Sem hostname"
                            }
                          </span>

                          <small>
                            {
                              registro.serviceTag ||
                              registro.serial ||
                              "Sem TAG/Serial"
                            }
                          </small>

                        </div>

                        <div className="header-search-status">
                          {
                            registro.status ||
                            "-"
                          }
                        </div>

                      </button>
                    )
                  )
                )}

              </div>
            )}

        </div>

        {/* =============================
            USUÁRIO
        ============================== */}

        {usuarioLogado && (
          <div className="header-user">

            <div className="header-user-info">

              <strong>
                {usuarioLogado.nome}
              </strong>

              <span>
                {usuarioLogado.perfil}
              </span>

            </div>

            <div className="user-avatar">
              {iniciaisUsuario}
            </div>

          </div>
        )}

        {/* =============================
            LOGOUT
        ============================== */}

        <button
          type="button"
          className="header-logout"
          onClick={handleLogout}
          disabled={saindo}
          title="Encerrar sessão"
        >
          <LogOut size={18} />

          <span>
            {saindo
              ? "Saindo..."
              : "Sair"}
          </span>
        </button>

      </div>

    </header>
  );
}

export default Header;
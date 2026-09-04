import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ScrollText,
  CalendarDays,
  User,
  Activity,
} from "lucide-react";

import { useAuditoria } from "../../../context/AuditoriaContext";

import "./LogsTab.css";

const TIPOS_ACAO = [
  "Todos",
  "LOGIN",
  "LOGOUT",
  "CADASTRO",
  "EDIÇÃO",
  "EXCLUSÃO",
  "IMPORTAÇÃO",
  "BACKUP",
  "RESTAURAÇÃO",
];

function LogsTab() {
  const { auditoria = [] } = useAuditoria();

  const [busca, setBusca] = useState("");
  const [tipoAcao, setTipoAcao] = useState("Todos");

  const logsFiltrados = useMemo(() => {
    let lista = [...auditoria];

    lista.sort(
      (a, b) => new Date(b.dataHora) - new Date(a.dataHora)
    );

    if (tipoAcao !== "Todos") {
      lista = lista.filter((log) => log.acao === tipoAcao);
    }

    if (busca.trim()) {
      const texto = busca.toLowerCase();

      lista = lista.filter((log) => {
        return (
          log.usuario?.toLowerCase().includes(texto) ||
          log.acao?.toLowerCase().includes(texto) ||
          log.descricao?.toLowerCase().includes(texto)
        );
      });
    }

    return lista;
  }, [auditoria, busca, tipoAcao]);

  const totalEventos = auditoria.length;
  const totalLogin = auditoria.filter((l) => l.acao === "LOGIN").length;
  const totalCadastros = auditoria.filter((l) => l.acao === "CADASTRO").length;

  function formatarData(data) {
    if (!data) return "--";

    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  }

  return (
    <div className="logs-tab">

      <div className="logs-header">

        <div>
          <h4>Auditoria da Aplicação</h4>

          <p>
            Histórico completo das ações executadas no Controle Staging.
          </p>
        </div>

      </div>

      {/* MÉTRICAS */}

      <div className="logs-metricas">

        <div className="logs-metrica-card">
          <ScrollText size={22} />
          <div>
            <span>Total de Eventos</span>
            <strong>{totalEventos}</strong>
          </div>
        </div>

        <div className="logs-metrica-card success">
          <User size={22} />
          <div>
            <span>Logins</span>
            <strong>{totalLogin}</strong>
          </div>
        </div>

        <div className="logs-metrica-card warning">
          <Activity size={22} />
          <div>
            <span>Cadastros</span>
            <strong>{totalCadastros}</strong>
          </div>
        </div>

      </div>

      {/* FILTROS */}

      <div className="logs-filtros">

        <div className="logs-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Pesquisar por usuário, ação ou descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="logs-select-box">

          <Filter size={18} />

          <select
            value={tipoAcao}
            onChange={(e) => setTipoAcao(e.target.value)}
          >
            {TIPOS_ACAO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* TABELA */}

      <div className="logs-table-container">

        <table className="table align-middle logs-table">

          <thead>
            <tr>
              <th>Data</th>
              <th>Usuário</th>
              <th>Ação</th>
              <th>Descrição</th>
            </tr>
          </thead>

          <tbody>

            {logsFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="logs-empty-row">
                  Nenhum evento encontrado.
                </td>
              </tr>
            ) : (
              logsFiltrados.map((log) => (
                <tr key={log.id}>

                  <td>
                    <div className="log-data">
                      <CalendarDays size={15} />
                      {formatarData(log.dataHora)}
                    </div>
                  </td>

                  <td>{log.usuario || "--"}</td>

                  <td>
                    <span className={`log-tag ${log.acao?.toLowerCase()}`}>
                      {log.acao}
                    </span>
                  </td>

                  <td>{log.descricao}</td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default LogsTab;
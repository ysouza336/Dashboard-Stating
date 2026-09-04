import { useMemo, useState } from "react";
import {
  Users,
  Monitor,
  ScrollText,
  Settings,
  DatabaseBackup,
} from "lucide-react";

import PageHeader from "../../ui/PageHeader";
import MetricCard from "../../ui/MetricCard";

import UsuariosTab from "./components/UsuariosTab";
import SessoesTab from "./components/SessoesTab";
import LogsTab from "./components/LogsTab";
import ConfiguracoesTab from "./components/ConfiguracoesTab";
import BackupTab from "./components/BackupTab";

import AuthService from "../../services/AuthService";
import { useAuditoria } from "../../context/AuditoriaContext";

import "./Administracao.css";

const TABS = [
  {
    id: "usuarios",
    label: "Usuários",
    icon: Users,
  },
  {
    id: "sessoes",
    label: "Sessões",
    icon: Monitor,
  },
  {
    id: "logs",
    label: "Logs",
    icon: ScrollText,
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: Settings,
  },
  {
    id: "backup",
    label: "Backup",
    icon: DatabaseBackup,
  },
];

function Administracao() {
  const [tabAtiva, setTabAtiva] = useState("usuarios");

  const { auditoria } = useAuditoria();

  const usuarios = useMemo(() => AuthService.listarUsuarios(), []);

  const usuarioLogado = AuthService.obterSessao();

  const metricas = useMemo(() => {
    const usuariosAtivos = usuarios.filter((u) => u.ativo).length;

    const administradores = usuarios.filter(
      (u) => u.perfil === "Administrador"
    ).length;

    return {
      usuariosAtivos,
      administradores,
      totalLogs: auditoria.length,
      sessoes: usuarioLogado ? 1 : 0,
    };
  }, [usuarios, auditoria, usuarioLogado]);

  function renderizarConteudo() {
    switch (tabAtiva) {
      case "usuarios":
        return <UsuariosTab />;

      case "sessoes":
        return <SessoesTab />;

      case "logs":
        return <LogsTab />;

      case "configuracoes":
        return <ConfiguracoesTab />;

      case "backup":
        return <BackupTab />;

      default:
        return <UsuariosTab />;
    }
  }

  return (
    <div className="administracao-page">

      <PageHeader
        title="Administração do Sistema"
        subtitle="Gerenciamento de usuários, sessões, logs, configurações e backup do Controle Staging."
      />

      {/* ================= METRICAS ================= */}

      <div className="admin-metric-grid">

        <MetricCard
          title="Usuários Ativos"
          value={metricas.usuariosAtivos}
          icon={Users}
        />

        <MetricCard
          title="Administradores"
          value={metricas.administradores}
          icon={Settings}
        />

        <MetricCard
          title="Sessões Ativas"
          value={metricas.sessoes}
          icon={Monitor}
        />

        <MetricCard
          title="Eventos Registrados"
          value={metricas.totalLogs}
          icon={ScrollText}
        />

      </div>

      {/* ================= MENU ABAS ================= */}

      <div className="admin-tabs">

        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              className={
                tabAtiva === tab.id
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() => setTabAtiva(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}

      </div>

      {/* ================= CONTEUDO ================= */}

      <div className="admin-content">
        {renderizarConteudo()}
      </div>

    </div>
  );
}

export default Administracao;
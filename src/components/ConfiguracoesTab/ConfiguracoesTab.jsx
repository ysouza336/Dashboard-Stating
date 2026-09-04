import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Moon,
  Sun,
  Monitor,
  Building2,
  ShieldCheck,
  DatabaseBackup,
  Settings,
} from "lucide-react";

import "./ConfiguracoesTab.css";

const CONFIG_PADRAO = {
  empresa: "Controle Staging",
  unidade: "São Paulo",
  nomeAplicacao: "Controle Staging V2.0 Beta",
  versao: "2.0.0-beta",
  tema: "system",
  auditoriaAtiva: true,
  backupAutomatico: true,
};

function ConfiguracoesTab() {
  const [configuracoes, setConfiguracoes] = useState(CONFIG_PADRAO);

  useEffect(() => {
    const dados = localStorage.getItem("configuracoesSistema");

    if (dados) {
      setConfiguracoes(JSON.parse(dados));
    }
  }, []);

  function atualizarCampo(campo, valor) {
    setConfiguracoes((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function salvarConfiguracoes() {
    localStorage.setItem(
      "configuracoesSistema",
      JSON.stringify(configuracoes)
    );

    alert("Configurações salvas com sucesso.");
  }

  function restaurarPadrao() {
    const confirmar = window.confirm(
      "Deseja restaurar todas as configurações para o padrão?"
    );

    if (!confirmar) return;

    setConfiguracoes(CONFIG_PADRAO);

    localStorage.setItem(
      "configuracoesSistema",
      JSON.stringify(CONFIG_PADRAO)
    );
  }

  return (
    <div className="config-tab">

      <div className="config-header">

        <div>
          <h4>Configurações da Aplicação</h4>

          <p>
            Defina informações gerais do Controle Staging e preferências da aplicação.
          </p>
        </div>

      </div>

      {/* Dados da Empresa */}

      <div className="config-card">

        <div className="config-card-title">
          <Building2 size={20}/>
          <h5>Dados da Empresa</h5>
        </div>

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Empresa</label>

            <input
              className="form-control"
              value={configuracoes.empresa}
              onChange={(e) =>
                atualizarCampo("empresa", e.target.value)
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Unidade</label>

            <input
              className="form-control"
              value={configuracoes.unidade}
              onChange={(e) =>
                atualizarCampo("unidade", e.target.value)
              }
            />
          </div>

        </div>

      </div>

      {/* Sistema */}

      <div className="config-card">

        <div className="config-card-title">
          <Settings size={20}/>
          <h5>Aplicação</h5>
        </div>

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Nome da Aplicação</label>

            <input
              className="form-control"
              value={configuracoes.nomeAplicacao}
              onChange={(e) =>
                atualizarCampo("nomeAplicacao", e.target.value)
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Versão</label>

            <input
              className="form-control"
              disabled
              value={configuracoes.versao}
            />
          </div>

        </div>

      </div>

      {/* Tema */}

      <div className="config-card">

        <div className="config-card-title">
          <Monitor size={20}/>
          <h5>Aparência</h5>
        </div>

        <div className="tema-grid">

          <button
            className={
              configuracoes.tema === "light"
                ? "tema-card active"
                : "tema-card"
            }
            onClick={() => atualizarCampo("tema", "light")}
          >
            <Sun size={26}/>
            <span>Claro</span>
          </button>

          <button
            className={
              configuracoes.tema === "dark"
                ? "tema-card active"
                : "tema-card"
            }
            onClick={() => atualizarCampo("tema", "dark")}
          >
            <Moon size={26}/>
            <span>Escuro</span>
          </button>

          <button
            className={
              configuracoes.tema === "system"
                ? "tema-card active"
                : "tema-card"
            }
            onClick={() => atualizarCampo("tema", "system")}
          >
            <Monitor size={26}/>
            <span>Sistema</span>
          </button>

        </div>

      </div>

      {/* Segurança */}

      <div className="config-card">

        <div className="config-card-title">
          <ShieldCheck size={20}/>
          <h5>Segurança e Auditoria</h5>
        </div>

        <div className="config-switch">

          <div>
            <strong>Auditoria da Aplicação</strong>

            <span>Registrar todas as ações dos usuários.</span>
          </div>

          <input
            type="checkbox"
            checked={configuracoes.auditoriaAtiva}
            onChange={(e) =>
              atualizarCampo("auditoriaAtiva", e.target.checked)
            }
          />

        </div>

      </div>

      {/* Backup */}

      <div className="config-card">

        <div className="config-card-title">
          <DatabaseBackup size={20}/>
          <h5>Backup Automático</h5>
        </div>

        <div className="config-switch">

          <div>
            <strong>Backup Automático Local</strong>

            <span>
              Criar backups periódicos das informações do sistema.
            </span>
          </div>

          <input
            type="checkbox"
            checked={configuracoes.backupAutomatico}
            onChange={(e) =>
              atualizarCampo("backupAutomatico", e.target.checked)
            }
          />

        </div>

      </div>

      {/* Rodapé */}

      <div className="config-actions">

        <button
          className="btn btn-outline-secondary"
          onClick={restaurarPadrao}
        >
          <RotateCcw size={18}/>
          Restaurar Padrão
        </button>

        <button
          className="btn btn-primary"
          onClick={salvarConfiguracoes}
        >
          <Save size={18}/>
          Salvar Configurações
        </button>

      </div>

    </div>
  );
}

export default ConfiguracoesTab;
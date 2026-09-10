import { useEffect, useMemo, useState } from "react";
import {
  DatabaseBackup,
  Download,
  Upload,
  Trash2,
  RotateCcw,
  Clock,
  HardDrive,
  ShieldAlert,
} from "lucide-react";

import "./BackupTab.css";

// Chave usada para armazenar o histórico de backups no localStorage.
// Cada backup guarda um snapshot serializado do restante do localStorage
// (exceto esta própria chave), para permitir restauração posterior.
const CHAVE_BACKUPS = "app_backups";

function carregarBackups() {
  try {
    const bruto = localStorage.getItem(CHAVE_BACKUPS);
    return bruto ? JSON.parse(bruto) : [];
  } catch (erro) {
    console.error("Erro ao carregar backups:", erro);
    return [];
  }
}

function salvarBackups(backups) {
  localStorage.setItem(CHAVE_BACKUPS, JSON.stringify(backups));
}

function formatarTamanho(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR");
}

function capturarSnapshotAtual() {
  const snapshot = {};

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave === CHAVE_BACKUPS) continue;
    snapshot[chave] = localStorage.getItem(chave);
  }

  return snapshot;
}

function BackupTab() {
  const [backups, setBackups] = useState([]);
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    setBackups(carregarBackups());
  }, []);

  function criarBackup() {
    setProcessando(true);

    try {
      const dados = capturarSnapshotAtual();
      const conteudo = JSON.stringify(dados);

      const novoBackup = {
        id: crypto.randomUUID(),
        criadoEm: new Date().toISOString(),
        tamanho: new Blob([conteudo]).size,
        dados,
      };

      const atualizados = [novoBackup, ...backups];
      setBackups(atualizados);
      salvarBackups(atualizados);
    } catch (erro) {
      console.error("Erro ao criar backup:", erro);
      alert("Não foi possível criar o backup.");
    } finally {
      setProcessando(false);
    }
  }

  function baixarBackup(backup) {
    const conteudo = JSON.stringify(backup, null, 2);
    const blob = new Blob([conteudo], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `backup-${backup.criadoEm.slice(0, 19)}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function importarBackup(event) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      try {
        const backup = JSON.parse(leitor.result);

        if (!backup.dados || !backup.criadoEm) {
          throw new Error("Arquivo de backup inválido.");
        }

        const atualizados = [backup, ...backups];
        setBackups(atualizados);
        salvarBackups(atualizados);
      } catch (erro) {
        console.error("Erro ao importar backup:", erro);
        alert("Arquivo de backup inválido ou corrompido.");
      }
    };

    leitor.readAsText(arquivo);
    event.target.value = "";
  }

  function restaurarBackup(backup) {
    const confirmar = window.confirm(
      `Restaurar o backup de ${formatarData(backup.criadoEm)}? Isso substituirá os dados atuais da aplicação.`
    );

    if (!confirmar) return;

    try {
      Object.keys(localStorage).forEach((chave) => {
        if (chave !== CHAVE_BACKUPS) localStorage.removeItem(chave);
      });

      Object.entries(backup.dados).forEach(([chave, valor]) => {
        localStorage.setItem(chave, valor);
      });

      alert("Backup restaurado com sucesso. A página será recarregada.");
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao restaurar backup:", erro);
      alert("Não foi possível restaurar o backup.");
    }
  }

  function excluirBackup(id) {
    const confirmar = window.confirm("Deseja remover este backup?");
    if (!confirmar) return;

    const atualizados = backups.filter((b) => b.id !== id);
    setBackups(atualizados);
    salvarBackups(atualizados);
  }

  const metricas = useMemo(() => {
    const total = backups.length;
    const tamanhoTotal = backups.reduce((soma, b) => soma + b.tamanho, 0);
    const ultimoBackup = backups[0]?.criadoEm ?? null;

    return { total, tamanhoTotal, ultimoBackup };
  }, [backups]);

  return (
    <div className="backup-tab">

      <div className="backup-tab-header">

        <div>
          <h4>Backup e Restauração</h4>
          <p>Crie, baixe, importe e restaure backups dos dados da aplicação.</p>
        </div>

        <div className="backup-tab-actions">

          <label className="btn btn-outline-secondary btn-importar">
            <Upload size={18} />
            Importar
            <input
              type="file"
              accept="application/json"
              onChange={importarBackup}
              hidden
            />
          </label>

          <button
            className="btn btn-primary"
            onClick={criarBackup}
            disabled={processando}
          >
            <DatabaseBackup size={18} />
            {processando ? "Gerando..." : "Criar Backup Agora"}
          </button>

        </div>

      </div>

      {/* MÉTRICAS */}

      <div className="backup-tab-metricas">

        <div className="backup-metrica-card">
          <span>Total de Backups</span>
          <strong>{metricas.total}</strong>
        </div>

        <div className="backup-metrica-card success">
          <span>Espaço Utilizado</span>
          <strong>{formatarTamanho(metricas.tamanhoTotal)}</strong>
        </div>

        <div className="backup-metrica-card warning">
          <span>Último Backup</span>
          <strong>
            {metricas.ultimoBackup
              ? formatarData(metricas.ultimoBackup)
              : "Nenhum"}
          </strong>
        </div>

      </div>

      {/* AVISO */}

      <div className="backup-tab-aviso">
        <ShieldAlert size={16} />
        Restaurar um backup substitui todos os dados atuais salvos localmente.
        Essa ação não pode ser desfeita.
      </div>

      {/* TABELA */}

      <div className="backup-table-container">

        <table className="table align-middle backup-table">

          <thead>
            <tr>
              <th>Data de Criação</th>
              <th>Tamanho</th>
              <th style={{ width: 200 }}>Ações</th>
            </tr>
          </thead>

          <tbody>

            {backups.length === 0 ? (
              <tr>
                <td colSpan={3} className="backup-empty-row">
                  Nenhum backup criado ainda.
                </td>
              </tr>
            ) : (
              backups.map((backup) => (
                <tr key={backup.id}>

                  <td>
                    <div className="backup-info">
                      <Clock size={14} />
                      {formatarData(backup.criadoEm)}
                    </div>
                  </td>

                  <td>
                    <div className="backup-info">
                      <HardDrive size={14} />
                      {formatarTamanho(backup.tamanho)}
                    </div>
                  </td>

                  <td>
                    <div className="backup-acoes">

                      <button
                        className="btn btn-sm btn-outline-success"
                        title="Restaurar Backup"
                        onClick={() => restaurarBackup(backup)}
                      >
                        <RotateCcw size={16} />
                      </button>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Baixar Backup"
                        onClick={() => baixarBackup(backup)}
                      >
                        <Download size={16} />
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Excluir Backup"
                        onClick={() => excluirBackup(backup.id)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default BackupTab;
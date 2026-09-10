import { useEffect, useMemo, useState } from "react";
import {
  Monitor,
  Clock3,
  ShieldCheck,
  LogOut,
  RefreshCw,
  CalendarDays,
} from "lucide-react";

import AuthService from "../../services/AuthService";

import "./SessoesTab.css";

const DURACAO_SESSAO = 8 * 60 * 60 * 1000; // 8 horas

function formatarData(data) {
  if (!data) return "--";

  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function formatarTempo(ms) {
  if (ms <= 0) return "Expirada";

  const horas = Math.floor(ms / (1000 * 60 * 60));
  const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  return `${horas}h ${minutos}min`;
}

function SessoesTab() {
  const [sessao, setSessao] = useState(null);
  const [agora, setAgora] = useState(Date.now());

  useEffect(() => {
    carregarSessao();

    const intervalo = setInterval(() => {
      setAgora(Date.now());
    }, 60000);

    return () => clearInterval(intervalo);
  }, []);

  function carregarSessao() {
    setSessao(AuthService.obterSessao());
  }

  const informacoesSessao = useMemo(() => {
    if (!sessao) return null;

    const loginEm = new Date(sessao.loginEm || Date.now());

    const expiraEm = new Date(loginEm.getTime() + DURACAO_SESSAO);

    return {
      ...sessao,
      loginEm,
      expiraEm,
      restante: expiraEm.getTime() - agora,
    };
  }, [sessao, agora]);

  function encerrarSessao() {
    const confirmar = window.confirm(
      "Deseja realmente encerrar a sessão atual?"
    );

    if (!confirmar) return;

    AuthService.logout();

    window.location.href = "/login";
  }

  return (
    <div className="sessoes-tab">
      <div className="sessoes-header">
        <div>
          <h4>Sessões da Aplicação</h4>

          <p>Controle das sessões autenticadas no Controle Staging.</p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={carregarSessao}
        >
          <RefreshCw size={16} />
          Atualizar
        </button>
      </div>

      {/* Sessão Atual */}

      <div className="sessao-card">
        <div className="sessao-card-title">
          <Monitor size={22} />
          <h5>Sessão Atual</h5>
        </div>

        {informacoesSessao ? (
          <>
            <div className="sessao-usuario">
              <div className="sessao-avatar">
                {informacoesSessao.nome.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{informacoesSessao.nome}</strong>

                <span>@{informacoesSessao.usuario}</span>
              </div>
            </div>

            <div className="sessao-grid">
              <div className="sessao-info-item">
                <CalendarDays size={18} />
                <div>
                  <span>Login realizado em</span>

                  <strong>
                    {formatarData(informacoesSessao.loginEm)}
                  </strong>
                </div>
              </div>

              <div className="sessao-info-item">
                <Clock3 size={18} />
                <div>
                  <span>Expiração da sessão</span>

                  <strong>
                    {formatarData(informacoesSessao.expiraEm)}
                  </strong>
                </div>
              </div>

              <div className="sessao-info-item">
                <ShieldCheck size={18} />
                <div>
                  <span>Perfil</span>

                  <strong>{informacoesSessao.perfil}</strong>
                </div>
              </div>

              <div className="sessao-info-item">
                <Clock3 size={18} />
                <div>
                  <span>Tempo restante</span>

                  <strong>
                    {formatarTempo(informacoesSessao.restante)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="sessao-status ativo">
              <ShieldCheck size={16} />
              Sessão autenticada e válida.
            </div>

            <div className="sessao-actions">
              <button
                className="btn btn-outline-danger"
                onClick={encerrarSessao}
              >
                <LogOut size={18} />
                Encerrar Sessão
              </button>
            </div>
          </>
        ) : (
          <div className="sessao-vazia">
            <Monitor size={42} />

            <h5>Nenhuma sessão ativa encontrada.</h5>

            <p>Faça login para iniciar uma nova sessão.</p>
          </div>
        )}
      </div>

      {/* Informações da Plataforma */}

      <div className="sessao-card">
        <div className="sessao-card-title">
          <ShieldCheck size={22} />
          <h5>Informações da Plataforma</h5>
        </div>

        <div className="sessao-grid">
          <div className="sessao-info-item">
            <Monitor size={18} />
            <div>
              <span>Navegador</span>

              <strong>{navigator.userAgent.split(" ")[0]}</strong>
            </div>
          </div>

          <div className="sessao-info-item">
            <CalendarDays size={18} />
            <div>
              <span>Data Atual</span>

              <strong>{formatarData(new Date())}</strong>
            </div>
          </div>

          <div className="sessao-info-item">
            <Clock3 size={18} />
            <div>
              <span>Renovação Automática</span>

              <strong>8 horas</strong>
            </div>
          </div>

          <div className="sessao-info-item">
            <ShieldCheck size={18} />
            <div>
              <span>Modo da Aplicação</span>

              <strong>React (Pré Electron)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico */}

      <div className="sessao-card">
        <div className="sessao-card-title">
          <Clock3 size={22} />
          <h5>Histórico de Sessões</h5>
        </div>

        <div className="historico-info">
          Nesta versão React existe apenas uma sessão local armazenada no
          navegador.

          Na **Fase 8 (Electron + SQLite)** esta tela exibirá o histórico
          completo de logins e logouts da aplicação.
        </div>
      </div>
    </div>
  );
}

export default SessoesTab;
import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  Pencil,
  Trash2,
  ShieldCheck,
  CircleCheck,
  CircleX,
  Search,
} from "lucide-react";

import AuthService from "../../../services/AuthService";
import UserModal from "../../Usuarios/UserModal";
import RoleBadge from "../../Usuarios/RoleBadge";

import "./UsuariosTab.css";

function UsuariosTab() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    setUsuarios(AuthService.listarUsuarios());
  }

  function novoUsuario() {
    setUsuarioSelecionado(null);
    setModalAberto(true);
  }

  function editarUsuario(usuario) {
    setUsuarioSelecionado(usuario);
    setModalAberto(true);
  }

  function excluirUsuario(id) {
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) return;

    if (usuario.usuario === "admin") {
      alert("O usuário administrador padrão não pode ser removido.");
      return;
    }

    const confirmar = window.confirm(
      `Deseja remover o usuário "${usuario.nome}"?`
    );

    if (!confirmar) return;

    AuthService.removerUsuario(id);
    carregarUsuarios();
  }

  function alternarStatus(id) {
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) return;

    AuthService.atualizarUsuario(id, {
      ...usuario,
      ativo: !usuario.ativo,
    });

    carregarUsuarios();
  }

  const usuariosFiltrados = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    if (!texto) return usuarios;

    return usuarios.filter((usuario) => {
      return (
        usuario.nome.toLowerCase().includes(texto) ||
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.perfil.toLowerCase().includes(texto)
      );
    });
  }, [usuarios, busca]);

  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter((u) => u.ativo).length;
  const administradores = usuarios.filter(
    (u) => u.perfil === "Administrador"
  ).length;

  return (
    <div className="usuarios-tab">

      <div className="usuarios-tab-header">

        <div>
          <h4>Gerenciamento de Usuários</h4>
          <p>Controle de acesso dos usuários da aplicação.</p>
        </div>

        <button className="btn btn-primary" onClick={novoUsuario}>
          <UserPlus size={18} />
          Novo Usuário
        </button>

      </div>

      {/* MÉTRICAS */}

      <div className="usuarios-tab-metricas">

        <div className="usuario-metrica-card">
          <span>Total de Usuários</span>
          <strong>{totalUsuarios}</strong>
        </div>

        <div className="usuario-metrica-card success">
          <span>Usuários Ativos</span>
          <strong>{usuariosAtivos}</strong>
        </div>

        <div className="usuario-metrica-card warning">
          <span>Administradores</span>
          <strong>{administradores}</strong>
        </div>

      </div>

      {/* PESQUISA */}

      <div className="usuarios-search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Pesquisar usuário, login ou perfil..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

      </div>

      {/* TABELA */}

      <div className="usuarios-table-container">

        <table className="table align-middle usuarios-table">

          <thead>

            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Perfil</th>
              <th>Status</th>
              <th style={{ width: 180 }}>Ações</th>
            </tr>

          </thead>

          <tbody>

            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="usuarios-empty-row">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>

                  <td>
                    <div className="usuario-info">

                      <div className="usuario-avatar">
                        {usuario.nome.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{usuario.nome}</strong>
                        <span>ID: {usuario.id}</span>
                      </div>

                    </div>
                  </td>

                  <td>{usuario.usuario}</td>

                  <td>
                    <RoleBadge perfil={usuario.perfil} />
                  </td>

                  <td>
                    {usuario.ativo ? (
                      <span className="status-badge ativo">
                        <CircleCheck size={14} />
                        Ativo
                      </span>
                    ) : (
                      <span className="status-badge inativo">
                        <CircleX size={14} />
                        Inativo
                      </span>
                    )}
                  </td>

                  <td>

                    <div className="usuario-acoes">

                      <button
                        className="btn btn-sm btn-outline-success"
                        title="Ativar / Desativar"
                        onClick={() => alternarStatus(usuario.id)}
                      >
                        <ShieldCheck size={16} />
                      </button>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Editar Usuário"
                        onClick={() => editarUsuario(usuario)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Excluir Usuário"
                        onClick={() => excluirUsuario(usuario.id)}
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

      <UserModal
        open={modalAberto}
        usuario={usuarioSelecionado}
        onClose={() => {
          setModalAberto(false);
          setUsuarioSelecionado(null);
        }}
        onSave={() => {
          carregarUsuarios();
          setModalAberto(false);
          setUsuarioSelecionado(null);
        }}
      />

    </div>
  );
}

export default UsuariosTab;
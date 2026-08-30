import { useMemo, useState } from "react";
import { UserPlus, Pencil, Trash2, Power, Shield } from "lucide-react";

import AuthService from "../../services/AuthService";

import PageHeader from "../../ui/PageHeader";
import MetricCard from "../../ui/MetricCard";
import SearchInput from "../../ui/SearchInput";
import DataTable from "../../ui/DataTable";

import UserModal from "./UserModal";
import RoleBadge from "./RoleBadge";

import "./Usuarios.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState(() => AuthService.listarUsuarios() ?? []);
    const [busca, setBusca] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEdicao, setUsuarioEdicao] = useState(null);

    const usuariosFiltrados = useMemo(() => {
        const texto = busca.trim().toLowerCase();
        return usuarios.filter((usuario) => {
            const nome = usuario.nome ?? "";
            const login = usuario.usuario ?? "";
            return (
                nome.toLowerCase().includes(texto) ||
                login.toLowerCase().includes(texto)
            );
        });
    }, [usuarios, busca]);

    const metricas = useMemo(() => {
        return {
            total: usuarios.length,
            administradores: usuarios.filter(
                (u) => u.perfil === "Administrador"
            ).length,
            tecnicos: usuarios.filter(
                (u) => u.perfil === "Tecnico"
            ).length,
            leitura: usuarios.filter(
                (u) => u.perfil === "Leitura"
            ).length,
        };
    }, [usuarios]);


    function atualizarLista() {
        setUsuarios(AuthService.listarUsuarios() ?? []);
    }


    function abrirNovoUsuario() {
        setUsuarioEdicao(null);
        setModalAberto(true);
    }

    function editarUsuario(usuario) {
        setUsuarioEdicao(usuario);
        setModalAberto(true);
    }


    function alternarStatus(usuario) {
        AuthService.atualizarUsuario(usuario.id, {
            ativo: !usuario.ativo,
        });

        atualizarLista();
    }

    function excluirUsuario(usuario) {
        if (
            window.confirm(
                `Deseja excluir o usuário ${usuario.nome}?`
            )
        ) {
            AuthService.removerUsuario(usuario.id);
            atualizarLista();
        }
    }

    const columns = [
        {
            key: "nome",
            label: "Nome",
            sortable: true,
        },
        {
            key: "usuario",
            label: "Usuário",
            sortable: true,
        },
        {
            key: "perfil",
            label: "Perfil",
            render: (row) => (
                <RoleBadge perfil={row.perfil} />
            ),
        },
        {
            key: "ativo",
            label: "Status",
            render: (row) => (
                <span className={row.ativo ? "status-ativo" : "status-inativo"}>
                    {row.ativo ? "Ativo" : "Inativo"}
                </span>
            ),
        },
        {
            key: "acoes",
            label: "Ações",
            render: (row) => (
                <div className="usuario-acoes">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => editarUsuario(row)}
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => alternarStatus(row)}
                    >
                        <Power size={16} />
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => excluirUsuario(row)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="usuarios-page">

            <PageHeader
                title="Gerenciamento de Usuários"
                subtitle="Administradores, Técnicos e Usuários de Leitura."
            >
                <button
                    className="btn btn-primary"
                    onClick={abrirNovoUsuario}
                >
                    <UserPlus size={18} />
                    Novo Usuário
                </button>
            </PageHeader>

            <div className="row g-4 mb-4">

                <div className="col-md-6 col-xl-3">
                    <MetricCard
                        title="Total de Usuários"
                        value={metricas.total}
                        icon={Shield}
                        color="primary"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <MetricCard
                        title="Administradores"
                        value={metricas.administradores}
                        icon={Shield}
                        color="danger"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <MetricCard
                        title="Técnicos"
                        value={metricas.tecnicos}
                        icon={Shield}
                        color="success"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <MetricCard
                        title="Somente Leitura"
                        value={metricas.leitura}
                        icon={Shield}
                        color="info"
                    />
                </div>

            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">

                    <SearchInput
                        value={busca}
                        onChange={setBusca}
                        placeholder="Pesquisar por nome ou usuário..."
                    />

                </div>
            </div>
            {/* =======================================================
          TABELA DE USUÁRIOS
      ======================================================= */}

            <div className="card shadow-sm usuarios-card">

                <div className="card-header usuarios-card-header">
                    <h5>Usuários Cadastrados ({usuariosFiltrados.length})</h5>
                </div>

                <div className="card-body p-0">

                    <DataTable
                        columns={columns}
                        data={usuariosFiltrados}
                        emptyMessage="Nenhum usuário encontrado."
                    />

                </div>

            </div>

            {/* =======================================================
          MODAL DE CADASTRO / EDIÇÃO
      ======================================================= */}

            <UserModal
                open={modalAberto}
                usuario={usuarioEdicao}
                onClose={() => {
                    setModalAberto(false);
                    setUsuarioEdicao(null);
                }}
                onSave={() => {
                    atualizarLista();
                    setModalAberto(false);
                    setUsuarioEdicao(null);
                }}
            />

        </div>
    );
}

export default Usuarios;
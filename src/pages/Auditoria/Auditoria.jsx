import { useMemo, useState } from "react";
import { Download, Filter } from "lucide-react";

import { useAuditoria } from "../../context/AuditoriaContext";

import PageHeader from "../../ui/PageHeader";
import SearchInput from "../../ui/SearchInput";
import DataTable from "../../ui/DataTable";

import "./Auditoria.css";

function Auditoria() {
    const { logs: auditoria } = useAuditoria();

    const [busca, setBusca] = useState("");
    const [acaoFiltro, setAcaoFiltro] = useState("Todos");

    const logsFiltrados = useMemo(() => {
        return auditoria.filter((log) => {
            const texto = busca.toLowerCase();

            const correspondeBusca =
                log.usuario?.toLowerCase().includes(texto) ||
                log.patrimonio?.toLowerCase().includes(texto) ||
                log.hostname?.toLowerCase().includes(texto) ||
                log.serviceTag?.toLowerCase().includes(texto);

            const correspondeAcao =
                acaoFiltro === "Todos" || log.acao === acaoFiltro;

            return correspondeBusca && correspondeAcao;
        });
    }, [auditoria, busca, acaoFiltro]);

    const columns = [
        {
            key: "data",
            label: "Data/Hora",
            sortable: true,
            render: (row) =>
                new Date(row.data).toLocaleString("pt-BR"),
        },
        {
            key: "usuario",
            label: "Usuário",
            sortable: true,
        },
        {
            key: "acao",
            label: "Ação",
            sortable: true,
        },
        {
            key: "origem",
            label: "Origem",
            sortable: true,
        },
        {
            key: "patrimonio",
            label: "Patrimônio",
            sortable: true,
        },
        {
            key: "hostname",
            label: "Hostname",
            sortable: true,
        },
    ];

    return (
        <div className="auditoria-page">
            <PageHeader
                title="Auditoria Global"
                subtitle="Histórico completo de ações realizadas no Controle Staging."
            />

            <div className="card shadow-sm mb-4">
                <div className="card-body auditoria-filtros">

                    <SearchInput
                        value={busca}
                        onChange={setBusca}
                        placeholder="Pesquisar usuário, patrimônio, hostname ou TAG..."
                    />

                    <div className="auditoria-select">
                        <Filter size={16} />

                        <select
                            value={acaoFiltro}
                            onChange={(e) => setAcaoFiltro(e.target.value)}
                        >
                            <option value="Todos">Todas as ações</option>
                            <option value="Cadastro">Cadastro</option>
                            <option value="Edição">Edição</option>
                            <option value="Exclusão">Exclusão</option>
                            <option value="Login">Login</option>
                            <option value="Logout">Logout</option>
                            <option value="Backup">Backup</option>
                            <option value="Importação Excel">Importação Excel</option>
                        </select>
                    </div>

                    <button className="btn btn-success ml-auto text-center">
                        <Download size={16} />
                         Exportar Logs
                    </button>

                </div>
            </div>
            <div className="card shadow-sm auditoria-card">
                <div className="card-header auditoria-card-header">
                    <h5 className="mb-0">
                        Histórico de Eventos ({logsFiltrados.length})
                    </h5>
                </div>

                <div className="card-body p-0">
                    <DataTable
                        columns={columns}
                        data={[...logsFiltrados].sort(
                            (a, b) => new Date(b.data) - new Date(a.data)
                        )}
                        emptyMessage="Nenhum evento encontrado."
                    />
                </div>
            </div>
        </div>
    );
}

export default Auditoria;
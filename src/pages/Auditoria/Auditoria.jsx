import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { useAuditoria } from "../../context/AuditoriaContext";
import AuditBadge from "../../components/AuditBadge/AuditBadge";

import "./Auditoria.css";

function Auditoria() {

    const { logs } = useAuditoria();

    const [pesquisa, setPesquisa] = useState("");

    const logsFiltrados = useMemo(() => {

        const texto = pesquisa.toLowerCase();

        return logs.filter((log) => {

            return (
                log.acao.toLowerCase().includes(texto) ||
                log.usuario.toLowerCase().includes(texto) ||
                log.patrimonio.toLowerCase().includes(texto) ||
                log.hostname.toLowerCase().includes(texto) ||
                log.detalhes.toLowerCase().includes(texto)
            );

        });

    }, [logs, pesquisa]);

    function formatarData(data) {

        return new Date(data).toLocaleString("pt-BR");

    }

    const eventosHoje = logs.filter((log) => {

        const hoje = new Date().toLocaleDateString("pt-BR");
        const dataLog = new Date(log.data).toLocaleDateString("pt-BR");

        return hoje === dataLog;

    }).length;

    return (

        <div className="auditoria-page">

            <div className="auditoria-header">

                <div>

                    <h2>Auditoria do Sistema</h2>

                    <p>
                        Histórico global de todas as ações realizadas.
                    </p>

                </div>

            </div>

            {/* Cards */}

            <div className="row g-4 mb-4">

                <div className="col-md-6">

                    <div className="audit-card">

                        <span>Total de Eventos</span>

                        <h2>{logs.length}</h2>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="audit-card">

                        <span>Eventos Hoje</span>

                        <h2>{eventosHoje}</h2>

                    </div>

                </div>

            </div>

            {/* Pesquisa */}

            <div className="audit-search mb-4">

                <Search size={18}/>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar patrimônio, hostname, usuário, ação..."
                    value={pesquisa}
                    onChange={(e) =>
                        setPesquisa(e.target.value)
                    }
                />

            </div>

            {/* Tabela */}

            <div className="audit-table table-responsive">

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>Data / Hora</th>

                            <th>Usuário</th>

                            <th>Ação</th>

                            <th>Patrimônio</th>

                            <th>Hostname</th>

                            <th>Detalhes</th>

                        </tr>

                    </thead>

                    <tbody>

                        {logsFiltrados.length === 0 ? (

                            <tr>

                                <td colSpan="6">

                                    <div className="text-center py-4 text-muted">

                                        Nenhum evento encontrado.

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            logsFiltrados.map((log) => (

                                <tr key={log.id}>

                                    <td>{formatarData(log.data)}</td>

                                    <td>{log.usuario}</td>

                                    <td>

                                        <AuditBadge acao={log.acao}/>

                                    </td>

                                    <td>{log.patrimonio || "-"}</td>

                                    <td>{log.hostname || "-"}</td>

                                    <td>{log.detalhes || "-"}</td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Auditoria;


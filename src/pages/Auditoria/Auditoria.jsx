import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { useAuditoria } from "../../context/AuditoriaContext";
import AuditBadge from "../../components/AuditBadge/AuditBadge";
import AuditTimeline from "../../components/AuditTimeline";

import { exportarRegistrosExcel } from "../../services/ExcelService";



import "./Auditoria.css";

function Auditoria() {

    const { logs } = useAuditoria();

    const [pesquisa, setPesquisa] = useState("");

    const [visualizacao, setVisualizacao] = useState("tabela");
    
    const [filtroAcao, setFiltroAcao] = useState("Todos");
    const [filtroPeriodo, setFiltroPeriodo] = useState("Todos");

   
    const listaAcoes = [
        "Todos",
        "Equipamento cadastrado",
        "Equipamento atualizado",
        "Status alterado",
        "Equipamento removido",
        "Importação em massa"
    ];

 
    const logsFiltrados = useMemo(() => {

        return logs.filter((log) => {

            const texto = pesquisa.toLowerCase();

            const pesquisaValida =
                log.acao.toLowerCase().includes(texto) ||
                log.usuario.toLowerCase().includes(texto) ||
                log.patrimonio.toLowerCase().includes(texto) ||
                log.hostname.toLowerCase().includes(texto) ||
                log.detalhes.toLowerCase().includes(texto);

            const acaoValida =
                filtroAcao === "Todos"
                    ? true
                    : log.acao === filtroAcao;

            const dataLog = new Date(log.data);
            const hoje = new Date();

            let periodoValido = true;

            if (filtroPeriodo === "Hoje") {

                periodoValido =
                    dataLog.toLocaleDateString("pt-BR") ===
                    hoje.toLocaleDateString("pt-BR");

            }

            if (filtroPeriodo === "7 dias") {

                const seteDias = new Date();
                seteDias.setDate(hoje.getDate() - 7);

                periodoValido = dataLog >= seteDias;

            }

            if (filtroPeriodo === "30 dias") {

                const trintaDias = new Date();
                trintaDias.setDate(hoje.getDate() - 30);

                periodoValido = dataLog >= trintaDias;

            }

            return pesquisaValida && acaoValida && periodoValido;

        });

    }, [logs, pesquisa, filtroAcao, filtroPeriodo]);

    <segmented-control
        block
        options={[
            { label: "Tabela", value: "tabela" },
            { label: "Timeline", value: "timeline" }
        ]}
        value={visualizacao}
        onChange={setVisualizacao}
    />

    function formatarData(data) {

        return new Date(data).toLocaleString("pt-BR");

    }

    const eventosHoje = logs.filter((log) => {

        const hoje = new Date().toLocaleDateString("pt-BR");
        const dataLog = new Date(log.data).toLocaleDateString("pt-BR");

        return hoje === dataLog;

    }).length;

   
    const metricas = useMemo(() => {

        return {

            total: logs.length,

            hoje: logs.filter((log) =>
                new Date(log.data).toLocaleDateString("pt-BR") ===
                new Date().toLocaleDateString("pt-BR")
            ).length,

            cadastro: logs.filter((log) =>
                log.acao === "Equipamento cadastrado"
            ).length,

            exclusao: logs.filter((log) =>
                log.acao === "Equipamento removido"
            ).length

        };

    }, [logs]);

    
        function exportarAuditoria() {

            exportarRegistrosExcel({

                dados: logsFiltrados,

                nomeArquivo:
                    `AUDITORIA_${
                        new Date()
                            .toLocaleDateString("pt-BR")
                            .replace(/\//g, "-")
                    }`,

                colunas: [

                    {
                        titulo:"Data/Hora",
                        campo:"data"
                    },

                    {
                        titulo:"Usuário",
                        campo:"usuario"
                    },

                    {
                        titulo:"Ação",
                        campo:"acao"
                    },

                    {
                        titulo:"Patrimônio",
                        campo:"patrimonio"
                    },

                    {
                        titulo:"Hostname",
                        campo:"hostname"
                    },

                    {
                        titulo:"Detalhes",
                        campo:"detalhes"
                    }

                ]

            });

        }

    return (

        <div className="auditoria-page">

            
            <div className="auditoria-header">

                <div>

                    <h2>Auditoria do Sistema</h2>

                    <p>
                        Histórico global das ações realizadas no sistema.
                    </p>

                </div>

                <button
                    className="btn btn-success"
                    onClick={exportarAuditoria}
                >
                    Exportar Excel
                </button>

            </div>



            {/* Cards */}

        
            <div className="row g-4 mb-4">

                <div className="col-lg-3 col-md-6">

                    <div className="audit-card card-blue">

                        <span>Total Eventos</span>

                        <h2>{metricas.total}</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="audit-card card-green">

                        <span>Eventos Hoje</span>

                        <h2>{metricas.hoje}</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="audit-card card-orange">

                        <span>Cadastros</span>

                        <h2>{metricas.cadastro}</h2>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="audit-card card-red">

                        <span>Exclusões</span>

                        <h2>{metricas.exclusao}</h2>

                    </div>

                </div>

            </div>


            {/* BARRA DE FILTROS */}
            <div className="audit-filters mb-4">

                <input
                    type="text"
                    className="form-control "
                    placeholder="Pesquisar patrimônio, hostname, usuário..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

                <select
                    className="form-select "
                    value={filtroAcao}
                    onChange={(e) => setFiltroAcao(e.target.value)}
                >

                    {listaAcoes.map((acao) => (
                        <option
                            key={acao}
                            value={acao}
                        >
                            {acao}
                        </option>
                    ))}

                </select>

                <select
                    className="form-select "
                    value={filtroPeriodo}
                    onChange={(e) => setFiltroPeriodo(e.target.value)}
                >

                    <option>Todos</option>
                    <option>Hoje</option>
                    <option>7 dias</option>
                    <option>30 dias</option>

                </select>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => {

                        setPesquisa("");
                        setFiltroAcao("Todos");
                        setFiltroPeriodo("Todos");

                    }}
                >
                    Limpar
                </button>

            </div>
            {/* TIMELINE */}

            <div className="audit-view-switch">

                <button
                    className={
                        visualizacao === "tabela"
                            ? "active"
                            : ""
                    }
                    onClick={() => setVisualizacao("tabela")}
                >
                    Tabela
                </button>

                <button
                    className={
                        visualizacao === "timeline"
                            ? "active"
                            : ""
                    }
                    onClick={() => setVisualizacao("timeline")}
                >
                    Timeline
                </button>

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


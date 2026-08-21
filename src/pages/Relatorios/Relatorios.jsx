import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRegistros } from "../../context/RegistroContext";
import ConfirmModal from "../../components/ConfirmModal";

import { exportarRegistrosExcel } from "../../services";

function Relatorios() {

    const {
        registros,
        removerRegistro,
        mostrarMensagem
    } = useRegistros();

    const navigate = useNavigate();

    // ==========================================
    // ESTADOS
    // ==========================================

    const [modalOpen, setModalOpen] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState(null);

    const [pesquisa, setPesquisa] = useState("");

    const [filtroStatus, setFiltroStatus] = useState("");
    const [filtroMarca, setFiltroMarca] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroResponsavel, setFiltroResponsavel] = useState("");

    const [ordenarPor, setOrdenarPor] = useState("patrimonio");
    const [ordem, setOrdem] = useState("asc");

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);

    // ==========================================
    // RESET PAGINA AO FILTRAR
    // ==========================================

    useEffect(() => {
        setPaginaAtual(1);
    }, [
        pesquisa,
        filtroStatus,
        filtroMarca,
        filtroTipo,
        filtroResponsavel
    ]);

    // ==========================================
    // EDITAR
    // ==========================================

    function editarRegistro(registro) {
        navigate("/novo", {
            state: { registro }
        });
    }

    // ==========================================
    // EXCLUSÃO
    // ==========================================

    function abrirModalExclusao(registro) {
        setRegistroSelecionado(registro);
        setModalOpen(true);
    }

    function cancelarExclusao() {
        setModalOpen(false);
        setRegistroSelecionado(null);
    }

    function confirmarExclusao() {

        if (!registroSelecionado) return;

        removerRegistro(registroSelecionado.id);

        mostrarMensagem(
            "success",
            `Registro do patrimônio ${registroSelecionado.patrimonio} excluído com sucesso.`
        );

        cancelarExclusao();

    }

    // ==========================================
    // PESQUISA + FILTROS
    // ==========================================

    const registrosFiltrados = useMemo(() => {

        const texto = pesquisa.toLowerCase();

        return registros.filter((registro) => {

            const pesquisaOk =
                (registro.patrimonio || "").toLowerCase().includes(texto) ||
                (registro.serial || "").toLowerCase().includes(texto) ||
                (registro.modelo || "").toLowerCase().includes(texto) ||
                (registro.marca || "").toLowerCase().includes(texto) ||
                (registro.tipo || "").toLowerCase().includes(texto) ||
                (registro.responsavel || "").toLowerCase().includes(texto);

            const statusOk =
                !filtroStatus || registro.status === filtroStatus;

            const marcaOk =
                !filtroMarca || registro.marca === filtroMarca;

            const tipoOk =
                !filtroTipo || registro.tipo === filtroTipo;

            const responsavelOk =
                !filtroResponsavel ||
                registro.responsavel === filtroResponsavel;

            return (
                pesquisaOk &&
                statusOk &&
                marcaOk &&
                tipoOk &&
                responsavelOk
            );

        });

    }, [
        registros,
        pesquisa,
        filtroStatus,
        filtroMarca,
        filtroTipo,
        filtroResponsavel
    ]);

    // ==========================================
    // ORDENAÇÃO
    // ==========================================

    function alterarOrdenacao(campo) {

        if (ordenarPor === campo) {

            setOrdem(ordem === "asc" ? "desc" : "asc");

        } else {

            setOrdenarPor(campo);
            setOrdem("asc");

        }

    }

    const registrosOrdenados = useMemo(() => {

        return [...registrosFiltrados].sort((a, b) => {

            const valorA = (a[ordenarPor] || "")
                .toString()
                .toLowerCase();

            const valorB = (b[ordenarPor] || "")
                .toString()
                .toLowerCase();

            return ordem === "asc"
                ? valorA.localeCompare(valorB)
                : valorB.localeCompare(valorA);

        });

    }, [registrosFiltrados, ordenarPor, ordem]);

    // ==========================================
    // PAGINAÇÃO
    // ==========================================

    const totalPaginas = Math.max(
        1,
        Math.ceil(registrosOrdenados.length / itensPorPagina)
    );

    const registrosPaginados = registrosOrdenados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina
    );

    // ==========================================
    // FORMATAR DATA
    // ==========================================

    function formatarData(data) {

        if (!data) return "-";

        const [ano, mes, dia] = data.split("-");

        return `${dia}/${mes}/${ano}`;

    }

    function badgeStatus(status) {

        switch (status) {

            case "Concluído":
                return "bg-success";

            case "Em andamento":
                return "bg-warning text-dark";

            default:
                return "bg-secondary";

        }

    }

    // ==========================================
    // LIMPAR FILTROS
    // ==========================================

    function limparFiltros() {

        setPesquisa("");
        setFiltroStatus("");
        setFiltroMarca("");
        setFiltroTipo("");
        setFiltroResponsavel("");

    }

    // ==========================================
    // EXCEL
    // ==========================================


    function exportarExcel() {
        exportarRegistrosExcel(registrosOrdenados);
    }

    // ==========================================
    // INTERFACE
    // ==========================================

    return (

        <div>

            {/* Cabeçalho */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="mb-0">
                        Relatórios
                    </h2>

                    <small className="text-muted">
                        {registrosFiltrados.length} registro(s) encontrado(s)
                    </small>

                </div>

                <div className="d-flex gap-2">

                    <span className="badge bg-primary fs-6 align-self-center">
                        Total: {registros.length}
                    </span>

                    <button
                        className="btn btn-success"
                        onClick={exportarExcel}
                    >
                        📥 Exportar Excel
                    </button>

                </div>

            </div>

            {/* Pesquisa */}

            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar patrimônio, serial, marca, modelo..."
                        value={pesquisa}
                        onChange={(e) =>
                            setPesquisa(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Filtros */}

            <div className="row g-3 mb-3">

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={filtroStatus}
                        onChange={(e) =>
                            setFiltroStatus(e.target.value)
                        }
                    >
                        <option value="">
                            Todos os Status
                        </option>

                        <option value="Pendente">
                            Pendente
                        </option>

                        <option value="Em andamento">
                            Em andamento
                        </option>

                        <option value="Concluído">
                            Concluído
                        </option>

                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={filtroMarca}
                        onChange={(e) =>
                            setFiltroMarca(e.target.value)
                        }
                    >
                        <option value="">
                            Todas as Marcas
                        </option>

                        <option>Dell</option>
                        <option>Lenovo</option>
                        <option>HP</option>
                        <option>Apple</option>

                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={filtroTipo}
                        onChange={(e) =>
                            setFiltroTipo(e.target.value)
                        }
                    >
                        <option value="">
                            Todos os Tipos
                        </option>

                        <option>Notebook</option>
                        <option>Desktop</option>
                        <option>Monitor</option>

                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={filtroResponsavel}
                        onChange={(e) =>
                            setFiltroResponsavel(e.target.value)
                        }
                    >
                        <option value="">
                            Todos os Responsáveis
                        </option>

                        <option>TI</option>
                        <option>Infraestrutura</option>
                        <option>Suporte</option>

                    </select>

                </div>

            </div>

            <div className="mb-4">

                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={limparFiltros}
                >
                    Limpar filtros
                </button>

            </div>

            {/* Tabela */}

            {registrosFiltrados.length === 0 ? (

                <div className="alert alert-info">
                    Nenhum registro encontrado.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("patrimonio")
                                    }
                                >
                                    Patrimônio{" "}
                                    {ordenarPor === "patrimonio"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("serial")
                                    }
                                >
                                    Serial{" "}
                                    {ordenarPor === "serial"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("tipo")
                                    }
                                >
                                    Tipo{" "}
                                    {ordenarPor === "tipo"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("marca")
                                    }
                                >
                                    Marca{" "}
                                    {ordenarPor === "marca"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th>Modelo</th>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("status")
                                    }
                                >
                                    Status{" "}
                                    {ordenarPor === "status"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        alterarOrdenacao("responsavel")
                                    }
                                >
                                    Responsável{" "}
                                    {ordenarPor === "responsavel"
                                        ? ordem === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </th>

                                <th>Data Solicitação</th>

                                <th width="180">
                                    Ações
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {registrosPaginados.map((registro) => (

                                <tr key={registro.id}>

                                    <td>{registro.patrimonio}</td>

                                    <td>{registro.serial}</td>

                                    <td>{registro.tipo}</td>

                                    <td>{registro.marca}</td>

                                    <td>{registro.modelo || "-"}</td>

                                    <td>

                                        <span
                                            className={`badge ${badgeStatus(
                                                registro.status
                                            )}`}
                                        >
                                            {registro.status}
                                        </span>

                                    </td>

                                    <td>{registro.responsavel}</td>

                                    <td>
                                        {formatarData(
                                            registro.dataSolicitacao
                                        )}
                                    </td>

                                    <td>

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    editarRegistro(registro)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    abrirModalExclusao(registro)
                                                }
                                            >
                                                Excluir
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

            {/* Paginação */}

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">

                <div className="d-flex align-items-center gap-2">

                    <label className="mb-0">
                        Itens por página
                    </label>

                    <select
                        className="form-select form-select-sm"
                        style={{ width: "90px" }}
                        value={itensPorPagina}
                        onChange={(e) => {
                            setItensPorPagina(Number(e.target.value));
                            setPaginaAtual(1);
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                </div>

                <div className="d-flex align-items-center gap-2">

                    <button
                        className="btn btn-outline-primary btn-sm"
                        disabled={paginaAtual === 1}
                        onClick={() =>
                            setPaginaAtual((pagina) => pagina - 1)
                        }
                    >
                        Anterior
                    </button>

                    <span>
                        Página <strong>{paginaAtual}</strong> de{" "}
                        <strong>{totalPaginas}</strong>
                    </span>

                    <button
                        className="btn btn-outline-primary btn-sm"
                        disabled={paginaAtual >= totalPaginas}
                        onClick={() =>
                            setPaginaAtual((pagina) => pagina + 1)
                        }
                    >
                        Próxima
                    </button>

                </div>

            </div>

            {/* Modal */}

            <ConfirmModal
                open={modalOpen}
                title="Excluir Registro"
                message={
                    registroSelecionado
                        ? `Deseja realmente excluir o patrimônio ${registroSelecionado.patrimonio}?`
                        : ""
                }
                confirmText="Excluir Registro"
                cancelText="Cancelar"
                onCancel={cancelarExclusao}
                onConfirm={confirmarExclusao}
            />

        </div>

    );

}

export default Relatorios;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegistros } from "../../context/RegistroContext";
import ConfirmModal from "../../components/ConfirmModal";

function Relatorios() {

    const {
        registros,
        removerRegistro,
        mostrarMensagem
    } = useRegistros();

    const navigate = useNavigate();

    // =====================================================
    // ESTADOS DO MODAL
    // =====================================================

    const [modalOpen, setModalOpen] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState(null);

    // =====================================================
    // EDITAR REGISTRO
    // =====================================================

    function editarRegistro(registro) {

        navigate("/novo", {
            state: {
                registro
            }
        });

    }

    // =====================================================
    // ABRIR MODAL DE EXCLUSÃO
    // =====================================================

    function abrirModalExclusao(registro) {

        setRegistroSelecionado(registro);
        setModalOpen(true);

    }

    // =====================================================
    // CONFIRMAR EXCLUSÃO
    // =====================================================

    function confirmarExclusao() {

        if (!registroSelecionado) return;

        removerRegistro(registroSelecionado.id);

        mostrarMensagem(
            "success",
            `Registro do patrimônio ${registroSelecionado.patrimonio} excluído com sucesso.`
        );

        setModalOpen(false);
        setRegistroSelecionado(null);

    }

    // =====================================================
    // CANCELAR EXCLUSÃO
    // =====================================================

    function cancelarExclusao() {

        setModalOpen(false);
        setRegistroSelecionado(null);

    }

    // =====================================================
    // FORMATAR DATA
    // =====================================================

    function formatarData(data) {

        if (!data) return "-";

        const [ano, mes, dia] = data.split("-");

        return `${dia}/${mes}/${ano}`;

    }

    // =====================================================
    // RETORNO
    // =====================================================

    return (

        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Relatórios</h2>

                <span className="badge bg-secondary fs-6">
                    {registros.length} registro(s)
                </span>

            </div>

            {registros.length === 0 ? (

                <div className="alert alert-info">
                    Nenhum registro cadastrado.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-hover align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>Patrimônio</th>
                                <th>Serial</th>
                                <th>Tipo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Status</th>
                                <th>Responsável</th>
                                <th>Data Solicitação</th>
                                <th width="180">Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {registros.map((registro) => (

                                <tr key={registro.id}>

                                    <td>{registro.patrimonio || "-"}</td>

                                    <td>{registro.serial || "-"}</td>

                                    <td>{registro.tipo || "-"}</td>

                                    <td>{registro.marca || "-"}</td>

                                    <td>{registro.modelo || "-"}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                registro.status === "Concluído"
                                                    ? "bg-success"
                                                    : registro.status === "Em andamento"
                                                    ? "bg-warning text-dark"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {registro.status || "-"}
                                        </span>

                                    </td>

                                    <td>{registro.responsavel || "-"}</td>

                                    <td>{formatarData(registro.dataSolicitacao)}</td>

                                    <td>

                                        <div className="d-flex gap-2">

                                            {/* EDITAR */}

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary"
                                                onClick={() => editarRegistro(registro)}
                                            >
                                                Editar
                                            </button>

                                            {/* EXCLUIR */}

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => abrirModalExclusao(registro)}
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

            {/* =====================================================
                MODAL DE CONFIRMAÇÃO
            ====================================================== */}

            <ConfirmModal
                open={modalOpen}
                title="Confirmar exclusão"
                message={
                    registroSelecionado
                        ? `Deseja realmente excluir o patrimônio ${registroSelecionado.patrimonio}?`
                        : ""
                }
                onCancel={cancelarExclusao}
                onConfirm={confirmarExclusao}
            />

        </div>

    );

}

export default Relatorios;
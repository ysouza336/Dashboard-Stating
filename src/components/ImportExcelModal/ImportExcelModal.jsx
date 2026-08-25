import { useState } from "react";
import * as XLSX from "xlsx";

import { useRegistros } from "../../context/RegistroContext";

import { prepararImportacao } from "../../services/ImportExcelService";

import "./ImportExcelModal.css";

function ImportExcelModal({ open, onClose }) {

    const { registros, importarRegistros } = useRegistros();

    const [nomeArquivo, setNomeArquivo] = useState("");
    const [preview, setPreview] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [progresso, setProgresso] = useState(0);
    const [resultadoImportacao, setResultadoImportacao] = useState(null);

    const [mensagem, setMensagem] = useState(null);

    // ===============================================
    // EXIBIR MENSAGEM DE FEEDBACK
    // ===============================================

    function mostrarMensagem(tipo, texto) {
        setMensagem({ tipo, texto });
        setTimeout(() => setMensagem(null), 4000);
    }

    // ===============================================
    // FECHAR MODAL E LIMPAR ESTADOS
    // ===============================================

    function fecharModal() {
        setNomeArquivo("");
        setPreview([]);
        setCarregando(false);
        setProgresso(0);
        setResultadoImportacao(null);
        onClose();
    }

    // ===============================================
    // LER ARQUIVO EXCEL
    // ===============================================

    function lerArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setNomeArquivo(arquivo.name);
        setCarregando(true);
        setProgresso(0);
        setResultadoImportacao(null);

        const reader = new FileReader();

        reader.onload = (e) => {

            try {

                const workbook = XLSX.read(e.target.result, {
                    type: "binary"
                });

                const primeiraAba = workbook.SheetNames[0];

                const worksheet = workbook.Sheets[primeiraAba];

                const dados = XLSX.utils.sheet_to_json(worksheet, {
                    defval: ""
                });

                const resultado = prepararImportacao(
                    dados,
                    registros
                );

                setPreview(resultado.validos);
                setResultadoImportacao(resultado);

            } catch (error) {

                console.error(error);

                alert(
                    "Não foi possível ler a planilha selecionada."
                );

            } finally {

                setCarregando(false);

            }

        };

        reader.readAsBinaryString(arquivo);

    }

    // ===============================================
    // IMPORTAR REGISTROS (com barra de progresso)
    // ===============================================

    async function importar() {

        if (!resultadoImportacao?.validos.length) {

            alert("Nenhum registro válido encontrado.");

            return;

        }

        const registrosValidos = resultadoImportacao.validos;

        setProgresso(1);

        for (let i = 0; i < registrosValidos.length; i++) {

            const item = registrosValidos[i];

            importarRegistros([{

                patrimonio: item["Patrimônio"],
                serial: item["Serial"] || item["IMEI / Serial"] || "",
                tipo: item["Tipo"],
                marca: item["Marca"],
                modelo: item["Modelo"],

                hostname: item["Hostname"] || "",
                serviceTag: item["Service Tag"] || "",

                dataSolicitacao: item["Data Solicitação"] || "",
                solicitadoPor: item["Solicitado Por"] || "",

                tipoStaging: item["Tipo Staging"] || "",
                escopoStaging: item["Escopo"] || "",
                localStaging: item["Local"] || "",

                responsavel: item["Responsável"] || "",

                dataInicio: item["Data Início"] || "",
                dataConclusao: item["Data Conclusão"] || "",

                status: item["Status"] || "Pendente",

                observacao: item["Observação"] || ""

            }]);

            setProgresso(
                Math.round(((i + 1) / registrosValidos.length) * 100)
            );

            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => setTimeout(resolve, 10));

        }

        mostrarMensagem(
            "success",
            `${registrosValidos.length} equipamentos importados com sucesso.`
        );

        setTimeout(() => {
            fecharModal();
        }, 600);

    }

    // ===============================================
    // NÃO EXIBE MODAL FECHADO
    // ===============================================

    if (!open) return null;

    const totalEncontrado =
        (resultadoImportacao?.validos.length || 0) +
        (resultadoImportacao?.erros.length || 0);

    const importando = progresso > 0 && progresso < 100;

    return (

        <div className="modal-overlay">

            <div className="modal-import">

                {/* Cabeçalho */}

                <div className="modal-header-import d-flex justify-content-between">

                    <div>

                        <h4 className="mb-0">
                            Importar Planilha Excel
                        </h4>

                        <small className="text-muted">
                            Controle de Staging • Cadastro em Massa
                        </small>

                    </div>

                    <button
                        className="btn-close"
                        onClick={fecharModal}
                    />

                </div>

                <hr />

                {/* Mensagem de feedback */}

                {mensagem && (

                    <div
                        className={`alert alert-${
                            mensagem.tipo === "success" ? "success" : "danger"
                        }`}
                    >
                        {mensagem.texto}
                    </div>

                )}

                {/* Upload */}

                <div className="mb-3">

                    <label className="form-label">
                        Selecione uma planilha (.xlsx)
                    </label>

                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        className="form-control"
                        onChange={lerArquivo}
                        disabled={importando}
                    />

                    {nomeArquivo && (

                        <div className="arquivo-selecionado mt-2">
                            📄 {nomeArquivo}
                        </div>

                    )}

                </div>

                {/* Loading leitura da planilha */}

                {carregando && (

                    <div className="text-center py-4">

                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        />

                        <p className="mb-0">
                            Lendo planilha...
                        </p>

                    </div>

                )}

                {/* Barra de progresso da importação */}

                {importando && (

                    <div className="mb-3">

                        <div className="d-flex justify-content-between mb-1">
                            <small>Importando registros...</small>
                            <small>{progresso}%</small>
                        </div>

                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                style={{ width: `${progresso}%` }}
                            />
                        </div>

                    </div>

                )}

                {/* Resumo */}

                {!carregando && resultadoImportacao && (

                    <div className="alert alert-light border">

                        <div className="d-flex justify-content-between flex-wrap">

                            <div>
                                <strong>Total encontrado:</strong>{" "}
                                {totalEncontrado}
                            </div>

                            <div className="text-success">
                                <strong>Válidos:</strong>{" "}
                                {resultadoImportacao.validos.length}
                            </div>

                            <div className="text-danger">
                                <strong>Com erro:</strong>{" "}
                                {resultadoImportacao.erros.length}
                            </div>

                        </div>

                    </div>

                )}

                {/* Prévia dos registros válidos */}

                {!carregando && preview.length > 0 && (

                    <>

                        <h6 className="mb-3">
                            Prévia da Importação
                        </h6>

                        <div className="preview-table">

                            <table className="table table-sm table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Patrimônio</th>

                                        <th>Marca</th>

                                        <th>Modelo</th>

                                        <th>Status</th>

                                        <th>Resultado</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {preview.map((item, index) => (

                                        <tr key={index}>

                                            <td>
                                                {item["Patrimônio"] || "-"}
                                            </td>

                                            <td>
                                                {item["Marca"] || "-"}
                                            </td>

                                            <td>
                                                {item["Modelo"] || "-"}
                                            </td>

                                            <td>
                                                {item["Status"] || "-"}
                                            </td>

                                            <td>
                                                <span className="badge bg-success">
                                                    Válido
                                                </span>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </>

                )}

                {/* Registros com erro */}

                {resultadoImportacao?.erros.length > 0 && (

                    <>

                        <hr />

                        <h6 className="text-danger">
                            Registros com erro ({resultadoImportacao.erros.length})
                        </h6>

                        <div className="preview-table">

                            <table className="table table-sm table-bordered">

                                <thead className="table-danger">

                                    <tr>
                                        <th>Linha</th>
                                        <th>Patrimônio</th>
                                        <th>Erro</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {resultadoImportacao.erros.map((erro, index) => (

                                        <tr key={index}>
                                            <td>{erro.linha}</td>
                                            <td>{erro.patrimonio || "-"}</td>
                                            <td>{erro.erros.join(", ")}</td>
                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </>

                )}

                {/* Rodapé */}

                <div className="d-flex justify-content-between align-items-center mt-4">

                    <small className="text-muted">
                        Apenas registros válidos serão importados.
                    </small>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-outline-secondary"
                            onClick={fecharModal}
                            disabled={importando}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-success"
                            disabled={
                                !resultadoImportacao?.validos.length || importando
                            }
                            onClick={importar}
                        >
                            Importar {resultadoImportacao?.validos.length || 0} Registro(s)
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ImportExcelModal;
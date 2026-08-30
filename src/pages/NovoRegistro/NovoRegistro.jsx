import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, RotateCcw } from "lucide-react";

// import {  registroSchema } from "../../schemas/registroSchema";
import { useRegistros } from "../../context/RegistroContext";

import PageHeader from "../../ui/PageHeader";

import "./NovoRegistro.css";

function NovoRegistro() {
    const navigate = useNavigate();
    const location = useLocation();

    const registroEdicao = location.state?.registroEmEdicao || null;

    const { adicionarRegistro, atualizarRegistro } = useRegistros();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registroSchema),
        defaultValues: {
            patrimonio: "",
            hostname: "",
            serviceTag: "",
            serial: "",
            tipo: "",
            marca: "",
            modelo: "",
            solicitadoPor: "",
            responsavel: "",
            status: "Pendente",
            observacao: "",
            dataSolicitacao: "",
            dataFinalizacao: "",
        },
    });

    useEffect(() => {
        if (registroEdicao) {
            reset(registroEdicao);
        }
    }, [registroEdicao, reset]);

    function onSubmit(data) {
        if (registroEdicao) {
            atualizarRegistro(registroEdicao.id, data);
        } else {
            adicionarRegistro(data);
        }

        navigate("/relatorios");
    }

    return (
        <div className="novo-registro-page">
            <PageHeader
                title={registroEdicao ? "Editar Registro" : "Novo Registro"}
                subtitle="Cadastro e atualização de equipamentos do inventário."
            />

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* =======================================================
            CARD 1 — IDENTIFICAÇÃO DO EQUIPAMENTO
        ======================================================= */}

                <div className="registro-card">

                    <div className="registro-card-header">
                        <h5>Identificação do Equipamento</h5>
                    </div>

                    <div className="registro-card-body">

                        <div className="row g-3">

                            <div className="col-md-4">

                                <label className="form-label">Patrimônio *</label>

                                <input
                                    className={`form-control ${errors.patrimonio ? "is-invalid" : ""
                                        }`}
                                    {...register("patrimonio")}
                                />

                                <div className="invalid-feedback">
                                    {errors.patrimonio?.message}
                                </div>

                            </div>

                            <div className="col-md-4">

                                <label className="form-label">Hostname *</label>

                                <input
                                    className={`form-control ${errors.hostname ? "is-invalid" : ""
                                        }`}
                                    placeholder="Ex.: BRCPQD123456"
                                    {...register("hostname")}
                                />

                                <div className="invalid-feedback">
                                    {errors.hostname?.message}
                                </div>

                            </div>

                            <div className="col-md-4">

                                <label className="form-label">Service TAG *</label>

                                <input
                                    className={`form-control ${errors.serviceTag ? "is-invalid" : ""
                                        }`}
                                    placeholder="Ex.: 8KJ4L2A"
                                    {...register("serviceTag")}
                                />

                                <div className="invalid-feedback">
                                    {errors.serviceTag?.message}
                                </div>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">Serial</label>

                                <input
                                    className="form-control"
                                    {...register("serial")}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">Modelo</label>

                                <input
                                    className="form-control"
                                    {...register("modelo")}
                                />

                            </div>

                        </div>

                    </div>

                </div>
                {/* =======================================================
            CARD 2 — INFORMAÇÕES DO EQUIPAMENTO
        ======================================================= */}

                <div className="registro-card">

                    <div className="registro-card-header">
                        <h5>Informações do Equipamento</h5>
                    </div>

                    <div className="registro-card-body">

                        <div className="row g-3">

                            <div className="col-md-4">
                                <label className="form-label">Tipo *</label>

                                <select
                                    className={`form-select ${errors.tipo ? "is-invalid" : ""
                                        }`}
                                    {...register("tipo")}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Notebook">Notebook</option>
                                    <option value="Desktop">Desktop</option>
                                    <option value="Monitor">Monitor</option>
                                    <option value="Dockstation">Dockstation</option>
                                    <option value="Impressora">Impressora</option>
                                    <option value="Outro">Outro</option>
                                </select>

                                <div className="invalid-feedback">
                                    {errors.tipo?.message}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Marca *</label>

                                <select
                                    className={`form-select ${errors.marca ? "is-invalid" : ""
                                        }`}
                                    {...register("marca")}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Dell">Dell</option>
                                    <option value="Lenovo">Lenovo</option>
                                    <option value="HP">HP</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="LG">LG</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Outro">Outro</option>
                                </select>

                                <div className="invalid-feedback">
                                    {errors.marca?.message}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Modelo *</label>

                                <input
                                    className={`form-control ${errors.modelo ? "is-invalid" : ""
                                        }`}
                                    placeholder="Ex.: Latitude 5450"
                                    {...register("modelo")}
                                />

                                <div className="invalid-feedback">
                                    {errors.modelo?.message}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* =======================================================
            CARD 3 — RESPONSÁVEIS
        ======================================================= */}

                <div className="registro-card">

                    <div className="registro-card-header">
                        <h5>Solicitação e Responsáveis</h5>
                    </div>

                    <div className="registro-card-body">

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Solicitado por *</label>

                                <input
                                    className={`form-control ${errors.solicitadoPor ? "is-invalid" : ""
                                        }`}
                                    placeholder="Nome do colaborador"
                                    {...register("solicitadoPor")}
                                />

                                <div className="invalid-feedback">
                                    {errors.solicitadoPor?.message}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Responsável *</label>

                                <input
                                    className={`form-control ${errors.responsavel ? "is-invalid" : ""
                                        }`}
                                    placeholder="Nome do técnico responsável"
                                    {...register("responsavel")}
                                />

                                <div className="invalid-feedback">
                                    {errors.responsavel?.message}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* =======================================================
            CARD 4 — STATUS E DATAS
        ======================================================= */}

                <div className="registro-card">

                    <div className="registro-card-header">
                        <h5>Status do Processo</h5>
                    </div>

                    <div className="registro-card-body">

                        <div className="row g-3">

                            <div className="col-md-4">
                                <label className="form-label">Status *</label>

                                <select
                                    className={`form-select ${errors.status ? "is-invalid" : ""
                                        }`}
                                    {...register("status")}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Data da Solicitação</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("dataSolicitacao")}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Data da Finalização</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("dataFinalizacao")}
                                />
                            </div>

                        </div>

                    </div>

                </div>
                {/* =======================================================
            CARD 5 — OBSERVAÇÕES
        ======================================================= */}

                <div className="registro-card">

                    <div className="registro-card-header">
                        <h5>Observações</h5>
                    </div>

                    <div className="registro-card-body">

                        <label className="form-label">Descrição / Observações</label>

                        <textarea
                            rows={5}
                            className="form-control"
                            placeholder="Ex.: Equipamento destinado ao colaborador da unidade Campinas, entregue com dockstation e carregador."
                            {...register("observacao")}
                        />

                    </div>

                </div>

                {/* =======================================================
            BOTÕES DE AÇÃO
        ======================================================= */}

                <div className="registro-acoes">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => reset()}
                    >
                        <RotateCcw size={18} />
                        Limpar Formulário
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => navigate("/relatorios")}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        <Save size={18} />
                        {registroEdicao ? "Salvar Alterações" : "Cadastrar Equipamento"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default NovoRegistro;    
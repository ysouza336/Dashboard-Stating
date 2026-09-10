import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, RotateCcw } from "lucide-react";

import useRegistroForm from "../../hooks/useRegistroForm";
import { useRegistros } from "../../context/RegistroContext";

import PageHeader from "../../ui/PageHeader";

import FormSection from "../../components/FormSection/FormSection";
import FormField from "../../components/FormField";
import SelectField from "../../components/SelectField/SelectField";
import DateInput from "../../components/DateInput";
import TextAreaField from "../../components/TextArea";

import { opcoesPorCampo as options } from "../../data/formSections";

import "./NovoRegistro.css";

function NovoRegistro() {
    const navigate = useNavigate();
    const location = useLocation();

    const registroEdicao = location.state?.registroEmEdicao ?? null;

    const { adicionarRegistro, atualizarRegistro } = useRegistros();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useRegistroForm();

    const patrimonio = watch("patrimonio");
    const hostname = watch("hostname");
    const marca = watch("marca");
    const modelo = watch("modelo");

    /* =====================================================
        CARREGA DADOS PARA EDIÇÃO
    ===================================================== */

    useEffect(() => {
        if (registroEdicao) {
            reset({
                patrimonio: registroEdicao.patrimonio || "",
                hostname: registroEdicao.hostname || "",
                serviceTag: registroEdicao.serviceTag || "",
                serial: registroEdicao.serial || "",
                tipo: registroEdicao.tipo || "",
                marca: registroEdicao.marca || "",
                modelo: registroEdicao.modelo || "",
                solicitadoPor: registroEdicao.solicitadoPor || "",
                responsavel: registroEdicao.responsavel || "",
                status: registroEdicao.status || "Pendente",
                dataSolicitacao: registroEdicao.dataSolicitacao || "",
                dataFinalizacao: registroEdicao.dataFinalizacao || "",
                observacao: registroEdicao.observacao || "",
            });
        }
    }, [registroEdicao, reset]);

    /* =====================================================
        GERAÇÃO AUTOMÁTICA DO HOSTNAME
        (apenas se estiver vazio)
    ===================================================== */

    useEffect(() => {
        if (!patrimonio) return;

        if (!hostname || hostname.trim() === "") {
            const hostnameGerado = `BRCPQD${String(patrimonio).trim()}`;
            setValue("hostname", hostnameGerado);
        }
    }, [patrimonio, hostname, setValue]);

    /* =====================================================
        LIMPEZA DA SERVICE TAG
        (NÃO COPIA MAIS O HOSTNAME)
    ===================================================== */

    useEffect(() => {
        const tagAtual = watch("serviceTag");

        if (tagAtual === hostname) {
            setValue("serviceTag", "");
        }
    }, [hostname, watch, setValue]);

    /* =====================================================
        SUBMIT DO FORMULÁRIO
    ===================================================== */

    const onSubmit = async (dados) => {
        const payload = {
            ...dados,
            hostname: dados.hostname.trim().toUpperCase(),
            serviceTag: dados.serviceTag.trim().toUpperCase(),
            marca: dados.marca.trim(),
            modelo: dados.modelo.trim(),
        };

        if (registroEdicao) {
            atualizarRegistro(registroEdicao.id, payload);
        } else {
            adicionarRegistro({
                ...payload,
                id: crypto.randomUUID(),
                criadoEm: new Date().toISOString(),
            });
        }

        reset();
        navigate("/relatorios");
    };

    const limparFormulario = () => {
        reset();
    };

    return (
        <div className="novo-registro-page">

            <PageHeader
                title={
                    registroEdicao
                        ? "Editar Equipamento"
                        : "Novo Cadastro de Equipamento"
                }
                subtitle="Cadastro e atualização do inventário corporativo."
            />

            <form
                className="registro-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* =====================================================
            SEÇÃO 1 — IDENTIFICAÇÃO DO EQUIPAMENTO
        ===================================================== */}

                <FormSection
                    title="Identificação do Equipamento"
                >
                    <div className="row g-3">

                        <div className="col-md-6">
                            <FormField
                                name="patrimonio"
                                label="Patrimônio"
                                register={register}
                                error={errors.patrimonio}
                                required
                                placeholder="Ex.: 123456"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                name="hostname"
                                label="Hostname"
                                register={register}
                                error={errors.hostname}
                                required
                                placeholder="Ex.: BRCPQD123456"
                            />
                        </div>

                    </div>
                </FormSection>

                {/* =====================================================
            SEÇÃO 2 — INFORMAÇÕES DO EQUIPAMENTO
        ===================================================== */}

                <FormSection
                    title="Informações do Equipamento"
                >
                    <div className="row g-3">

                        <div className="col-md-4">
                            <SelectField
                                name="tipo"
                                label="Tipo"
                                register={register}
                                error={errors.tipo}
                                options={options.tipo}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <SelectField
                                name="marca"
                                label="Marca"
                                register={register}
                                error={errors.marca}
                                options={options.marca}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <FormField
                                name="modelo"
                                label="Modelo"
                                register={register}
                                error={errors.modelo}
                                required
                                placeholder="Ex.: Latitude 5450"
                            />
                        </div>

                    </div>
                </FormSection>

                {/* =====================================================
            SEÇÃO 3 — SOLICITAÇÃO
        ===================================================== */}

                <FormSection
                    title="Solicitação e Responsável"
                >
                    <div className="row g-3">

                        <div className="col-md-6">
                            <SelectField
                                name="solicitadoPor"
                                label="Solicitado Por"
                                register={register}
                                error={errors.solicitadoPor}
                                options={options.solicitadoPor}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <SelectField
                                name="responsavel"
                                label="Responsável"
                                register={register}
                                error={errors.responsavel}
                                options={options.responsavel}
                                required
                            />
                        </div>

                    </div>
                </FormSection>

                {/* =====================================================
            SEÇÃO 4 — STAGING / IMPLANTAÇÃO
        ===================================================== */}

                <FormSection
                    title="Informações da Implantação"
                >
                    <div className="row g-3">

                        <div className="col-md-4">
                            <SelectField
                                name="tipoStaging"
                                label="Tipo de Staging"
                                register={register}
                                error={errors.tipoStaging}
                                options={options.tipoStaging}
                            />
                        </div>

                        <div className="col-md-4">
                            <SelectField
                                name="escopoStaging"
                                label="Escopo"
                                register={register}
                                error={errors.escopoStaging}
                                options={options.escopoStaging}
                            />
                        </div>

                        <div className="col-md-4">
                            <SelectField
                                name="localStaging"
                                label="Local"
                                register={register}
                                error={errors.localStaging}
                                options={options.localStaging}
                            />
                        </div>

                    </div>
                </FormSection>

                {/* =====================================================
            SEÇÃO 5 — STATUS E DATAS
        ===================================================== */}

                <FormSection
                    title="Status do Processo"
                >
                    <div className="row g-3">

                        <div className="col-md-4">
                            <SelectField
                                name="status"
                                label="Status"
                                register={register}
                                error={errors.status}
                                options={options.status}
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <DateInput
                                name="dataSolicitacao"
                                label="Data da Solicitação"
                                register={register}
                                error={errors.dataSolicitacao}
                            />
                        </div>

                        <div className="col-md-4">
                            <DateInput
                                name="dataFinalizacao"
                                label="Data da Finalização"
                                register={register}
                                error={errors.dataFinalizacao}
                            />
                        </div>

                    </div>
                </FormSection>
                {/* =====================================================
            SEÇÃO 6 — OBSERVAÇÕES
        ===================================================== */}

                <FormSection
                    title="Observações"
                >
                    <TextAreaField
                        name="observacao"
                        label="Observações"
                        register={register}
                        error={errors.observacao}
                        rows={5}
                        placeholder="Ex.: Equipamento entregue com dockstation, fonte e mochila corporativa."
                    />
                </FormSection>

                {/* =====================================================
            RESUMO DO EQUIPAMENTO
        ===================================================== */}

                <div className="registro-resumo">

                    <h5>Resumo do Cadastro</h5>

                    <div className="row g-3">

                        <div className="col-md-3">
                            <div className="resumo-item">
                                <span>Patrimônio</span>
                                <strong>{watch("patrimonio") || "--"}</strong>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="resumo-item">
                                <span>Hostname</span>
                                <strong>{watch("hostname") || "--"}</strong>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="resumo-item">
                                <span>Marca / Modelo</span>
                                <strong>
                                    {marca || "--"}
                                    {marca && modelo ? " / " : ""}
                                    {modelo || ""}
                                </strong>
                            </div>
                        </div>

                    </div>

                </div>

                {/* =====================================================
            BOTÕES DE AÇÃO
        ===================================================== */}

                <div className="registro-acoes">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={limparFormulario}
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
                        disabled={isSubmitting}
                    >
                        <Save size={18} />

                        {registroEdicao
                            ? "Salvar Alterações"
                            : "Cadastrar Equipamento"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default NovoRegistro;
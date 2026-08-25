import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DynamicForm from "../../components/DynamicForm/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

import { parseHostname } from "../../utils/hostnameParser";

import { useRegistros } from "../../context/RegistroContext";

function NovoRegistro() {

    const location = useLocation();
    const navigate = useNavigate();

    // Registro recebido da tela de Relatórios
    const registroEmEdicao = location.state?.registro;

   const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
    } = useRegistroForm();

    const {
        adicionarRegistro,
        atualizarRegistro,
        mostrarMensagem
    } = useRegistros();

    // =====================================================
    // CARREGAR REGISTRO PARA EDIÇÃO
    // =====================================================

    useEffect(() => {

        if (registroEmEdicao) {
            reset(registroEmEdicao);
        }

    }, [registroEmEdicao, reset]);


    // =====================================================
    // HOSTNAME
    // =====================================================

  
        const hostname = watch("hostname");

        useEffect(() => {

            const { hostname: hostFormatado, serviceTag } = parseHostname(hostname);

            if (hostname !== hostFormatado) {
                setValue("hostname", hostFormatado);
            }

            setValue("serviceTag", serviceTag);

        }, [hostname, setValue]);



    // =====================================================
    // SALVAR REGISTRO
    // =====================================================

    function salvarRegistro(data) {

        const resultado = parseHostname(data.hostname);

        data.hostname = resultado.hostname;
        data.serviceTag = resultado.serviceTag;

        if (registroEmEdicao) {

            atualizarRegistro(registroEmEdicao.id, data);

            mostrarMensagem(
                "success",
                `Registro do patrimônio ${registroEmEdicao.patrimonio} atualizado com sucesso.`
            );

        } else {

            const dadosHostname = parseHostname(data.hostname);

            data.hostname = dadosHostname.hostname;
            data.serviceTag = dadosHostname.serviceTag;

            const novoRegistro = adicionarRegistro(data);

            mostrarMensagem(
                "success",
                `Registro do patrimônio ${novoRegistro.patrimonio} cadastrado com sucesso.`
            );

        }

        // Limpa formulário
        reset();

        // Retorna para relatórios
        navigate("/relatorios");

    }

    // =====================================================
    // INTERFACE
    // =====================================================

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    {registroEmEdicao
                        ? "Editar Registro"
                        : "Novo Registro"}
                </h2>

            </div>

            <form onSubmit={handleSubmit(salvarRegistro)}>

                <DynamicForm
                    sections={formSections}
                    register={register}
                    watch={watch}
                    errors={errors}
                />

                <div className="d-flex justify-content-end mt-4">

                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                    >
                        {registroEmEdicao
                            ? "Salvar Alterações"
                            : "Salvar Registro"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default NovoRegistro;
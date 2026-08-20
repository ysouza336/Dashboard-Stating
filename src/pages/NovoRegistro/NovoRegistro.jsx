import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DynamicForm from "../../components/DynamicForm/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

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
    // SALVAR REGISTRO
    // =====================================================

    function salvarRegistro(data) {

        if (registroEmEdicao) {

            atualizarRegistro(registroEmEdicao.id, data);

            mostrarMensagem(
                "success",
                `Registro do patrimônio ${registroEmEdicao.patrimonio} atualizado com sucesso.`
            );

        } else {

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
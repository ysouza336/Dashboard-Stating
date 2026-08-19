import { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DynamicForm from "../../components/DynamicForm/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

import { useRegistros } from "../../context/RegistroContext";

import Alert from "../../components/Alert/Alert";

function NovoRegistro() {

    const location = useLocation();
    const navigate = useNavigate();

    // Registro recebido através da tela de Relatórios
    const registroEmEdicao = location.state?.registro;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useRegistroForm();

    const {
        adicionarRegistro,
        atualizarRegistro
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
    // SALVAR
    // =====================================================

function salvarRegistro(data) {

    if (registroEmEdicao) {

        const registroAtualizado = atualizarRegistro(
            registroEmEdicao.id,
            data
        );

        console.log(
            "Registro atualizado:",
            registroAtualizado
        );

        setMensagem({
            type: "success",
            message: "Registro atualizado com sucesso."
        });

    } else {

        const novoRegistro = adicionarRegistro(data);

        console.log(
            "Registro cadastrado:",
            novoRegistro
        );

        setMensagem({
            type: "success",
            message: "Registro cadastrado com sucesso."
        });

    }

    reset();

    // navigate("/relatorios");
}

    // =====================================================
    // INTERFACE
    // =====================================================

    return (
        <div>

            <h2 className="mb-4">

                {registroEmEdicao
                    ? "Editar Registro"
                    : "Novo Registro"
                }

            </h2>

            <form
                onSubmit={handleSubmit(salvarRegistro)}
            >

                <DynamicForm
                    sections={formSections}
                    register={register}
                    errors={errors}
                />

                <div className="d-flex justify-content-end mt-4">

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        {registroEmEdicao
                            ? "Salvar Alterações"
                            : "Salvar Registro"
                        }

                    </button>

                </div>

            </form>

        </div>
    );
}

export default NovoRegistro;
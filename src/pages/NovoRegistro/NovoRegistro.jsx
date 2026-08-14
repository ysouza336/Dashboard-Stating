import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DynamicForm from "../../components/DynamicForm/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

import { useRegistros } from "../../context/RegistroContext";

function NovoRegistro() {

    const location = useLocation();
    const navigate = useNavigate();

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

    useEffect(() => {

        if (registroEmEdicao) {

            reset(registroEmEdicao);

        }

    }, [registroEmEdicao, reset]);

    function salvarRegistro(data) {

        if (registroEmEdicao) {

            atualizarRegistro(
                registroEmEdicao.id,
                data
            );

            console.log(
                "Registro atualizado:",
                {
                    ...registroEmEdicao,
                    ...data
                }
            );

        } else {

            const novoRegistro = adicionarRegistro(data);

            console.log(
                "Registro cadastrado:",
                novoRegistro
            );

        }

        reset();

        navigate("/relatorios");

    }

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
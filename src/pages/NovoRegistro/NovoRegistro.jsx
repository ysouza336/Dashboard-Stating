import DynamicForm from "../../components/DynamicForm/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

import { useRegistros } from "../../context/RegistroContext";

function NovoRegistro() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useRegistroForm();

    const { adicionarRegistro } = useRegistros();

    function salvarRegistro(data) {

        const novoRegistro = adicionarRegistro(data);

        console.log("Registro cadastrado:", novoRegistro);

        reset();
    }

    return (
        <div>

            <h2 className="mb-4">
                Novo Registro
            </h2>

            <form onSubmit={handleSubmit(salvarRegistro)}>

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
                        Salvar Registro
                    </button>

                </div>

            </form>

        </div>
    );
}

export default NovoRegistro;
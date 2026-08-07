import DynamicForm from "../../components/DynamicForm";
import formSections from "../../data/formSections";

import useRegistroForm from "../../hooks/useRegistroForm";

function NovoRegistro() {

    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useRegistroForm();

    function salvarRegistro(data) {

        console.log(data);

    }

    return (

        <form onSubmit={handleSubmit(salvarRegistro)}>

            <DynamicForm

                sections={formSections}

                register={register}

                errors={errors}

            />

            <div className="d-flex justify-content-end mt-4">

                <button
                    className="btn btn-primary"
                    type="submit"
                >

                    Salvar Registro

                </button>

            </div>

        </form>

    );

}

export default NovoRegistro;
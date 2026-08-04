import { useState } from "react";

import DynamicForm from "../../components/DynamicForm";
import formSections from "../../data/formSections";

function NovoRegistro() {

    const [formData, setFormData] = useState({});

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    }

    return (

        <div>

            <h2 className="mb-4">
                Novo Registro
            </h2>

            <DynamicForm
                sections={formSections}
                values={formData}
                onChange={handleChange}
            />

        </div>

    );

}

export default NovoRegistro;
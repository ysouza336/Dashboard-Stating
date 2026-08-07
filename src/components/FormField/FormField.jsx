import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import DateInput from "../DateInput";

function FormField({
    field,
    register,
    error
}) {
    if (!field) {
        return null;
    }

    switch (field.component) {

        case "input":
            return (
                <Input
                    {...field}
                    register={register}
                    error={error}
                />
            );

        case "select":
            return (
                <Select
                    {...field}
                    register={register}
                    error={error}
                />
            );

        case "textarea":
            return (
                <TextArea
                    {...field}
                    register={register}
                    error={error}
                />
            );

        case "date":
            return (
                <DateInput
                    {...field}
                    register={register}
                    error={error}
                />
            );

        default:
            console.warn(
                `Tipo de componente não suportado: ${field.component}`
            );

            return null;
    }
}

export default FormField;
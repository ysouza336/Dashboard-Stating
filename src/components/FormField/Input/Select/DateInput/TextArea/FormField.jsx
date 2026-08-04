import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import DateInput from "../DateInput";

function FormField({
    field,
    value,
    onChange
}) {

    switch (field.component) {

        case "input":
            return (
                <Input
                    {...field}
                    value={value}
                    onChange={onChange}
                />
            );

        case "select":
            return (
                <Select
                    {...field}
                    value={value}
                    onChange={onChange}
                />
            );

        case "textarea":
            return (
                <TextArea
                    {...field}
                    value={value}
                    onChange={onChange}
                />
            );

        case "date":
            return (
                <DateInput
                    {...field}
                    value={value}
                    onChange={onChange}
                />
            );

        default:
            return null;

    }

}

export default FormField;
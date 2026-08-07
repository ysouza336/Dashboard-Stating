import Input from "../Input/Input";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";
<<<<<<< HEAD
import DateInput from "../DateInput/DateInput";
=======
import DateInput from "../DateInput/index";
>>>>>>> b78e006ea44955a95d6d3ce3f6ef5c794343de28

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
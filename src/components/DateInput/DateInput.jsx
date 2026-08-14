import Input from "../Input";

function DateInput({
    label,
    name,
    register,
    error,
    required = false,
    disabled = false,
    ...props
}) {
    return (
        <Input className="input-container required invalid-feedback form-select"
            {...props}
            label={label}
            name={name}
            type="date"
            required={required}
            disabled={disabled}
            register={register}
            error={error}
        />
    );
}

export default DateInput;
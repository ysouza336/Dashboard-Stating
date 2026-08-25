import "./Input.css";

function Input({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    register,
    error,
    disabled = false,
    readOnly = false
}) {

    return (
        <div className="mb-3">

            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`form-control ${error ? "is-invalid" : ""}`}
                {...register(name)}
            />

            {error && (
                <div className="invalid-feedback">
                    {error.message}
                </div>
            )}

        </div>
    );
}

export default Input;
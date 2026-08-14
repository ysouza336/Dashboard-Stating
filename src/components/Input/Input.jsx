import "./Input.css";

function Input({
    label,
    name,
    type = "text",
    placeholder = "",
    required = false,
    register,
    error,
    disabled = false,
    ...props
}) {
    return (
        <div className="input-container">

            {label && (
                <label
                    htmlFor={name}
                    className="form-label"
                >
                    {label}

                    {required && (
                        <span className="required">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-select ${
                    error ? "is-invalid" : ""
                }`}
                {...register(name)}
                {...props}
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
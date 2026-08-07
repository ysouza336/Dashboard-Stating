import "./Input.css";

function Input({
    label,
    name,
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
    register,
    error
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
                type={type}
                className={`form-control ${
                    error ? "is-invalid" : ""
                }`}
                placeholder={placeholder}
                disabled={disabled}
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
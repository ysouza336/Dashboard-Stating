import "./TextArea.css";

function TextArea({
    label,
    name,
    placeholder = "",
    required = false,
    disabled = false,
    rows = 4,
    register,
    error
}) {
    return (
        <div className="input-container">

            {label && (
                <label htmlFor={name} className="form-label">
                    {label}

                    {required && (
                        <span className="required">*</span>
                    )}
                </label>
            )}

            <textarea
                id={name}
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
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

export default TextArea;
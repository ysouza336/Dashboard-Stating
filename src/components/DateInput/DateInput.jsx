import "./DateInput.css";

function DateInput({
    label,
    name,
    required = false,
    disabled = false,
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

            <input
                id={name}
                type="date"
                className={`form-control ${error ? "is-invalid" : ""}`}
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

export default DateInput;
import "./Select.css";

function Select({
    label,
    name,
    options = [],
    required = false,
    register,
    error,
    disabled = false
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

            <select
                id={name}
                className={`form-select ${error ? "is-invalid" : ""}`}
                disabled={disabled}
                {...register(name)}
            >
                <option value="">
                    Selecione...
                </option>

                {options.map((option) => {
                    /*
                     * Permite trabalhar tanto com:
                     *
                     * ["Dell", "Lenovo"]
                     *
                     * quanto com:
                     *
                     * [
                     *   { value: "dell", label: "Dell" }
                     * ]
                     */

                    if (typeof option === "object") {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        );
                    }

                    return (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    );
                })}
            </select>

            {error && (
                <div className="invalid-feedback">
                    {error.message}
                </div>
            )}

        </div>
    );
}

export default Select;
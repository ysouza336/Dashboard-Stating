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
    console.log("SELECT:", {
        name,
        options
    });

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

            <select
                id={name}
                className={`form-select ${
                    error ? "is-invalid" : ""
                }`}
                disabled={disabled}
                {...register(name)}
            >
                <option value="">
                    Selecione...
                </option>

                {Array.isArray(options) &&
                    options.map((option, index) => {

                        /*
                         * Suporta:
                         *
                         * ["Dell", "Lenovo", "HP"]
                         *
                         * ou:
                         *
                         * [
                         *   {
                         *      value: "dell",
                         *      label: "Dell"
                         *   }
                         * ]
                         */

                        if (
                            typeof option === "object" &&
                            option !== null
                        ) {
                            return (
                                <option
                                    key={
                                        option.value ??
                                        index
                                    }
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            );
                        }

                        return (
                            <option
                                key={`${option}-${index}`}
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
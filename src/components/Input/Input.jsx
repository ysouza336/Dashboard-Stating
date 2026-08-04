import "./Input.css";

function Input({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    type = "text"
}) {

    return (

        <div className="input-container">

            <label className="form-label">

                {label}

                {required && (
                    <span className="required">*</span>
                )}

            </label>

            <input
                className="form-control"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />

        </div>

    );

}

export default Input;
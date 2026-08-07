import "./TextArea.css";

function TextArea({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    rows = 4
}) {

    return (
        <div className="input-container">

            {label && (
                <label className="form-label">
                    {label}
                    {required && (
                        <span className="required">*</span>
                    )}
                </label>
            )}

            <textarea
                className="form-control"
                name={name}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
            />

        </div>
    );

}

export default TextArea;
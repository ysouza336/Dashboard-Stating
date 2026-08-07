import "./TextArea.css";

function TextArea({
<<<<<<< HEAD

    label,

    value,

    name,

    rows = 4,

    onChange

}){

    return(

        <div className="input-container">

            <label className="form-label">

                {label}

            </label>

            <textarea

                className="form-control"

                rows={rows}

                name={name}

                value={value}

                onChange={onChange}

            />

        </div>

    )
=======
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
>>>>>>> b78e006ea44955a95d6d3ce3f6ef5c794343de28

}

export default TextArea;
import "./TextArea.css";

function TextArea({

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

}

export default TextArea;
import "./Select.css";

function Select({

    label,

    name,

    value,

    onChange,

    options = [],

    required = false

}){

    return(

        <div className="input-container">

            <label className="form-label">

                {label}

                {required && (
                    <span className="required">*</span>
                )}

            </label>

            <select
                className="form-select"
                name={name}
                value={value}
                onChange={onChange}
            >

                <option value="">
                    Selecione...
                </option>

                {options.map(option=>(
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}

            </select>

        </div>

    )

}

export default Select;
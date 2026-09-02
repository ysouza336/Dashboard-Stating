import "./SelectField.css";

function SelectField({
  name,
  label,
  register,
  error,
  options = [],
  required = false,
  disabled = false,
  placeholder = "Selecione uma opção",
}) {
  return (
    <div className="select-field">

      <label htmlFor={name} className="form-label">
        {label}
        {required && (
          <span className="required-indicator">*</span>
        )}
      </label>

      <select
        id={name}
        disabled={disabled}
        className={`form-select ${error ? "is-invalid" : ""}`}
        {...register(name)}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <div className="invalid-feedback d-block">
          {error.message}
        </div>
      )}

    </div>
  );
}

export default SelectField;
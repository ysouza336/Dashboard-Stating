import "./FormField.css";

function FormField({
  name,
  label,
  register,
  error,
  required = false,
  placeholder = "",
  type = "text",
  disabled = false,
  readOnly = false,
  maxLength,
  autoComplete = "off",
}) {
  return (
    <div className="form-field">

      <label htmlFor={name} className="form-label">
        {label}

        {required && (
          <span className="required-indicator">*</span>
        )}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...register(name)}
      />

      {error && (
        <div className="invalid-feedback d-block">
          {error.message}
        </div>
      )}

    </div>
  );
}

export default FormField;
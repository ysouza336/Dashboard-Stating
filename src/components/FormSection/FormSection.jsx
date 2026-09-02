import "./FormSection.css";

function FormSection({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section className={`form-section ${className}`}>
      <div className="form-section-header">
        <div>
          <h4 className="form-section-title">{title}</h4>

          {description && (
            <p className="form-section-description">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="form-section-body">
        {children}
      </div>
    </section>
  );
}

export default FormSection;
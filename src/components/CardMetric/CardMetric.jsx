import "./CardMetric.css";

function CardMetric({
    title,
    value,
    icon,
    color = "#2563EB"
}) {
    return (
        <div className="card-metric">

            <div
                className="card-metric-icon"
                style={{ backgroundColor: `${color}20`, color }}
            >
                {icon}
            </div>

            <div className="card-metric-info">

                <span className="card-metric-title">
                    {title}
                </span>

                <h3 className="card-metric-value">
                    {value}
                </h3>

            </div>

        </div>
    );
}

export default CardMetric;
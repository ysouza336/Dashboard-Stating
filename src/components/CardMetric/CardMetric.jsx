
import "./CardMetric.css";

function CardMetric({
    title,
    value,
    icon,
    color,
    subtitle
}) {

    return (

        <div className="card-metric shadow-sm">

            <div className="metric-top">

                <div
                    className="metric-icon"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>

            </div>

            <h6>{title}</h6>

            <h2>{value}</h2>

            {subtitle && (
                <small>{subtitle}</small>
            )}

        </div>

    );

}

export default CardMetric;


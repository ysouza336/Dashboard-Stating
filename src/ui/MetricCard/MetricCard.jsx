import "./MetricCard.css";

function MetricCard({
    title,
    value,
    icon: Icon,
    color = "primary",
    subtitle = "",
    trend = null,
    loading = false,
    onClick = null
}) {

    const clickable = typeof onClick === "function";

    return (
        <div
            className={`metric-card metric-${color} ${clickable ? "metric-clickable" : ""}`}
            onClick={onClick}
        >
            <div className="metric-card-header">

                <div className={`metric-icon metric-icon-${color}`}>
                    {Icon && <Icon size={26} />}
                </div>

                {trend && (
                    <span
                        className={`metric-trend ${
                            trend.type === "up"
                                ? "metric-trend-up"
                                : "metric-trend-down"
                        }`}
                    >
                        {trend.value}
                    </span>
                )}

            </div>

            <div className="metric-card-body">

                <span className="metric-title">
                    {title}
                </span>

                {loading ? (
                    <div className="metric-skeleton" />
                ) : (
                    <h2 className="metric-value">
                        {value}
                    </h2>
                )}

                {subtitle && (
                    <small className="metric-subtitle">
                        {subtitle}
                    </small>
                )}

            </div>

        </div>
    );

}

export default MetricCard;
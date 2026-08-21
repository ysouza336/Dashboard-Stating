import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import "./DashboardChart.css";

const COLORS = [
    "#64748B",
    "#F59E0B",
    "#16A34A"
];

function DashboardChart({ data }) {

    return (

        <div className="dashboard-chart-card">

            <h5 className="mb-4">
                Equipamentos por Status
            </h5>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                        dataKey="value"
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DashboardChart;
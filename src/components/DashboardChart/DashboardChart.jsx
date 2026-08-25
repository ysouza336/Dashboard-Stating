import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
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

        <div className="dashboard-chart">

            <div className="dashboard-chart-header">

                <h5>Status dos Equipamentos</h5>

                <span>Atualização em tempo real</span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        innerRadius={55}
                        paddingAngle={3}
                    >

                        {data.map((item, index) => (

                            <Cell
                                key={item.name}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend verticalAlign="bottom"/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DashboardChart;
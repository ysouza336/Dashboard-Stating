
import { useMemo } from "react";

import {
    Boxes,
    Clock3,
    LoaderCircle, 
    Laptop,
    CheckCircle,
    AlertTriangle
} from "lucide-react";

import DashboardChart from "../../components/DashboardChart/DashboardChart";
import { useRegistros } from "../../context/RegistroContext";

import MetricCard from "../../ui/MetricCard/MetricCard";
import CardMetric from "../../components/CardMetric";

import RecentActivity from "../../components/RecentActivity/RecentActivity";
import ProductivityPanel from "../../components/ProductivityPanel/ProductivityPanel";
import "./Dashboard.css";

function Dashboard() {

    const { registros } = useRegistros();

    const dashboard = useMemo(() => {

        const total = registros.length;

        const pendentes = registros.filter(
            (registro) => registro.status === "Pendente"
        ).length;

        const andamento = registros.filter(
            (registro) => registro.status === "Em andamento"
        ).length;

        const concluidos = registros.filter(
            (registro) => registro.status === "Concluído"
        ).length;

        return {
            total,
            pendentes,
            andamento,
            concluidos
        };

    }, [registros]);

    const dadosStatus = [
        {
            name: "Pendentes",
            value: dashboard.pendentes
        },
        {
            name: "Em andamento",
            value: dashboard.andamento
        },
        {
            name: "Concluídos",
            value: dashboard.concluidos
        }
    ];

    return (

        <div className="dashboard-page">

            <div className="dashboard-header mb-4">

                <div>

                    <h2>Dashboard</h2>

                    <p>
                        Bem-vindo ao painel do Controle de Staging.
                    </p>

                </div>

            </div>

            <div className="row g-4">

            {/* ======================================= */}
            {/* CARDS */}
            {/* ======================================= */}

                
                <div className="col-lg-3 col-md-6">
                   <MetricCard
                        title="Total Equipamentos"
                        value={registros.length}
                        icon={Laptop}
                        color="primary"
                    />
                </div>

                <div className="col-lg-3 col-md-6">

                   <MetricCard
                        title="Concluídos"
                        value={dashboard.concluidos}
                        icon={CheckCircle}
                        color="success"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                   <MetricCard
                        title="Em Andamento"
                        value={dashboard.andamento}
                        icon={Clock3}
                        color="warning"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                   <MetricCard
                        title="Pendentes"
                        value={dashboard.pendentes}
                        icon={AlertTriangle}
                        color="danger"
                    />

                </div>

            {/* ======================================= */}
            {/* GRÁFICOS */}
            {/* ======================================= */}

                <div className="row g-4 mt-2">

                    <div className="col-lg-6">

                        <DashboardChart
                            data={dadosStatus}
                        />

                    </div>

                    <div className="col-lg-6">

                        <div className="dashboard-summary">

                            <h5>Resumo Operacional</h5>

                            <div className="summary-item">

                                <span>Total de Equipamentos</span>

                                <strong>{dashboard.total}</strong>

                            </div>

                            <div className="summary-item">

                                <span>Concluídos</span>

                                <strong>{dashboard.concluidos}</strong>

                            </div>

                            <div className="summary-item">

                                <span>Em andamento</span>

                                <strong>{dashboard.andamento}</strong>

                            </div>

                            <div className="summary-item">

                                <span>Pendentes</span>

                                <strong>{dashboard.pendentes}</strong>

                            </div>

                            <hr/>

                            <span className="summary-label">
                                Percentual Concluído
                            </span>

                            <div className="progress mt-2 mb-2">

                                <div
                                    className="progress-bar bg-success"
                                    style={{
                                        width: `${
                                            dashboard.total
                                                ? (dashboard.concluidos / dashboard.total) * 100
                                                : 0
                                        }%`
                                    }}
                                />

                            </div>

                            <strong className="text-success">

                                {dashboard.total
                                    ? Math.round(
                                        (dashboard.concluidos / dashboard.total) * 100
                                    )
                                    : 0
                                }%

                            </strong>

                        </div>

                    </div>

                </div>

                {/* ======================================= */}
                {/* TEMPO REAL */}
                {/* ======================================= */}

                <div className="row mt-4">

                    <div className="col-12">

                        <RecentActivity
                            registros={registros}
                        />

                    </div>

                </div>

                {/* ======================================= */}
                {/* STATUS STATING */}
                {/* ======================================= */}


                <div className="row mt-4">

                    <div className="col-12">

                        <ProductivityPanel registros={registros} />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;

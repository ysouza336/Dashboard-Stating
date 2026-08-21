import { useRegistros } from "../../context/RegistroContext";
import DashboardChart from "../../components/DashboardChart/DashboardChart"
import "./Dashboard.css";

function Dashboard() {

    const { registros } = useRegistros();

    // ==============================
    // MÉTRICAS
    // ==============================

    const totalRegistros = registros.length;

    const pendentes = registros.filter(
        (registro) => registro.status === "Pendente"
    ).length;

    const emAndamento = registros.filter(
        (registro) => registro.status === "Em andamento"
    ).length;

    const concluidos = registros.filter(
        (registro) => registro.status === "Concluído"
    ).length;

    const dadosStatus = [
        {
            name: "Pendente",
            value: pendentes
        },
        {
            name: "Em andamento",
            value: emAndamento
        },
        {
            name: "Concluído",
            value: concluidos
        }
    ];

    return (
        <div className="dashboard-container">

            {/* Cabeçalho */}

            <div className="dashboard-header mb-4">

                <h2 className="mb-1">
                    Dashboard
                </h2>

                <p className="text-muted mb-0">
                    Visão geral do processo de staging dos equipamentos.
                </p>

            </div>

            {/* Cards */}

            <div className="row g-4">

                <div className="col-xl-3 col-md-6">

                    <div className="metric-card border-primary">

                        <div className="metric-icon bg-primary-subtle">
                            📦
                        </div>

                        <div>

                            <span>Total de Registros</span>

                            <h3>{totalRegistros}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-xl-3 col-md-6">

                    <div className="metric-card border-secondary">

                        <div className="metric-icon bg-secondary-subtle">
                            ⏳
                        </div>

                        <div>

                            <span>Pendentes</span>

                            <h3>{pendentes}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-xl-3 col-md-6">

                    <div className="metric-card border-warning">

                        <div className="metric-icon bg-warning-subtle">
                            🛠️
                        </div>

                        <div>

                            <span>Em andamento</span>

                            <h3>{emAndamento}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-xl-3 col-md-6">

                    <div className="metric-card border-success">

                        <div className="metric-icon bg-success-subtle">
                            ✅
                        </div>

                        <div>

                            <span>Concluídos</span>

                            <h3>{concluidos}</h3>

                        </div>

                    </div>

                </div>

            </div>
             {/* GRAFICOS */}

            <div className="row g-4 mt-2">

                <div className="col-lg-6">

                    <DashboardChart
                        data={dadosStatus}
                    />

                </div>

                <div className="col-lg-6">

                    <div className="dashboard-card">

                        <h5 className="mb-4">
                            Resumo Geral
                        </h5>

                        <div className="d-flex justify-content-between mb-3">
                            <span>Percentual concluído</span>

                            <strong>
                                {totalRegistros === 0
                                    ? 0
                                    : Math.round(
                                        (concluidos / totalRegistros) * 100
                                    )
                                }%
                            </strong>
                        </div>

                        <div className="progress mb-4">

                            <div
                                className="progress-bar bg-success"
                                style={{
                                    width: `${
                                        totalRegistros === 0
                                            ? 0
                                            : (concluidos / totalRegistros) * 100
                                    }%`
                                }}
                            />

                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Pendentes</span>
                            <strong>{pendentes}</strong>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Em andamento</span>
                            <strong>{emAndamento}</strong>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Concluídos</span>
                            <strong>{concluidos}</strong>
                        </div>

                    </div>

                </div>

            </div>

            {/* Próximos widgets */}

            <div className="row mt-4 g-4">

                <div className="col-lg-8">

                    <div className="dashboard-card">

                        <h5 className="mb-3">
                            Últimos registros cadastrados
                        </h5>

                        {registros.length === 0 ? (

                            <p className="text-muted mb-0">
                                Nenhum registro cadastrado até o momento.
                            </p>

                        ) : (

                            <table className="table table-hover align-middle mb-0">

                                <thead>

                                    <tr>
                                        <th>Patrimônio</th>
                                        <th>Tipo</th>
                                        <th>Status</th>
                                        <th>Responsável</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {registros
                                        .slice(-5)
                                        .reverse()
                                        .map((registro) => (

                                            <tr key={registro.id}>

                                                <td>{registro.patrimonio}</td>

                                                <td>{registro.tipo}</td>

                                                <td>{registro.status}</td>

                                                <td>{registro.responsavel}</td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-card">

                        <h5 className="mb-3">
                            Resumo
                        </h5>

                        <ul className="list-group list-group-flush">

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Notebook</span>

                                <strong>
                                    {
                                        registros.filter(
                                            (registro) => registro.tipo === "Notebook"
                                        ).length
                                    }
                                </strong>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Desktop</span>

                                <strong>
                                    {
                                        registros.filter(
                                            (registro) => registro.tipo === "Desktop"
                                        ).length
                                    }
                                </strong>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Monitor</span>

                                <strong>
                                    {
                                        registros.filter(
                                            (registro) => registro.tipo === "Monitor"
                                        ).length
                                    }
                                </strong>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
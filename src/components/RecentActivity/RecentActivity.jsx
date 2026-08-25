import "./RecentActivity.css";

function RecentActivity({ registros }) {

    const ultimos = [...registros]
        .sort((a, b) => {
            const dataA = a.atualizadoEm || a.criadoEm;
            const dataB = b.atualizadoEm || b.criadoEm;
            return new Date(dataB) - new Date(dataA);
        })
        .slice(0, 10);

    function badgeStatus(status) {
        switch (status) {
            case "Concluído":
                return "bg-success";
            case "Em andamento":
                return "bg-warning text-dark";
            default:
                return "bg-secondary";
        }
    }

    function formatarData(data) {
        return new Date(data).toLocaleString("pt-BR");
    }

    return (
        <div className="recent-activity">

            <h5>Atividades Recentes</h5>

            {ultimos.length === 0 ? (
                <p className="text-muted">
                    Nenhuma atividade registrada.
                </p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">

                        <thead>
                            <tr>
                                <th>Patrimônio</th>
                                <th>Hostname</th>
                                <th>Status</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ultimos.map((registro) => (
                                <tr key={registro.id}>
                                    <td>{registro.patrimonio}</td>

                                    <td>
                                        {registro.hostname || "-"}
                                    </td>

                                    <td>
                                        <span className={`badge ${badgeStatus(registro.status)}`}>
                                            {registro.status}
                                        </span>
                                    </td>

                                    <td>
                                        {formatarData(
                                            registro.atualizadoEm || registro.criadoEm
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}

        </div>
    );
}

export default RecentActivity;
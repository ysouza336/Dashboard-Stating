import { useRegistros } from "../../context/RegistroContext";
import { useNavigate } from "react-router-dom";

function Relatorios() {

    const { registros } = useRegistros();
    const navigate = useNavigate();

    function editarRegistro(registro) {
    navigate("/novo", {
        state: {
            registro
        }
    });
}

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Relatórios
                </h2>

                <span className="badge bg-secondary">
                    {registros.length} registro(s)
                </span>

            </div>

            {registros.length === 0 ? (

                <div className="alert alert-info">
                    Nenhum registro cadastrado.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-hover align-middle">

                        <thead>

                            <tr>
                                <th>Patrimônio</th>
                                <th>Serial</th>
                                <th>Tipo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Status</th>
                                <th>Responsável</th>
                                <th>Data Solicitação</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {registros.map((registro) => (

                                <tr key={registro.id}>

                                    <td>
                                        {registro.patrimonio || "-"}
                                    </td>

                                    <td>
                                        {registro.serial || "-"}
                                    </td>

                                    <td>
                                        {registro.tipo || "-"}
                                    </td>

                                    <td>
                                        {registro.marca || "-"}
                                    </td>

                                    <td>
                                        {registro.modelo || "-"}
                                    </td>

                                    <td>
                                        {registro.status || "-"}
                                    </td>

                                    <td>
                                        {registro.responsavel || "-"}
                                    </td>

                                    <td>
                                        {registro.dataSolicitacao || "-"}
                                    </td>

                                    <td>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={() =>
                                                editarRegistro(registro)
                                            }
                                        >
                                            Editar
                                        </button>

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

export default Relatorios;
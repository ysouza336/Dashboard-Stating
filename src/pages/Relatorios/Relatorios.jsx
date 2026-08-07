import "./Relatorios.css";

function Relatorios() {

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>Relatórios</h2>

                    <p className="text-muted mb-0">
                        Consulte e exporte os registros cadastrados.
                    </p>

                </div>

                <button className="btn btn-success">
                    Exportar Excel
                </button>

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Patrimônio"
                            />

                        </div>

                        <div className="col-md-3">

                            <select className="form-select">

                                <option value="">
                                    Status
                                </option>

                                <option>Pendente</option>
                                <option>Em andamento</option>
                                <option>Concluído</option>

                            </select>

                        </div>

                        <div className="col-md-3">

                            <input
                                type="date"
                                className="form-control"
                            />

                        </div>

                        <div className="col-md-3">

                            <button className="btn btn-primary w-100">
                                Filtrar
                            </button>

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover table-striped align-middle">

                            <thead>

                                <tr>

                                    <th>Patrimônio</th>
                                    <th>Serial</th>
                                    <th>Tipo</th>
                                    <th>Responsável</th>
                                    <th>Status</th>
                                    <th>Data</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td colSpan="7" className="text-center text-muted">

                                        Nenhum registro encontrado.

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Relatorios;
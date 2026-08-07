import "./Configuracoes.css";

function Configuracoes() {
    return (
        <div className="container-fluid">

            <div className="page-header">
                <h2>Configurações</h2>
                <p className="text-muted">
                    Gerencie as configurações do sistema.
                </p>
            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    <h5 className="mb-4">
                        Configurações Gerais
                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Nome da Empresa
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite o nome da empresa"
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Responsável
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite o responsável"
                            />

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-end">

                        <button
                            className="btn btn-primary"
                        >
                            Salvar Configurações
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Configuracoes;
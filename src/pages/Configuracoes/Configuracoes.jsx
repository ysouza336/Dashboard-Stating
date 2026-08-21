import { useRegistros } from "../../context/RegistroContext";

function Configuracoes() {

    const {
        registros,
        mostrarMensagem
    } = useRegistros();

    function limparBancoLocal() {

        const confirmar = window.confirm(
            "Deseja apagar TODOS os registros salvos neste navegador?"
        );

        if (!confirmar) return;

        localStorage.removeItem("controle-staging-registros");

        window.location.reload();

    }

    return (

        <div>

            <h2 className="mb-4">
                Configurações
            </h2>

            <div className="card shadow-sm">

                <div className="card-body">

                    <h5>Armazenamento Local</h5>

                    <p className="text-muted">
                        Atualmente existem <strong>{registros.length}</strong> registros salvos neste navegador.
                    </p>

                    <button
                        className="btn btn-danger"
                        onClick={limparBancoLocal}
                    >
                        Limpar Banco Local
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Configuracoes;
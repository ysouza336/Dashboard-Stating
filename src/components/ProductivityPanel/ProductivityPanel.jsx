import "./ProductivityPanel.css";

function ProductivityPanel({ registros }) {

    const concluidos = registros.filter(r => r.status === "Concluído");

    const produtividade = registros.length
        ? Math.round((concluidos.length / registros.length) * 100)
        : 0;

    const ranking = [...concluidos].reduce((acc, item) => {
        acc[item.responsavel] = (acc[item.responsavel] || 0) + 1;
        return acc;
    }, {});

    const rankingOrdenado = Object.entries(ranking)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div className="productivity-panel">

            <h5>Indicadores de Produtividade</h5>

            <div className="mb-4">
                <span>Equipamentos concluídos</span>

                <div className="progress mt-2">
                    <div
                        className="progress-bar bg-success"
                        style={{ width: `${produtividade}%` }}
                    />
                </div>

                <strong>{produtividade}%</strong>
            </div>

            <h6>Ranking de Responsáveis</h6>

            {rankingOrdenado.length === 0 ? (
                <p className="text-muted">Nenhum equipamento concluído.</p>
            ) : (
                rankingOrdenado.map(([nome, total], index) => (
                    <div key={nome} className="ranking-item">
                        <span>{index + 1}. {nome}</span>
                        <strong>{total}</strong>
                    </div>
                ))
            )}

        </div>
    );
}

export default ProductivityPanel;
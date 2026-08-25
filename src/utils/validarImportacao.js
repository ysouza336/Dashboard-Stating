const STATUS_VALIDOS = ["Pendente", "Em andamento", "Concluído"];
const MARCAS_VALIDAS = ["Dell", "Lenovo", "HP", "Apple"];

export function validarImportacao(dados, registrosExistentes) {

    const patrimonioExistente = new Set(
        registrosExistentes.map((r) => r.patrimonio)
    );

    return dados.map((linha) => {

        const erros = [];

        if (!linha["Patrimônio"]) {
            erros.push("Patrimônio obrigatório");
        }

        if (patrimonioExistente.has(linha["Patrimônio"])) {
            erros.push("Patrimônio já cadastrado");
        }

        if (
            linha["Status"] &&
            !STATUS_VALIDOS.includes(linha["Status"])
        ) {
            erros.push("Status inválido");
        }

        if (
            linha["Marca"] &&
            !MARCAS_VALIDAS.includes(linha["Marca"])
        ) {
            erros.push("Marca inválida");
        }

        return {
            ...linha,
            valido: erros.length === 0,
            erros
        };

    });
}
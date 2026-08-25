import { mapearLinhaExcel } from "../utils/excelMapper";

export function prepararImportacao(planilha, registrosExistentes) {

    const patrimonioExistente = new Set(
        registrosExistentes.map((r) => r.patrimonio)
    );

    const patrimonioImportado = new Set();

    const validos = [];
    const erros = [];

    planilha.forEach((linha, index) => {

        const registro = mapearLinhaExcel(linha);
        const listaErros = [];

        // Ignora linha completamente vazia.
        if (
            Object.values(registro).every(
                (valor) => valor === ""
            )
        ) {
            return;
        }

        if (!registro.patrimonio) {
            listaErros.push("Patrimônio obrigatório.");
        }

        if (patrimonioExistente.has(registro.patrimonio)) {
            listaErros.push("Patrimônio já existe no sistema.");
        }

        if (patrimonioImportado.has(registro.patrimonio)) {
            listaErros.push("Patrimônio duplicado na planilha.");
        }

        patrimonioImportado.add(registro.patrimonio);

        if (listaErros.length > 0) {

            erros.push({
                linha: index + 2,
                patrimonio: registro.patrimonio,
                erros: listaErros
            });

            return;
        }

        validos.push(registro);

    });

    return {
        validos,
        erros,
        total: planilha.length
    };

}
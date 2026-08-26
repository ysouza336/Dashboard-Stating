import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ===============================================
// FORMATA DATAS E VALORES
// ===============================================
function formatarData(data) {
    if (!data) return "";

    // Data no formato YYYY-MM-DD
    if (
        typeof data === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(data)
    ) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    // Data ISO (Auditoria)
    if (
        typeof data === "string" &&
        data.includes("T")
    ) {
        return new Date(data).toLocaleString("pt-BR");
    }

    return data;
}

// ===============================================
// EXPORTAÇÃO DOS REGISTROS
// ===============================================
export function exportarRegistrosExcel(registros) {

    const dados = registros.dados || registros;
    const colunas = registros.colunas || null;
    const nomeArquivo = registros.nomeArquivo || `STAGING_${
        new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")
    }`;

    if (!dados || dados.length === 0) {
        alert("Não existem registros para exportar.");
        return;
    }

    let dadosExportacao = [];

    if (colunas) {
        // Exportação personalizada (Auditoria)
        dadosExportacao = dados.map((item) => {
            const linha = {};

            colunas.forEach((coluna) => {
                linha[coluna.titulo] = formatarData(item[coluna.campo]);
            });

            return linha;
        });
    } else {
        // Exportação padrão (Relatórios/Staging)
        dadosExportacao = dados.map((registro) => ({
            Patrimônio: registro.patrimonio,
            Serial: registro.serial,
            Tipo: registro.tipo,
            Marca: registro.marca,
            Modelo: registro.modelo,
            "Data Solicitação": formatarData(registro.dataSolicitacao),
            "Solicitado Por": registro.solicitadoPor,
            "Tipo Staging": registro.tipoStaging,
            Escopo: registro.escopoStaging,
            Local: registro.localStaging,
            Responsável: registro.responsavel,
            "Data Início": formatarData(registro.dataInicio),
            "Data Conclusão": formatarData(registro.dataConclusao),
            Status: registro.status,
            Observação: registro.observacao
        }));
    }

    const worksheet = XLSX.utils.json_to_sheet(dadosExportacao);

    worksheet["!cols"] = colunas
        ? colunas.map((coluna) => ({
              wch: Math.max(coluna.titulo.length + 5, 18)
          }))
        : [
              { wch: 18 },
              { wch: 24 },
              { wch: 16 },
              { wch: 18 },
              { wch: 18 },
              { wch: 18 },
              { wch: 18 },
              { wch: 20 },
              { wch: 16 },
              { wch: 16 },
              { wch: 18 },
              { wch: 18 },
              { wch: 18 },
              { wch: 18 },
              { wch: 35 }
          ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Controle Staging"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const arquivo = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(arquivo, `${nomeArquivo}.xlsx`);
}
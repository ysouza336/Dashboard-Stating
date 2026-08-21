import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ===============================================
// FORMATA DATA PARA DD/MM/AAAA
// ===============================================

function formatarData(data) {

    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;

}

// ===============================================
// EXPORTAÇÃO DOS REGISTROS
// ===============================================

export function exportarRegistrosExcel(registros) {

    if (!registros.length) {
        alert("Não existem registros para exportar.");
        return;
    }

    const dados = registros.map((registro) => ({
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

    const worksheet = XLSX.utils.json_to_sheet(dados);

    // Ajuste da largura das colunas
    worksheet["!cols"] = [
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

    const arquivo = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    const hoje = new Date();

    const nomeArquivo =
        `STAGING_${
            hoje.toLocaleDateString("pt-BR").replace(/\//g, "-")
        }.xlsx`;

    saveAs(arquivo, nomeArquivo);

}
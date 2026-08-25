export function mapearLinhaExcel(linha) {
    return {
        patrimonio: linha["Patrimônio"]?.toString().trim() || "",
        serial: linha["Serial"] || linha["IMEI / Serial"] || "",
        hostname: linha["Hostname"] || "",
        serviceTag: linha["Service Tag"] || "",

        tipo: linha["Tipo"] || "",
        marca: linha["Marca"] || "",
        modelo: linha["Modelo"] || "",

        dataSolicitacao: linha["Data Solicitação"] || "",
        solicitadoPor: linha["Solicitado Por"] || "",

        tipoStaging: linha["Tipo Staging"] || "",
        escopoStaging: linha["Escopo"] || "",
        localStaging: linha["Local"] || "",

        responsavel: linha["Responsável"] || "",

        dataInicio: linha["Data Início"] || "",
        dataConclusao: linha["Data Conclusão"] || "",

        status: linha["Status"] || "Pendente",

        observacao: linha["Observação"] || ""
    };
}
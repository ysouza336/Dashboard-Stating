
export function criarRegistro(dados = {}) {

    return {
        id: crypto.randomUUID(),

        patrimonio: "",
        hostname: "",
        serviceTag: "",

        serial: "",

        tipo: "",
        marca: "",
        modelo: "",

        solicitadoPor: "",
        responsavel: "",

        tipoStaging: "",
        escopoStaging: "",
        localStaging: "",

        status: "Pendente",

        dataSolicitacao: "",
        dataFinalizacao: "",

        observacao: "",

        criadoEm: new Date().toISOString(),
        atualizadoEm: null,

        ...dados
    };

}

import { z } from "zod";

const registroSchema = z.object({

    patrimonio: z
        .string()
        .min(1, "Informe o patrimônio."),

    hostname: z
        .string()
        .min(1, "Informe o hostname."),

    serviceTag: z
        .string()
        .min(1, "Service Tag obrigatória."),

    serial: z
        .string()
        .min(1, "Informe o serial."),

    tipo: z
        .string()
        .min(1, "Selecione o tipo."),

    marca: z
        .string()
        .min(1, "Selecione a marca."),

    modelo: z
        .string()
        .optional(),

    dataSolicitacao: z
        .string()
        .min(1, "Informe a data de solicitação."),

    solicitadoPor: z
        .string()
        .min(1, "Informe o solicitante."),

    tipoStaging: z
        .string()
        .min(1, "Selecione o tipo de staging."),

    escopoStaging: z
        .string()
        .min(1, "Selecione o escopo."),

    localStaging: z
        .string()
        .min(1, "Selecione o local."),

    responsavel: z
        .string()
        .min(1, "Informe o responsável."),

    dataInicio: z
        .string()
        .optional(),

    dataConclusao: z
        .string()
        .optional(),

    status: z
        .string()
        .min(1, "Selecione o status."),

    observacao: z
        .string()
        .optional()

});

export default registroSchema;
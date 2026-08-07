import { z } from "zod";

const registroSchema = z.object({

    patrimonio: z
        .string()
        .min(1, "Informe o patrimônio."),

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

    solicitadoPor: z
        .string()
        .min(1, "Informe o solicitante."),

    responsavel: z
        .string()
        .min(1, "Informe o responsável."),

    status: z
        .string()
        .min(1, "Selecione o status."),

    observacao: z
        .string()
        .optional()

});

export default registroSchema;
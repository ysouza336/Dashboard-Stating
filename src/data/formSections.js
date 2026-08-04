import { options } from "./options";

const formSections = [
    {
        id: "equipamento",
        title: "Dados do Equipamento",
        icon: "computer",

        fields: [

            {
                name: "patrimonio",
                label: "Patrimônio",
                type: "text",
                required: true,
                col: 4
            },

            {
                name: "serial",
                label: "IMEI / Serial",
                type: "text",
                required: true,
                col: 4
            },

            {
                name: "tipo",
                label: "Tipo",
                type: "select",
                options: options.tipo,
                col: 4
            },

            {
                name: "marca",
                label: "Marca",
                type: "select",
                options: options.marca,
                col: 4
            },

            {
                name: "modelo",
                label: "Modelo",
                type: "text",
                col: 4
            }

        ]
    },

    {
        id: "solicitacao",

        title: "Solicitação",

        icon: "clipboard",

        fields: [

            {
                name: "dataSolicitacao",
                label: "Data Solicitação",
                type: "date",
                col: 4
            },

            {
                name: "solicitadoPor",
                label: "Solicitado por",
                type: "select",
                options: options.solicitadoPor,
                col: 4
            }

        ]
    },

    {
        id: "staging",

        title: "Processo de Staging",

        icon: "boxes",

        fields: [

            {
                name: "tipoStaging",
                label: "Tipo de Staging",
                type: "select",
                options: options.tipoStaging,
                col: 4
            },

            {
                name: "escopoStaging",
                label: "Escopo",
                type: "select",
                options: options.escopoStaging,
                col: 4
            },

            {
                name: "localStaging",
                label: "Local",
                type: "select",
                options: options.localStaging,
                col: 4
            },

            {
                name: "responsavel",
                label: "Responsável",
                type: "select",
                options: options.responsavel,
                col: 4
            }

        ]
    },

    {
        id: "finalizacao",

        title: "Finalização",

        icon: "check",

        fields: [

            {
                name: "dataInicio",
                label: "Data Início",
                type: "date",
                col: 4
            },

            {
                name: "dataConclusao",
                label: "Data Conclusão",
                type: "date",
                col: 4
            },

            {
                name: "status",
                label: "Status",
                type: "select",
                options: options.status,
                col: 4
            },

            {
                name: "observacao",
                label: "Observações",
                type: "textarea",
                rows: 4,
                col: 12
            }

        ]
    }

];

export default formSections;
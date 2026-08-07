import { options } from "./options";

const formSections = [
    {
        id: "equipamento",
        title: "Dados do Equipamento",

        fields: [
            {
                name: "patrimonio",
                label: "Patrimônio",
                component: "input",
                type: "text",
                placeholder: "Digite o patrimônio",
                required: true,
                col: 4
            },

            {
                name: "serial",
                label: "IMEI / Serial",
                component: "input",
                type: "text",
                placeholder: "Digite o IMEI ou Serial",
                required: true,
                col: 4
            },

            {
                name: "tipo",
                label: "Tipo",
                component: "select",
                options: options.tipo,
                required: true,
                col: 4
            },

            {
                name: "marca",
                label: "Marca",
                component: "select",
                options: options.marca,
                required: true,
                col: 4
            },

            {
                name: "modelo",
                label: "Modelo",
                component: "input",
                type: "text",
                placeholder: "Digite o modelo",
                col: 4
            }
        ]
    },

    {
        id: "solicitacao",
        title: "Solicitação",

        fields: [
            {
                name: "dataSolicitacao",
                label: "Data Solicitação",
                component: "date",
                required: true,
                col: 4
            },

            {
                name: "solicitadoPor",
                label: "Solicitado por",
                component: "select",
                options: options.solicitadoPor,
                required: true,
                col: 4
            }
        ]
    },

    {
        id: "staging",
        title: "Processo de Staging",

        fields: [
            {
                name: "tipoStaging",
                label: "Tipo de Staging",
                component: "select",
                options: options.tipoStaging,
                required: true,
                col: 4
            },

            {
                name: "escopoStaging",
                label: "Escopo",
                component: "select",
                options: options.escopoStaging,
                required: true,
                col: 4
            },

            {
                name: "localStaging",
                label: "Local",
                component: "select",
                options: options.localStaging,
                required: true,
                col: 4
            },

            {
                name: "responsavel",
                label: "Responsável",
                component: "select",
                options: options.responsavel,
                required: true,
                col: 4
            }
        ]
    },

    {
        id: "finalizacao",
        title: "Finalização",

        fields: [
            {
                name: "dataInicio",
                label: "Data Início",
                component: "date",
                col: 4
            },

            {
                name: "dataConclusao",
                label: "Data Conclusão",
                component: "date",
                col: 4
            },

            {
                name: "status",
                label: "Status",
                component: "select",
                options: options.status,
                required: true,
                col: 4
            },

            {
                name: "observacao",
                label: "Observações",
                component: "textarea",
                rows: 4,
                col: 12
            }
        ]
    }
];

export default formSections;
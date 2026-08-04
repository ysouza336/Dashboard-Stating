import { options } from "./options";

const fields = [

    {
        id: 1,
        name: "patrimonio",
        label: "Patrimônio",
        type: "text",
        required: true,
        placeholder: "Digite o patrimônio"
    },

    {
        id: 2,
        name: "serial",
        label: "IMEI / Serial",
        type: "text",
        required: true,
        placeholder: "Digite o IMEI ou Serial"
    },

    {
        id: 3,
        name: "tipo",
        label: "Tipo",
        type: "select",
        required: true,
        options: options.tipo
    },

    {
        id: 4,
        name: "marca",
        label: "Marca",
        type: "select",
        required: true,
        options: options.marca
    },

    {
        id: 5,
        name: "modelo",
        label: "Modelo",
        type: "text",
        required: true
    },

    {
        id: 6,
        name: "dataSolicitacao",
        label: "Data Solicitação",
        type: "date",
        required: true
    },

    {
        id: 7,
        name: "solicitadoPor",
        label: "Solicitado por",
        type: "select",
        required: true,
        options: options.solicitadoPor
    },

    {
        id: 8,
        name: "tipoStaging",
        label: "Tipo de Staging",
        type: "select",
        required: true,
        options: options.tipoStaging
    },

    {
        id: 9,
        name: "escopoStaging",
        label: "Escopo do Staging",
        type: "select",
        required: true,
        options: options.escopoStaging
    },

    {
        id: 10,
        name: "localStaging",
        label: "Local Staging",
        type: "select",
        required: true,
        options: options.localStaging
    },

    {
        id: 11,
        name: "responsavel",
        label: "Responsável",
        type: "select",
        required: true,
        options: options.responsavel
    },

    {
        id: 12,
        name: "dataInicio",
        label: "Data Início",
        type: "date"
    },

    {
        id: 13,
        name: "dataConclusao",
        label: "Data Conclusão",
        type: "date"
    },

    {
        id: 14,
        name: "status",
        label: "Status",
        type: "select",
        options: options.status
    },

    {
        id: 15,
        name: "observacao",
        label: "Observações",
        type: "textarea",
        rows: 4
    }

];

export default fields;




// const formSections = [
//   {
//     title: "Dados do Equipamento",
//     fields: [ ... ]
//   },
//   {
//     title: "Solicitação",
//     fields: [ ... ]
//   },
//   {
//     title: "Staging",
//     fields: [ ... ]
//   },
//   {
//     title: "Finalização",
//     fields: [ ... ]
//   }
// ];

// export default formSections;
import { options } from "./options";

const formSections = [
    {
        id: "equipamento",
        title: "Dados do Equipamento",

        fields: [
            {
                name: "hostname",
                label: "Hostname (AD)",
                component: "input",
                type: "text",
                placeholder: "BRXXX7JX9KQ3",
                required: true,
                col: 4
            },
            {
                name: "serviceTag",
                label: "Service Tag",
                component: "serviceTag",
                col: 4
            },
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

/**
 * Varre todas as seções/campos de formSections e monta um objeto plano
 * { nomeDoCampo: [opções] } para os campos do tipo "select".
 *
 * Isso permite que qualquer componente (ex: NovoRegistro.jsx) acesse
 * as opções de um campo específico sem precisar importar options.js
 * de novo nem soletrar formSections[i].fields[j].options manualmente.
 *
 * Exemplo de uso:
 *   import { opcoesPorCampo } from "../../data/formSections";
 *   opcoesPorCampo.tipo   -> ["Notebook", "Desktop", "Monitor"]
 *   opcoesPorCampo.marca  -> ["Dell", "Lenovo", "HP", "Apple"]
 */
export const opcoesPorCampo = formSections.reduce((acumulador, secao) => {
    secao.fields.forEach((campo) => {
        if (campo.component === "select" && campo.options) {
            acumulador[campo.name] = campo.options;
        }
    });

    return acumulador;
}, {});

export default formSections;
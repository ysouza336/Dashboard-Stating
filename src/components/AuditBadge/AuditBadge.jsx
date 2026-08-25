import "./AuditBadge.css";

function AuditBadge({ acao }) {

    function getClass() {

        switch (acao) {

            case "Equipamento cadastrado":
                return "audit-success";

            case "Equipamento atualizado":
                return "audit-primary";

            case "Status alterado":
                return "audit-warning";

            case "Equipamento removido":
                return "audit-danger";

            case "Importação em massa":
                return "audit-discovery";

            default:
                return "audit-secondary";
        }

    }

    return (
        <span className={`audit-badge ${getClass()}`}>
            {acao}
        </span>
    );

}

export default AuditBadge;


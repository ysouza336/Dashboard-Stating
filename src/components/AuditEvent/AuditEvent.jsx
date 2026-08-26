
import {
    CheckCircle2,
    Pencil,
    RefreshCcw,
    Trash2,
    Upload
} from "lucide-react";

import "./AuditEvent.css";

function AuditEvent({ evento }) {

    function getIcon() {

        switch (evento.acao) {

            case "Equipamento cadastrado":
                return <CheckCircle2 size={18} />;

            case "Equipamento atualizado":
                return <Pencil size={18} />;

            case "Status alterado":
                return <RefreshCcw size={18} />;

            case "Equipamento removido":
                return <Trash2 size={18} />;

            case "Importação em massa":
                return <Upload size={18} />;

            default:
                return <RefreshCcw size={18} />;

        }

    }

    function getColor() {

        switch (evento.acao) {

            case "Equipamento cadastrado":
                return "event-success";

            case "Equipamento atualizado":
                return "event-primary";

            case "Status alterado":
                return "event-warning";

            case "Equipamento removido":
                return "event-danger";

            case "Importação em massa":
                return "event-discovery";

            default:
                return "event-secondary";

        }

    }

    function formatarData(data) {

        return new Date(data).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    return (

        <div className="audit-event">

            <div className={`event-icon ${getColor()}`}>
                {getIcon()}
            </div>

            <div className="event-content">

                <div className="event-header">

                    <strong>{evento.acao}</strong>

                    <span>{formatarData(evento.data)}</span>

                </div>

                <p>{evento.detalhes}</p>

                <div className="event-footer">

                    <span>Patrimônio: {evento.patrimonio || "-"}</span>

                    <span>Hostname: {evento.hostname || "-"}</span>

                    <span>Usuário: {evento.usuario}</span>

                </div>

            </div>

        </div>

    );

}

export default AuditEvent;


import { useEffect } from "react";
import "./Alert.css";

function Alert({
    type = "info",
    message,
    onClose
}) {

    useEffect(() => {

        if (!message) return;

        // Fecha automaticamente após 4 segundos
        const timer = setTimeout(() => {
            onClose?.();
        }, 2000);

        // Limpa o timer ao trocar de página ou desmontar o componente
        return () => clearTimeout(timer);

    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
        >
            {message}

            <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={onClose}
            />
        </div>
    );
}

export default Alert;
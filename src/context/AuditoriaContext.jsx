import { createContext, useContext, useEffect, useState } from "react";

const AuditoriaContext = createContext();

export function AuditoriaProvider({ children }) {

    const [logs, setLogs] = useState(() => {
        const logsSalvos = localStorage.getItem("staging_logs");
        return logsSalvos ? JSON.parse(logsSalvos) : [];
    });

    useEffect(() => {
        localStorage.setItem("staging_logs", JSON.stringify(logs));
    }, [logs]);

    function adicionarLog({
        usuario = "Sistema",
        acao,
        patrimonio = "",
        hostname = "",
        detalhes = ""
    }) {
        const novoLog = {
            id: crypto.randomUUID(),
            data: new Date().toISOString(),
            usuario,
            acao,
            patrimonio,
            hostname,
            detalhes
        };

        setLogs((logsAtuais) => [novoLog, ...logsAtuais]);
    }

    function limparLogs() {
        setLogs([]);
    }

    return (
        <AuditoriaContext.Provider
            value={{
                logs,
                adicionarLog,
                limparLogs
            }}
        >
            {children}
        </AuditoriaContext.Provider>
    );
}

export function useAuditoria() {
    const context = useContext(AuditoriaContext);

    if (!context) {
        throw new Error("useAuditoria deve ser usado dentro de AuditoriaProvider.");
    }

    return context;
}


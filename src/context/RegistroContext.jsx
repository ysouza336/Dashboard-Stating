import { createContext, useContext, useState } from "react";

const RegistroContext = createContext();

export function RegistroProvider({ children }) {

    // Registros do sistema
    const [registros, setRegistros] = useState([]);

    // Mensagem global do sistema
    const [mensagem, setMensagem] = useState(null);

    // ==========================================
    // ALERTAS
    // ==========================================

    function mostrarMensagem(type, message) {
        setMensagem({ type, message });
    }

    function limparMensagem() {
        setMensagem(null);
    }

    // ==========================================
    // CADASTRO
    // ==========================================

    function adicionarRegistro(dados) {

        const novoRegistro = {
            id: crypto.randomUUID(),
            ...dados,
            criadoEm: new Date().toISOString()
        };

        setRegistros((registrosAtuais) => [
            ...registrosAtuais,
            novoRegistro
        ]);

        return novoRegistro;
    }

    // ==========================================
    // EDIÇÃO
    // ==========================================

    function atualizarRegistro(id, dadosAtualizados) {

        setRegistros((registrosAtuais) =>
            registrosAtuais.map((registro) =>
                registro.id === id
                    ? {
                        ...registro,
                        ...dadosAtualizados,
                        id: registro.id,
                        criadoEm: registro.criadoEm,
                        atualizadoEm: new Date().toISOString()
                    }
                    : registro
            )
        );
    }

    // ==========================================
    // EXCLUSÃO
    // ==========================================

    function removerRegistro(id) {

        setRegistros((registrosAtuais) =>
            registrosAtuais.filter(
                (registro) => registro.id !== id
            )
        );
    }

    return (
        <RegistroContext.Provider
            value={{
                registros,
                adicionarRegistro,
                atualizarRegistro,
                removerRegistro,
                mensagem,
                mostrarMensagem,
                limparMensagem
            }}
        >
            {children}
        </RegistroContext.Provider>
    );
}

export function useRegistros() {

    const context = useContext(RegistroContext);

    if (!context) {
        throw new Error(
            "useRegistros deve ser utilizado dentro de RegistroProvider."
        );
    }

    return context;
}
import { createContext, useContext, useState } from "react";


const [mensagem, setMensagem] = useState(null);

const RegistroContext = createContext();

export function RegistroProvider({ children }) {

    function mostrarMensagem(type, message) {

        setMensagem({
            type,
            message
        });

    }
    function limparMensagem() {

        setMensagem(null);

    }

    const [registros, setRegistros] = useState([]);

    // =====================================================
    // ADICIONAR REGISTRO
    // =====================================================

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

    // =====================================================
    // ATUALIZAR REGISTRO
    // =====================================================

    function atualizarRegistro(id, dadosAtualizados) {

        let registroAtualizado = null;

        setRegistros((registrosAtuais) => {

            const novosRegistros = registrosAtuais.map((registro) => {

                if (registro.id !== id) {
                    return registro;
                }

                registroAtualizado = {
                    ...registro,
                    ...dadosAtualizados,
                    id: registro.id,
                    criadoEm: registro.criadoEm,
                    atualizadoEm: new Date().toISOString()
                };

                return registroAtualizado;
            });

            return novosRegistros;
        });

        return registroAtualizado;
    }

    // =====================================================
    // REMOVER REGISTRO
    // =====================================================

    function removerRegistro(id) {

        setRegistros((registrosAtuais) =>
            registrosAtuais.filter(
                (registro) => registro.id !== id
            )
        );
    }

    // =====================================================
    // PROVIDER
    // =====================================================

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

// =========================================================
// HOOK
// =========================================================

export function useRegistros() {

    const context = useContext(RegistroContext);

    if (!context) {

        throw new Error(
            "useRegistros deve ser utilizado dentro de RegistroProvider."
        );

    }

    return context;
}
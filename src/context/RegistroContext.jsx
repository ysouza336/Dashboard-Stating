import { createContext, useContext, useState } from "react";

const RegistroContext = createContext();

export function RegistroProvider({ children }) {

    const [registros, setRegistros] = useState([]);

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

    function atualizarRegistro(id, dadosAtualizados) {

        setRegistros((registrosAtuais) =>
            registrosAtuais.map((registro) =>
                registro.id === id
                    ? {
                        ...registro,
                        ...dadosAtualizados
                    }
                    : registro
            )
        );
    }

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
                removerRegistro
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
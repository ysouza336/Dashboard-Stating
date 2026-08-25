
import { createContext, useContext, useEffect, useState } from "react";
import { useAuditoria } from "./AuditoriaContext";

const RegistroContext = createContext();

export function RegistroProvider({ children }) {

    const { adicionarLog } = useAuditoria();

    // ==============================
    // ESTADO DOS REGISTROS
    // ==============================

    const [registros, setRegistros] = useState(() => {
        const dados = localStorage.getItem("staging_registros");
        return dados ? JSON.parse(dados) : [];
    });

    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            "staging_registros",
            JSON.stringify(registros)
        );
    }, [registros]);

    // ==============================
    // ALERTAS
    // ==============================

    function mostrarMensagem(tipo, texto) {
        setMensagem({ tipo, texto });

        setTimeout(() => {
            setMensagem(null);
        }, 3000);
    }

    function limparMensagem() {
        setMensagem(null);
    }

    // ==============================
    // CADASTRAR
    // ==============================

    function adicionarRegistro(dados) {

        const novoRegistro = {
            id: crypto.randomUUID(),
            ...dados,
            criadoEm: new Date().toISOString(),
            atualizadoEm: null
        };

        setRegistros((lista) => [...lista, novoRegistro]);

        adicionarLog({
            acao: "Equipamento cadastrado",
            patrimonio: novoRegistro.patrimonio,
            hostname: novoRegistro.hostname,
            detalhes: `${novoRegistro.tipo} ${novoRegistro.marca} ${novoRegistro.modelo}`
        });

        mostrarMensagem(
            "success",
            "Equipamento cadastrado com sucesso."
        );

        return novoRegistro;
    }

    // ==============================
    // EDITAR
    // ==============================

    function atualizarRegistro(id, dadosAtualizados) {

        setRegistros((lista) =>
            lista.map((registro) => {

                if (registro.id !== id) return registro;

                if (
                    registro.status !== dadosAtualizados.status
                ) {
                    adicionarLog({
                        acao: "Status alterado",
                        patrimonio: registro.patrimonio,
                        hostname: registro.hostname,
                        detalhes: `${registro.status} → ${dadosAtualizados.status}`
                    });
                }

                adicionarLog({
                    acao: "Equipamento atualizado",
                    patrimonio: registro.patrimonio,
                    hostname: registro.hostname,
                    detalhes: "Dados do equipamento atualizados."
                });

                return {
                    ...registro,
                    ...dadosAtualizados,
                    atualizadoEm: new Date().toISOString()
                };

            })
        );

        mostrarMensagem(
            "success",
            "Equipamento atualizado com sucesso."
        );
    }

    // ==============================
    // EXCLUIR
    // ==============================

    function removerRegistro(id) {

        const registro = registros.find((r) => r.id === id);

        if (registro) {
            adicionarLog({
                acao: "Equipamento removido",
                patrimonio: registro.patrimonio,
                hostname: registro.hostname,
                detalhes: `${registro.tipo} ${registro.marca} removido do sistema`
            });
        }

        setRegistros((lista) =>
            lista.filter((registro) => registro.id !== id)
        );

        mostrarMensagem(
            "success",
            "Equipamento removido com sucesso."
        );
    }

    // ==============================
    // IMPORTAÇÃO EM MASSA
    // ==============================

    function importarRegistros(listaRegistros) {

        const novos = listaRegistros.map((registro) => ({
            id: crypto.randomUUID(),
            ...registro,
            criadoEm: new Date().toISOString(),
            atualizadoEm: null
        }));

        setRegistros((lista) => [...lista, ...novos]);

        adicionarLog({
            acao: "Importação em massa",
            detalhes: `${novos.length} equipamentos importados via Excel`
        });

        mostrarMensagem(
            "success",
            `${novos.length} registros importados.`
        );
    }

    // ==============================
    // LIMPAR REGISTROS
    // ==============================

    function limparRegistros() {

        setRegistros([]);

        adicionarLog({
            acao: "Base de equipamentos limpa",
            detalhes: "Todos os registros foram removidos."
        });

        mostrarMensagem(
            "warning",
            "Todos os registros foram apagados."
        );
    }

    return (
        <RegistroContext.Provider
            value={{
                registros,

                adicionarRegistro,
                atualizarRegistro,
                removerRegistro,
                importarRegistros,
                limparRegistros,

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


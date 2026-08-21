import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const RegistroContext = createContext();

const STORAGE_KEY = "controle-staging-registros";

export function RegistroProvider({ children }) {

    // =====================================================
    // ESTADOS
    // =====================================================

    // Carrega os registros salvos do navegador ao iniciar o sistema.
    const [registros, setRegistros] = useState(() => {

        try {

            const dadosSalvos = localStorage.getItem(STORAGE_KEY);

            return dadosSalvos
                ? JSON.parse(dadosSalvos)
                : [];

        } catch (error) {

            console.error(
                "Erro ao carregar registros do LocalStorage:",
                error
            );

            return [];

        }

    });

    // Alerta global do sistema.
    const [mensagem, setMensagem] = useState(null);

    // =====================================================
    // LOCAL STORAGE
    // =====================================================

    // Sempre que os registros forem alterados, salva automaticamente.
    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(registros)
        );

    }, [registros]);

    // =====================================================
    // ALERTAS
    // =====================================================

    function mostrarMensagem(type, message) {

        setMensagem({
            type,
            message
        });

    }

    function limparMensagem() {

        setMensagem(null);

    }

    // =====================================================
    // CADASTRAR REGISTRO
    // =====================================================

    function adicionarRegistro(dados) {

        const novoRegistro = {
            id: crypto.randomUUID(),
            ...dados,
            criadoEm: new Date().toISOString(),
            atualizadoEm: null
        };

        setRegistros((listaAtual) => [
            ...listaAtual,
            novoRegistro
        ]);

        return novoRegistro;

    }

    // =====================================================
    // ATUALIZAR REGISTRO
    // =====================================================

    function atualizarRegistro(id, dadosAtualizados) {

        setRegistros((listaAtual) =>
            listaAtual.map((registro) => {

                if (registro.id !== id) {
                    return registro;
                }

                return {
                    ...registro,
                    ...dadosAtualizados,
                    id: registro.id,
                    criadoEm: registro.criadoEm,
                    atualizadoEm: new Date().toISOString()
                };

            })
        );

    }

    // =====================================================
    // REMOVER REGISTRO
    // =====================================================

    function removerRegistro(id) {

        setRegistros((listaAtual) =>
            listaAtual.filter(
                (registro) => registro.id !== id
            )
        );

    }

    // =====================================================
    // LIMPAR TODOS OS REGISTROS
    // (Usado futuramente em Configurações)
    // =====================================================

    function limparRegistros() {

        setRegistros([]);
        localStorage.removeItem(STORAGE_KEY);

        mostrarMensagem(
            "success",
            "Todos os registros foram removidos com sucesso."
        );

    }

    // =====================================================
    // PROVIDER
    // =====================================================

    return (

        <RegistroContext.Provider
            value={{

                // Dados
                registros,

                // CRUD
                adicionarRegistro,
                atualizarRegistro,
                removerRegistro,
                limparRegistros,

                // Alertas
                mensagem,
                mostrarMensagem,
                limparMensagem

            }}
        >

            {children}

        </RegistroContext.Provider>

    );

}

// =====================================================
// HOOK CUSTOMIZADO
// =====================================================

export function useRegistros() {

    const context = useContext(RegistroContext);

    if (!context) {

        throw new Error(
            "useRegistros deve ser utilizado dentro de RegistroProvider."
        );

    }

    return context;

}
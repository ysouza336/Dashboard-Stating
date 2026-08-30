import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "staging_auth_session";
const SESSION_TIME = 8 * 60 * 60 * 1000; // 8 horas

const USUARIOS_PADRAO = [
    {
        id: 1,
        usuario: "admin",
        senha: "admin123",
        nome: "Administrador",
        perfil: "Administrador",
    },
    {
        id: 2,
        usuario: "tecnico",
        senha: "tecnico123",
        nome: "Técnico TI",
        perfil: "Tecnico",
    },
];

export function AuthProvider({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessao = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (sessao) {
            const expirou = Date.now() > sessao.expiraEm;

            if (!expirou) {
                setUsuarioLogado(sessao.usuario);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        }

        setLoading(false);
    }, []);

    async function login({ usuario, senha, lembrarUsuario }) {
        const encontrado = USUARIOS_PADRAO.find(
            (u) => u.usuario === usuario && u.senha === senha
        );

        if (!encontrado) return false;

        const sessao = {
            usuario: encontrado,
            expiraEm: Date.now() + SESSION_TIME,
            lembrarUsuario,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessao));
        setUsuarioLogado(encontrado);

        return true;
    }
    function logout() {
        localStorage.removeItem(STORAGE_KEY);
        setUsuarioLogado(null);

        // Sprint 7.2: registrar evento na Auditoria
        // registrarAuditoria("Logout", usuarioLogado?.usuario);
    }

    function renovarSessao() {
        const sessao = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!sessao) return;

        sessao.expiraEm = Date.now() + SESSION_TIME;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessao));
    }

    function hasPermission(perfis = []) {
        if (!usuarioLogado) return false;

        return perfis.includes(usuarioLogado.perfil);
    }

    const value = {
        usuarioLogado,
        loading,
        login,
        logout,
        renovarSessao,
        hasPermission,

        isAdmin: usuarioLogado?.perfil === "Administrador",
        isTecnico: usuarioLogado?.perfil === "Tecnico",
        isLeitura: usuarioLogado?.perfil === "Leitura",
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;
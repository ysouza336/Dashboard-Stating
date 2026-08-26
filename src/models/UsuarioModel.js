
export function criarUsuario(dados = {}) {

    return {

        id: crypto.randomUUID(),

        nome: "",
        email: "",

        perfil: "Tecnico",

        ativo: true,

        criadoEm: new Date().toISOString(),

        ultimoLogin: null,

        ...dados

    };

}


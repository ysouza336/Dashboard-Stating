const STORAGE_USERS = "staging_users";
const STORAGE_SESSION = "staging_auth_session";

const usuariosPadrao = [
  {
    id: crypto.randomUUID(),
    usuario: "admin",
    senha: "admin123",
    nome: "Administrador do Sistema",
    perfil: "Administrador",
    ativo: true,
    criadoEm: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    usuario: "tecnico",
    senha: "tecnico123",
    nome: "Técnico TI",
    perfil: "Tecnico",
    ativo: true,
    criadoEm: new Date().toISOString(),
  },
];

function inicializarUsuarios() {
  const usuarios = localStorage.getItem(STORAGE_USERS);

  if (!usuarios) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(usuariosPadrao));
  }
}

function listarUsuarios() {
  inicializarUsuarios();
  return JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
}

function autenticar(usuario, senha) {
  const usuarios = listarUsuarios();

  return (
    usuarios.find(
      (u) =>
        u.usuario === usuario &&
        u.senha === senha &&
        u.ativo === true
    ) || null
  );
}

function salvarSessao(usuario) {
  localStorage.setItem(
    STORAGE_SESSION,
    JSON.stringify({
      usuario,
      expiraEm: Date.now() + 8 * 60 * 60 * 1000,
    })
  );
}

function obterSessao() {
  const sessao = JSON.parse(localStorage.getItem(STORAGE_SESSION));

  if (!sessao) return null;

  if (Date.now() > sessao.expiraEm) {
    limparSessao();
    return null;
  }

  return sessao.usuario;
}

function limparSessao() {
  localStorage.removeItem(STORAGE_SESSION);
}

function adicionarUsuario(usuario) {
  const usuarios = listarUsuarios();

  usuarios.push({
    ...usuario,
    id: crypto.randomUUID(),
    ativo: true,
    criadoEm: new Date().toISOString(),
  });

  localStorage.setItem(STORAGE_USERS, JSON.stringify(usuarios));
}

function atualizarUsuario(id, dados) {
  const usuarios = listarUsuarios().map((u) =>
    u.id === id ? { ...u, ...dados } : u
  );

  localStorage.setItem(STORAGE_USERS, JSON.stringify(usuarios));
}

function removerUsuario(id) {
  const usuarios = listarUsuarios().filter((u) => u.id !== id);

  localStorage.setItem(STORAGE_USERS, JSON.stringify(usuarios));
}

export default {
  listarUsuarios,
  autenticar,
  salvarSessao,
  obterSessao,
  limparSessao,
  adicionarUsuario,
  atualizarUsuario,
  removerUsuario,
};
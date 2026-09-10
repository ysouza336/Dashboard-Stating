import { useEffect, useState } from "react";
import { X, Save, UserPlus } from "lucide-react";
import AuthService from "../../services/AuthService";
import "./UserModal.css";

const PERFIS = ["Administrador", "Tecnico", "Visualizador"];

const USUARIO_INICIAL = {
  nome: "",
  usuario: "",
  senha: "",
  perfil: "Tecnico",
  ativo: true,
};

function UserModal({ open, usuario, onClose, onSave }) {
  const [form, setForm] = useState(USUARIO_INICIAL);
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!open) return;

    if (usuario) {
      setForm({
        id: usuario.id,
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: "",
        perfil: usuario.perfil,
        ativo: usuario.ativo,
      });
    } else {
      setForm(USUARIO_INICIAL);
    }

    setErros({});
  }, [open, usuario]);

  if (!open) return null;

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));

    if (erros[campo]) {
      setErros((prev) => ({
        ...prev,
        [campo]: null,
      }));
    }
  }

  function validarFormulario() {
    const novosErros = {};

    if (!form.nome.trim()) {
      novosErros.nome = "Informe o nome.";
    }

    if (!form.usuario.trim()) {
      novosErros.usuario = "Informe o usuário.";
    }

    if (!usuario && !form.senha.trim()) {
      novosErros.senha = "Informe uma senha.";
    }

    const existente = AuthService.listarUsuarios().find(
      (u) =>
        u.usuario.toLowerCase() === form.usuario.toLowerCase() &&
        u.id !== form.id
    );

    if (existente) {
      novosErros.usuario = "Usuário já cadastrado.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function salvarUsuario() {
    if (!validarFormulario()) return;

    const payload = {
      nome: form.nome.trim(),
      usuario: form.usuario.trim().toLowerCase(),
      perfil: form.perfil,
      ativo: form.ativo,
    };

    if (form.senha.trim()) {
      payload.senha = form.senha;
    }

    if (usuario) {
      AuthService.atualizarUsuario(form.id, payload);
    } else {
      AuthService.criarUsuario(payload);
    }

    onSave?.();
  }

  return (
    <div className="modal-overlay">
      <div className="user-modal">
        <div className="user-modal-header">
          <div className="user-modal-title">
            <UserPlus size={22} />
            <div>
              <h4>{usuario ? "Editar Usuário" : "Novo Usuário"}</h4>
              <p>Gerenciamento de acesso ao Controle Staging.</p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="user-modal-body">
          <div className="mb-3">
            <label className="form-label">
              Nome Completo <span className="required">*</span>
            </label>

            <input
              type="text"
              className={`form-control ${erros.nome ? "is-invalid" : ""}`}
              value={form.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
              placeholder="Ex.: Yuri Silva"
            />

            {erros.nome && (
              <div className="invalid-feedback d-block">{erros.nome}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              Usuário/Login <span className="required">*</span>
            </label>

            <input
              type="text"
              className={`form-control ${erros.usuario ? "is-invalid" : ""}`}
              value={form.usuario}
              onChange={(e) => atualizarCampo("usuario", e.target.value)}
              placeholder="Ex.: yuri.silva"
            />

            {erros.usuario && (
              <div className="invalid-feedback d-block">{erros.usuario}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              {usuario ? "Nova Senha (Opcional)" : "Senha"}
              {!usuario && <span className="required"> *</span>}
            </label>

            <input
              type="password"
              className={`form-control ${erros.senha ? "is-invalid" : ""}`}
              value={form.senha}
              onChange={(e) => atualizarCampo("senha", e.target.value)}
              placeholder={
                usuario
                  ? "Digite apenas para alterar a senha."
                  : "Digite a senha do usuário."
              }
            />

            {erros.senha && (
              <div className="invalid-feedback d-block">{erros.senha}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Perfil</label>

            <select
              className="form-select"
              value={form.perfil}
              onChange={(e) => atualizarCampo("perfil", e.target.value)}
            >
              {PERFIS.map((perfil) => (
                <option key={perfil} value={perfil}>
                  {perfil}
                </option>
              ))}
            </select>
          </div>

          <div className="user-switch">
            <div>
              <strong>Usuário Ativo</strong>
              <span>Permitir acesso ao sistema.</span>
            </div>

            <input
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => atualizarCampo("ativo", e.target.checked)}
            />
          </div>
        </div>

        <div className="user-modal-footer">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn btn-primary" onClick={salvarUsuario}>
            <Save size={18} />
            {usuario ? "Salvar Alterações" : "Cadastrar Usuário"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import AuthService from "../../services/AuthService";

const initialState = {
  nome: "",
  usuario: "",
  senha: "",
  perfil: "Tecnico",
  ativo: true,
};

function UserModal({ open, usuario, onClose, onSave }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: "",
        perfil: usuario.perfil,
        ativo: usuario.ativo,
      });
    } else {
      setForm(initialState);
    }
  }, [usuario]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...usuario,
      ...form,
    };

    if (usuario) {
      AuthService.atualizarUsuario(usuario.id, payload);
    } else {
      AuthService.adicionarUsuario(payload);
    }

    onSave();
  }

  return (
    <div className="modal-backdrop-custom">
      <div className="user-modal">

        <div className="user-modal-header">
          <h5>
            {usuario ? "Editar Usuário" : "Novo Usuário"}
          </h5>

          <button
            type="button"
            className="btn-close-modal"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-modal-body">

          <div className="mb-3">
            <label className="form-label">Nome Completo *</label>

            <input
              className="form-control"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Usuário *</label>

            <input
              className="form-control"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {usuario ? "Nova Senha (Opcional)" : "Senha *"}
            </label>

            <input
              className="form-control"
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required={!usuario}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Perfil *</label>

            <select
              className="form-select"
              name="perfil"
              value={form.perfil}
              onChange={handleChange}
            >
              <option value="Administrador">
                Administrador
              </option>

              <option value="Tecnico">Técnico</option>

              <option value="Leitura">
                Somente Leitura
              </option>
            </select>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="ativo"
              checked={form.ativo}
              onChange={handleChange}
            />

            <label className="form-check-label">
              Usuário Ativo
            </label>
          </div>

          <div className="user-modal-footer">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={18} />
              {usuario ? "Salvar Alterações" : "Cadastrar Usuário"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default UserModal;
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function PermissionGate({
  allow = [],
  children,
}) {
  const { usuarioLogado, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Verificando permissões"
        >
          <span className="visually-hidden">
            Verificando permissões...
          </span>
        </div>
      </div>
    );
  }

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(usuarioLogado.perfil)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PermissionGate;
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PermissionGate({ allow, children }) {
  const { usuarioLogado } = useAuth();

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(usuarioLogado.perfil)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PermissionGate;
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute() {
  const { usuarioLogado, loading } = useAuth();

  if (loading) {
    return <div className="loading-page">Carregando...</div>;
  }

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
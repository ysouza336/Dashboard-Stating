import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function PrivateRoute() {
  const { usuarioLogado, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Carregando"
        >
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!usuarioLogado) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
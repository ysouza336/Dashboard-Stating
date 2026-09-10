import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PermissionGate from "./PermissionGate";

import MainLayout from "../layout/MainLayout";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRegistro from "../pages/NovoRegistro/NovoRegistro";
import Relatorios from "../pages/Relatorios/Relatorios";
import ImportarExcel from "../pages/ImportarExcel/ImportarExcel";
import Usuarios from "../pages/Usuarios/Usuarios";
import Auditoria from "../pages/Auditoria/Auditoria";
import Administracao from "../pages/Administracao/Administracao";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
   
      <Routes>

        {/* ==========================================
            ROTA PÚBLICA
        ========================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ==========================================
            ROTAS PRIVADAS
        ========================================== */}

        <Route element={<PrivateRoute />}>

          <Route element={<MainLayout />}>

            {/* Dashboard */}

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <Dashboard />
              }
            />

            {/* Novo Registro */}

            <Route
              path="/novo"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                    "Tecnico",
                  ]}
                >
                  <NovoRegistro />
                </PermissionGate>
              }
            />

            {/* Edição de Registro */}

            <Route
              path="/editar-registro/:id"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                    "Tecnico",
                  ]}
                >
                  <NovoRegistro />
                </PermissionGate>
              }
            />

            {/* Relatórios */}

            <Route
              path="/relatorios"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                    "Tecnico",
                    "Visualizador",
                  ]}
                >
                  <Relatorios />
                </PermissionGate>
              }
            />

            {/* Importação Excel */}

            <Route
              path="/importar-excel"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                    "Tecnico",
                  ]}
                >
                  <ImportarExcel />
                </PermissionGate>
              }
            />

            {/* Auditoria */}

            <Route
              path="/auditoria"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                  ]}
                >
                  <Auditoria />
                </PermissionGate>
              }
            />

            {/* Usuários */}

            <Route
              path="/usuarios"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                  ]}
                >
                  <Usuarios />
                </PermissionGate>
              }
            />

            {/* Administração */}

            <Route
              path="/administracao"
              element={
                <PermissionGate
                  allow={[
                    "Administrador",
                  ]}
                >
                  <Administracao />
                </PermissionGate>
              }
            />

          </Route>

        </Route>

        {/* ==========================================
            PÁGINA NÃO ENCONTRADA
        ========================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    
  );
}

export default AppRoutes;
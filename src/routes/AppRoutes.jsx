import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PermissionGate from "./PermissionGate";

import MainLayout from "../layout/MainLayout";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRegistro from "../pages/NovoRegistro/NovoRegistro";
import Relatorios from "../pages/Relatorios/Relatorios";
import Auditoria from "../pages/Auditoria/Auditoria";
import ImportarExcel from "../pages/ImportarExcel/ImportarExcel";
import Usuarios from "../pages/Usuarios/Usuarios";
// import Administracao from "../pages/Administracao/Administracao";

function AppRoutes() {
  return (
    
      <Routes>

        {/* Página pública */}
        <Route path="/login" element={<Login />} />

        {/* Área autenticada */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/novo" element={<NovoRegistro />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/importar" element={<ImportarExcel />} />
            <Route
              path="/usuarios"
              element={
                <PermissionGate allow={["Administrador"]}>
                  <Usuarios />
                </PermissionGate>
              }
            />

          </Route>
        </Route>

        {/* Qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    
  );
}

export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRegistro from "../pages/NovoRegistro/NovoRegistro";
import Relatorios from "../pages/Relatorios/Relatorios";
import PrivateRoute from "./PrivateRoute";
import PermissionGate from "./PermissionGate";
import Usuarios from "../pages/Usuarios/Usuarios";
// import ImportarExcel from "../pages/ImportarExcel/ImportarExcel";
import Auditoria from "../pages/Auditoria/Auditoria";

function AppRoutes() {

    return (

        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/novo-registro" element={<NovoRegistro />} />

                <Route
                    path="/usuarios"
                    element={
                        <PermissionGate allow={["Administrador"]}>
                            <Usuarios />
                        </PermissionGate>
                    }
                />
            </Route>
        </Routes>

    );

}

export default AppRoutes;


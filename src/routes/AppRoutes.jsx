import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRegistro from "../pages/NovoRegistro/NovoRegistro";
import Relatorios from "../pages/Relatorios/Relatorios";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Auditoria from "../pages/Auditoria/Auditoria";


function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/novo" element={<NovoRegistro />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/auditoria" element={<Auditoria />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
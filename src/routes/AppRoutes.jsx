import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRegistro from "../pages/NovoRegistro/NovoRegistro";
import Relatorios from "../pages/Relatorios/Relatorios";
import Configuracoes from "../pages/Configuracoes/Configuracoes";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/novo" element={<NovoRegistro />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
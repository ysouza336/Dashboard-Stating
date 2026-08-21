import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <h3>Controle Staging</h3>
                <span>Gestão de Equipamentos</span>
            </div>

            <nav className="sidebar-menu">

                <NavLink to="/" end className="sidebar-link">
                    📊 <span>Dashboard</span>
                </NavLink>

                <NavLink to="/novo" className="sidebar-link">
                    ➕ <span>Novo Registro</span>
                </NavLink>

                <NavLink to="/relatorios" className="sidebar-link">
                    📋 <span>Relatórios</span>
                </NavLink>

                <NavLink to="/configuracoes" className="sidebar-link">
                    ⚙️ <span>Configurações</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;
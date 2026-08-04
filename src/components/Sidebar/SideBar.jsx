import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaPlusCircle,
    FaClipboardList,
    FaCog
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <h4 className="logo">
                STAGING
            </h4>

            <NavLink to="/">
                <FaHome />
                Dashboard
            </NavLink>

            <NavLink to="/novo">
                <FaPlusCircle />
                Novo Registro
            </NavLink>

            <NavLink to="/relatorios">
                <FaClipboardList />
                Relatórios
            </NavLink>

            <NavLink to="/configuracoes">
                <FaCog />
                Configurações
            </NavLink>

        </aside>

    );
}

export default Sidebar;

import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    PlusSquare,
    FileSpreadsheet,
    Sheet,
    ShieldCheck,
    UserShield
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {

    const menu = [
        {
            label: "Dashboard",
            path: "/",
            icon: LayoutDashboard
        },
        {
            label: "Novo Registro",
            path: "/novo",
            icon: PlusSquare
        },
        {
            label: "Relatórios",
            path: "/relatorios",
            icon: FileSpreadsheet
        },
        {
            label: "Importar Excel",
            path: "/importar-excel",
            icon: Sheet
        },
        {
            label: "Auditoria",
            path: "/auditoria",
            icon: ShieldCheck
        },
        {
            label:"Administração",
            path: "/administracao",
            icon: UserShield
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <h4>Controle Staging</h4>

                <span>v1.0 Beta</span>

            </div>

            <nav className="sidebar-menu">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={20} />

                            <span>{item.label}</span>

                        </NavLink>
                    );

                })}

            </nav>

        </aside>
    );
}

export default Sidebar;


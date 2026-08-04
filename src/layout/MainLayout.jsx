import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

function MainLayout() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Header />

                <main className="container-fluid p-4">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Alert from "../components/Alert/Alert";
import { useRegistros } from "../context/RegistroContext";

function MainLayout() {
    const { mensagem , limparMensagem }= useRegistros();
    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Header />

                <main className="container-fluid p-4">
                    <Alert
                        type={mensagem?.type}
                        message={mensagem?.message}
                        onClose={limparMensagem}
                    />
                    
                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default MainLayout;
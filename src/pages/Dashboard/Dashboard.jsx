function Dashboard(){

    return(

        <>

            <h2 className="mb-4">

                Dashboard

            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>Total Equipamentos</h5>

                            <h1>452</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>Em andamento</h5>

                            <h1>37</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>Concluídos</h5>

                            <h1>415</h1>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}

export default Dashboard;
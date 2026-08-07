import "./DataTable.css";

function DataTable({ columns, data }) {

    return (

        <div className="table-responsive">

            <table className="table table-hover">

                <thead>

                    <tr>

                        {columns.map(column => (

                            <th key={column.accessor}>
                                {column.header}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.length > 0 ? (

                        data.map(item => (

                            <tr key={item.id}>

                                {columns.map(column => (

                                    <td key={column.accessor}>
                                        {item[column.accessor]}
                                    </td>

                                ))}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="text-center"
                            >
                                Nenhum registro encontrado.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;
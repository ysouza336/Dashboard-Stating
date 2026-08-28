import { useMemo, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./DataTable.css";

const ITEMS_PER_PAGE = 10;

function DataTable({ columns, data = [], emptyMessage = "Nenhum registro encontrado." }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    const items = [...data];

    if (!sort.key) return items;

    items.sort((a, b) => {
      const aValue = a[sort.key] ?? "";
      const bValue = b[sort.key] ?? "";

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

    return items;
  }, [data, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / ITEMS_PER_PAGE));

  const currentData = sortedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleSort(key) {
    setSort((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  }

  return (
    <div className="datatable-wrapper">
      <table className="datatable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="datatable-header">
                  {column.label}

                  {column.sortable &&
                    sort.key === column.key &&
                    (sort.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="datatable-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            currentData.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="datatable-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default DataTable;
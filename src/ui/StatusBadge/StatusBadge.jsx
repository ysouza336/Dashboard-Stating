import "./StatusBadge.css";

const STATUS_MAP = {
  Pendente: "status-pendente",
  "Em andamento": "status-andamento",
  Concluído: "status-concluido",
  Cancelado: "status-cancelado",
};

function StatusBadge({ status }) {
  const classe = STATUS_MAP[status] || "status-default";

  return <span className={`status-badge ${classe}`}>{status}</span>;
}

export default StatusBadge;
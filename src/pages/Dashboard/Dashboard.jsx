import { useMemo } from "react";
import {
  Laptop,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { useRegistros } from "../../context/RegistroContext";

import MetricCard from "../../ui/MetricCard";
import PageHeader from "../../ui/PageHeader";
import StatusBadge from "../../ui/StatusBadge";
import DataTable from "../../ui/DataTable";

function Dashboard() {
  const { registros } = useRegistros();

  const metricas = useMemo(() => {
    const total = registros.length;

    const concluidos = registros.filter(
      (item) => item.status === "Concluído"
    ).length;

    const andamento = registros.filter(
      (item) => item.status === "Em andamento"
    ).length;

    const pendentes = registros.filter(
      (item) => item.status === "Pendente"
    ).length;

    return {
      total,
      concluidos,
      andamento,
      pendentes,
    };
  }, [registros]);

  const ultimosRegistros = useMemo(() => {
    return [...registros]
      .sort(
        (a, b) =>
          new Date(b.criadoEm || 0) - new Date(a.criadoEm || 0)
      )
      .slice(0, 8);
  }, [registros]);

  const columns = [
    {
      key: "patrimonio",
      label: "Patrimônio",
      sortable: true,
    },
    {
      key: "hostname",
      label: "Hostname",
      sortable: true,
    },
    {
      key: "serviceTag",
      label: "Service Tag",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (registro) => (
        <StatusBadge status={registro.status} />
      ),
    },
  ];

  return (
    <div className="container-fluid">

      <PageHeader
        title="Dashboard Executivo"
        subtitle="Resumo geral do inventário de equipamentos."
      />

      <div className="row g-4 mb-4">

        <div className="col-md-6 col-xl-3">
          <MetricCard
            title="Total Equipamentos"
            value={metricas.total}
            icon={Laptop}
            color="primary"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <MetricCard
            title="Concluídos"
            value={metricas.concluidos}
            icon={CheckCircle2}
            color="success"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <MetricCard
            title="Em Andamento"
            value={metricas.andamento}
            icon={Clock3}
            color="warning"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <MetricCard
            title="Pendentes"
            value={metricas.pendentes}
            icon={AlertTriangle}
            color="danger"
          />
        </div>

      </div>

      <div className="card shadow-sm">

        <div className="card-header bg-white">
          <h5 className="mb-0">Últimos Equipamentos Cadastrados</h5>
        </div>

        <div className="card-body p-0">

          <DataTable
            columns={columns}
            data={ultimosRegistros}
            emptyMessage="Nenhum equipamento cadastrado."
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
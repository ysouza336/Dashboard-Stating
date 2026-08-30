import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSpreadsheet,
  Pencil,
  Trash2,
  Filter,
  RotateCcw,
} from "lucide-react";

import { useRegistros } from "../../context/RegistroContext";

import PageHeader from "../../ui/PageHeader";
import SearchInput from "../../ui/SearchInput";
import DataTable from "../../ui/DataTable";
import StatusBadge from "../../ui/StatusBadge";
import ConfirmModal from "../../ui/ConfirmModal/ConfirmModal";

import "./Relatorios.css";

function Relatorios() {
  const navigate = useNavigate();

  const { registros, excluirRegistro } = useRegistros();

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");

  const [registroSelecionado, setRegistroSelecionado] = useState(null);
  const [abrirModalExcluir, setAbrirModalExcluir] = useState(false);

  const registrosFiltrados = useMemo(() => {
    return registros.filter((registro) => {
      const texto = busca.toLowerCase();

      const correspondeBusca =
        registro.patrimonio?.toLowerCase().includes(texto) ||
        registro.hostname?.toLowerCase().includes(texto) ||
        registro.serviceTag?.toLowerCase().includes(texto) ||
        registro.serial?.toLowerCase().includes(texto) ||
        registro.modelo?.toLowerCase().includes(texto);

      const correspondeStatus =
        statusFiltro === "Todos" ||
        registro.status === statusFiltro;

      return correspondeBusca && correspondeStatus;
    });
  }, [registros, busca, statusFiltro]);

  function editarRegistro(registro) {
    navigate("/novo-registro", {
      state: { registroEmEdicao: registro },
    });
  }

  function abrirExclusao(registro) {
    setRegistroSelecionado(registro);
    setAbrirModalExcluir(true);
  }

  function confirmarExclusao() {
    excluirRegistro(registroSelecionado.id);

    setAbrirModalExcluir(false);
    setRegistroSelecionado(null);
  }

  function limparFiltros() {
    setBusca("");
    setStatusFiltro("Todos");
  }

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
      label: "Service TAG",
      sortable: true,
    },
    {
      key: "tipo",
      label: "Tipo",
      sortable: true,
    },
    {
      key: "marca",
      label: "Marca",
      sortable: true,
    },
    {
      key: "modelo",
      label: "Modelo",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (registro) => (
        <StatusBadge status={registro.status} />
      ),
    },
    {
      key: "acoes",
      label: "Ações",
      render: (registro) => (
        <div className="relatorio-acoes">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => editarRegistro(registro)}
          >
            <Pencil size={16} />
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => abrirExclusao(registro)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
        <>
            <PageHeader
                title="Relatórios"
                subtitle="Visualize, filtre e gerencie todos os equipamentos cadastrados."
            />

            <div className="card shadow-sm mb-4">
                <div className="card-body">

                <div className="relatorio-filtros">

                    <SearchInput
                    value={busca}
                    onChange={setBusca}
                    placeholder="Pesquisar patrimônio, hostname, TAG ou serial..."
                    />

                    <div className="relatorio-select">
                    <Filter size={16} />

                    <select
                        value={statusFiltro}
                        onChange={(e) => setStatusFiltro(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    </div>

                    <button
                    className="btn btn-outline-secondary"
                    onClick={limparFiltros}
                    >
                    <RotateCcw size={16} />
                    Limpar
                    </button>

                    <button className="btn btn-success">
                    <FileSpreadsheet size={16} />
                    Exportar Excel
                    </button>

                </div>
            </div>
        </div>
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                Equipamentos ({registrosFiltrados.length})
                </h5>
            </div>

            <div className="card-body p-0">
                <DataTable
                columns={columns}
                data={registrosFiltrados}
                emptyMessage="Nenhum equipamento encontrado com os filtros aplicados."
                />
            </div>
            </div>

            <ConfirmModal
            open={abrirModalExcluir}
            title="Excluir equipamento"
            message={
                registroSelecionado
                ? `Deseja realmente excluir o patrimônio ${registroSelecionado.patrimonio}?`
                : ""
            }
            confirmText="Excluir"
            cancelText="Cancelar"
            confirmColor="danger"
            onCancel={() => {
                setAbrirModalExcluir(false);
                setRegistroSelecionado(null);
            }}
            onConfirm={confirmarExclusao}
            />
        </>
    );
}

export default Relatorios;
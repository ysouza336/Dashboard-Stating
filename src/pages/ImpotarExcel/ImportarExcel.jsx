import { useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";

import { useRegistros } from "../../context/RegistroContext";
import PageHeader from "../../ui/PageHeader";
import DataTable from "../../ui/DataTable";

import "./ImportarExcel.css";

const COLUNAS_OBRIGATORIAS = [
  "patrimonio",
  "hostname",
  "serviceTag",
  "tipo",
  "marca",
  "modelo",
  "status",
];

function ImportarExcel() {
  const { adicionarRegistro } = useRegistros();

  const [arquivo, setArquivo] = useState(null);
  const [dados, setDados] = useState([]);
  const [erros, setErros] = useState([]);

  function lerArquivo(event) {
    const file = event.target.files[0];

    if (!file) return;

    setArquivo(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
      });

      validarPlanilha(json);
    };

    reader.readAsBinaryString(file);
  }

  function validarPlanilha(registros) {
    const listaErros = [];

    registros.forEach((registro, index) => {
      COLUNAS_OBRIGATORIAS.forEach((campo) => {
        if (!registro[campo]) {
          listaErros.push({
            linha: index + 2,
            mensagem: `Campo obrigatório ausente: ${campo}`,
          });
        }
      });
    });

    setDados(registros);
    setErros(listaErros);
  }

  const columns = [
    { key: "patrimonio", label: "Patrimônio" },
    { key: "hostname", label: "Hostname" },
    { key: "serviceTag", label: "Service TAG" },
    { key: "tipo", label: "Tipo" },
    { key: "marca", label: "Marca" },
    { key: "modelo", label: "Modelo" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="importar-page">
      <PageHeader
        title="Importação em Massa"
        subtitle="Importe equipamentos através de planilhas Excel."
      />

      <div className="import-card">
        <label className="upload-area">
          <Upload size={40} />

          <h5>Selecionar arquivo Excel</h5>

          <p>Arquivos suportados: .xlsx e .csv</p>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={lerArquivo}
            hidden
          />
        </label>

        {arquivo && (
          <div className="arquivo-info">
            <FileSpreadsheet size={18} />

            <span>{arquivo.name}</span>

            <strong>{dados.length} registros encontrados</strong>
          </div>
        )}

        {erros.length > 0 && (
          <div className="import-alert">
            <AlertCircle size={18} />

            <div>
              <strong>Foram encontrados erros na planilha.</strong>

              <p>
                Corrija os campos obrigatórios antes de importar.
              </p>
            </div>
          </div>
        )}
      </div>
              {dados.length > 0 && (
          <div className="preview-card">

            <div className="preview-header">
              <h5>Pré-visualização da Planilha</h5>

              <span>{dados.length} equipamentos prontos para importação</span>
            </div>

            <DataTable
              columns={columns}
              data={dados.slice(0, 20)}
              emptyMessage="Nenhum registro encontrado."
            />

            {dados.length > 20 && (
              <p className="preview-info">
                Exibindo os primeiros 20 registros de {dados.length}.
              </p>
            )}

          </div>
        )}

        {erros.length > 0 && (
          <div className="erros-card">

            <h5>Erros encontrados ({erros.length})</h5>

            <div className="lista-erros">
              {erros.map((erro, index) => (
                <div key={index} className="erro-item">
                  <AlertCircle size={16} />
                  <span>
                    Linha <strong>{erro.linha}</strong> — {erro.mensagem}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className="import-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setArquivo(null);
              setDados([]);
              setErros([]);
            }}
          >
            Limpar
          </button>

          <button
            type="button"
            className="btn btn-success"
            disabled={dados.length === 0 || erros.length > 0}
            onClick={() => {
              dados.forEach((registro) => adicionarRegistro(registro));

              // Na próxima sprint será integrado:
              // criarSnapshot(usuarioLogado.nome, "Importação Excel");
              // registrarAuditoria(...);

              alert(`${dados.length} equipamentos importados com sucesso!`);

              setArquivo(null);
              setDados([]);
              setErros([]);
            }}
          >
            <FileSpreadsheet size={18} />
            Importar Registros
          </button>

        </div>

    </div>
    
  );
}

export default ImportarExcel;
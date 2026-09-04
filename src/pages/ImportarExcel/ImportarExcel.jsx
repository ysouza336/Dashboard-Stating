import { useState } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";

import { useRegistros } from "../../context/RegistroContext";
import PageHeader from "../../ui/PageHeader";
import DataTable from "../../ui/DataTable";

import "./ImportarExcel.css";

// ==============================================================
// MAPA COMPLETO DE COLUNAS
// ==============================================================
// Cobre TODAS as colunas da planilha de Controle Mensal (não só as
// básicas), para não precisar mexer no código de novo a cada campo
// novo que aparecer. Chave = cabeçalho normalizado (sem acento,
// minúsculo, trim). Valor = chave canônica usada na aplicação.
const MAPA_COLUNAS = {
  // identificação / equipamento
  "patrimonio celtic": "patrimonio",
  "patrimonio kn": "patrimonio",
  "patrimonio": "patrimonio",
  "imei / serial": "serviceTag",
  "imei/serial": "serviceTag",
  "imei serial": "serviceTag",
  "service tag": "serviceTag",
  "servicetag": "serviceTag",
  "hostname": "hostname",
  "tipo": "tipo",
  "marca": "marca",
  "modelo": "modelo",
  "status": "status",

  // fluxo de staging
  "data solicitacao": "dataSolicitacao",
  "solicitado por": "solicitadoPor",
  "tipo de staging": "tipoStaging",
  "escopo do staging": "escopoStaging",
  "local staging": "localStaging",
  "responsavel staging": "responsavelStaging",
  "data inicio": "dataInicio",
  "data conclusao": "dataConclusao",
  "concluido por": "concluidoPor",
  "motivo pendencia": "motivoPendencia",
  "data entrega/retirada": "dataEntregaRetirada",
  "data entrega / retirada": "dataEntregaRetirada",
  "entregue/retirado por": "entregueRetiradoPor",
  "entregue / retirado por": "entregueRetiradoPor",
  "comprovante/evidencia": "comprovanteEvidencia",
  "comprovante / evidencia": "comprovanteEvidencia",
  "observacoes": "observacoes",
  "prazo staging (dias)": "prazoStagingDias",
  "mes conclusao": "mesConclusao",
  "ano conclusao": "anoConclusao",
  "dentro do prazo?": "dentroDoPrazo",
  "dentro do prazo": "dentroDoPrazo",

  // "ID Registro" é gerado pela própria aplicação (crypto.randomUUID),
  // então o valor da planilha é ignorado de propósito.
};

// Campos mínimos para o equipamento ser considerado válido.
// "hostname" não entra aqui: a planilha de Controle de Staging não tem
// essa coluna (o identificador disponível é o IMEI/Serial).
const COLUNAS_OBRIGATORIAS = [
  "patrimonio",
  "serviceTag",
  "tipo",
  "marca",
  "modelo",
  "status",
];

// Colunas exibidas na pré-visualização (não precisa ser tudo, só o
// essencial pra conferência visual antes de importar).
const COLUNAS_PREVIEW = [
  { accessor: "patrimonio", header: "Patrimônio" },
  { accessor: "serviceTag", header: "IMEI / Service TAG" },
  { accessor: "tipo", header: "Tipo" },
  { accessor: "marca", header: "Marca" },
  { accessor: "modelo", header: "Modelo" },
  { accessor: "status", header: "Status" },
  { accessor: "localStaging", header: "Local Staging" },
];

function normalizarTexto(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .trim()
    .toLowerCase();
}

// Converte um registro lido do Excel (chaves = cabeçalhos originais da
// planilha) para o formato canônico usado pela aplicação.
function normalizarRegistro(registroOriginal) {
  const registroNormalizado = {};

  Object.keys(registroOriginal).forEach((cabecalhoOriginal) => {
    const chaveNormalizada = normalizarTexto(cabecalhoOriginal);
    const chaveCanonica = MAPA_COLUNAS[chaveNormalizada];

    if (chaveCanonica) {
      const valor = registroOriginal[cabecalhoOriginal];
      registroNormalizado[chaveCanonica] =
        typeof valor === "string" ? valor.trim() : valor;
    }
  });

  return registroNormalizado;
}

// Planilhas com validação de dados/formatação aplicada além da última
// linha real (comum em modelos) fazem o XLSX enxergar "linhas fantasma"
// completamente vazias. Descartamos qualquer linha sem nenhum valor.
function registroEstaVazio(registro) {
  return Object.values(registro).every(
    (valor) => valor === "" || valor === null || valor === undefined
  );
}

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
        raw: false, // mantém datas/números já formatados como texto
      });

      const registrosNormalizados = json
        .map(normalizarRegistro)
        .filter((registro) => !registroEstaVazio(registro));

      validarPlanilha(registrosNormalizados);
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

    // id temporário só para a pré-visualização (a definitiva é gerada
    // no RegistroContext ao importar de fato).
    const registrosComIdTemporario = registros.map((registro, index) => ({
      id: `preview-${index}`,
      ...registro,
    }));

    setDados(registrosComIdTemporario);
    setErros(listaErros);
  }

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
              columns={COLUNAS_PREVIEW}
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
              // remove o id temporário de preview antes de gravar de
              // verdade (o RegistroContext gera o id definitivo)
              const registrosParaImportar = dados.map(
                ({ id, ...registro }) => registro
              );

              registrosParaImportar.forEach((registro) =>
                adicionarRegistro(registro)
              );

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
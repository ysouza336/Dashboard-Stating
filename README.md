# Sistema de Controle de Staging

Sistema web desenvolvido para substituir o preenchimento manual de uma planilha Excel utilizada no controle de equipamentos, solicitações e processos de staging.

O projeto está sendo desenvolvido inicialmente como **frontend em React**, com evolução planejada para um **backend com API REST e banco de dados**.

## Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Campos do sistema](#-campos-do-sistema)
- [Arquitetura atual](#-arquitetura-atual)
- [Fluxo da aplicação](#-fluxo-da-aplicação)
- [Como executar](#-como-executar)
- [Validação](#-validação)
- [Roadmap](#-roadmap)
- [Status atual](#-status-atual)
- [Padrão de desenvolvimento](#-padrão-de-desenvolvimento)
- [Contribuição](#-contribuição)

---

## 📖 Sobre o projeto

Atualmente o processo de controle de staging é realizado manualmente através de uma planilha Excel.

O objetivo deste projeto é transformar esse processo em uma aplicação web, reduzindo a necessidade de preenchimento manual da planilha e centralizando as informações em um sistema.

A aplicação será responsável por registrar equipamentos, solicitações e etapas do processo de staging, permitindo posteriormente consultar, editar, excluir, filtrar e exportar os dados.

A exportação para **Excel (`.xlsx`)** é uma das funcionalidades principais previstas para o projeto.

---

## 🎯 Objetivos

### Objetivo principal

Criar um sistema web para gerenciamento do processo de staging e controle dos equipamentos.

### Objetivos específicos

- Substituir o preenchimento manual da planilha.
- Centralizar os registros.
- Padronizar os dados.
- Validar os campos antes do cadastro.
- Permitir edição e exclusão.
- Permitir pesquisa e filtros.
- Criar indicadores e dashboards.
- Exportar dados para `.xlsx`.
- Persistir os dados em banco.
- Criar autenticação e controle de acesso.
- Manter histórico de alterações.
- Permitir evolução futura sem dependência direta da planilha.

---

## 🚀 Funcionalidades

### Implementadas

- [x] React + Vite
- [x] Estrutura de componentes reutilizáveis
- [x] React Router
- [x] Layout principal
- [x] Formulário dinâmico
- [x] Input
- [x] Select
- [x] TextArea
- [x] DateInput
- [x] React Hook Form
- [x] Zod
- [x] Validação
- [x] RegistroContext
- [x] Cadastro de registros
- [x] Geração de ID
- [x] Data de criação
- [x] Relatórios
- [x] Listagem em tabela
- [x] Formatação de datas
- [x] Botão Editar
- [x] Carregamento do registro para edição
- [x] Modo de edição

### Em andamento

- [ ] Validar atualização definitiva do registro existente

### Planejadas

- [ ] Exclusão
- [ ] Pesquisa
- [ ] Filtros
- [ ] Ordenação
- [ ] Dashboard
- [ ] Gráficos
- [ ] Exportação `.xlsx`
- [ ] Persistência em banco
- [ ] Backend
- [ ] API REST
- [ ] Autenticação
- [ ] Permissões
- [ ] Configurações dinâmicas
- [ ] Auditoria
- [ ] Testes automatizados
- [ ] Deploy
- [ ] CI/CD

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia | Utilização |
|---|---|
| React | Interface |
| Vite | Desenvolvimento e build |
| JavaScript | Linguagem principal |
| React Router DOM | Rotas |
| React Hook Form | Formulários |
| Zod | Validação |
| Bootstrap | Utilitários visuais |
| CSS | Estilização |
| XLSX | Exportação Excel — planejado |

### Backend — planejado

- Node.js
- Express.js
- API REST
- Banco SQL

A definição final do banco será feita antes do início do backend.

---

## 📂 Estrutura do projeto

```text
src/
│
├── assets/
│   └── utils/
│       └── createInitialValues.js
│
├── components/
│   ├── CardSection/
│   ├── DateInput/
│   ├── DynamicForm/
│   ├── FormField/
│   ├── Input/
│   ├── Select/
│   └── TextArea/
│
├── context/
│   └── RegistroContext.jsx
│
├── data/
│   ├── formSections.js
│   └── options.js
│
├── hooks/
│   └── useRegistroForm.js
│
├── layout/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Configuracoes/
│   ├── Dashboard/
│   ├── NovoRegistro/
│   └── Relatorios/
│
├── routes/
│   └── AppRoutes.jsx
│
└── schemas/
    └── registroSchema.js
```

---

## 📝 Campos do sistema

### Dados do equipamento

| Campo | Tipo | Obrigatório |
|---|---|---|
| Patrimônio | Texto | Sim |
| IMEI / Serial | Texto | Sim |
| Tipo | Select | Sim |
| Marca | Select | Sim |
| Modelo | Texto | Não |

### Solicitação

| Campo | Tipo | Obrigatório |
|---|---|---|
| Data Solicitação | Data | Sim |
| Solicitado por | Select | Sim |

### Processo de Staging

| Campo | Tipo | Obrigatório |
|---|---|---|
| Tipo de Staging | Select | Sim |
| Escopo | Select | Sim |
| Local | Select | Sim |
| Responsável | Select | Sim |

### Finalização

| Campo | Tipo | Obrigatório |
|---|---|---|
| Data Início | Data | Não |
| Data Conclusão | Data | Não |
| Status | Select | Sim |
| Observações | Textarea | Não |

---

## ⚙️ Configuração dos campos

Os campos são definidos em:

```text
src/data/formSections.js
```

Exemplo:

```javascript
{
    name: "patrimonio",
    label: "Patrimônio",
    component: "input",
    type: "text",
    placeholder: "Digite o patrimônio",
    required: true,
    col: 4
}
```

As opções dos `select` ficam em:

```text
src/data/options.js
```

Exemplo:

```javascript
export const options = {
    tipo: [
        "Notebook",
        "Desktop",
        "Monitor"
    ],

    marca: [
        "Dell",
        "Lenovo",
        "HP",
        "Apple"
    ]
};
```

---

## 🧩 Componentes

### Input

Campos de texto.

```text
src/components/Input/
```

### Select

Campos de seleção.

```text
src/components/Select/
```

### TextArea

Campos de observação/texto longo.

```text
src/components/TextArea/
```

### DateInput

Campos de data.

```text
src/components/DateInput/
```

### FormField

Faz a ligação entre a configuração do campo e o componente correspondente.

```text
src/components/FormField/
```

### DynamicForm

Percorre as seções e campos definidos em `formSections.js`.

```text
src/components/DynamicForm/
```

### CardSection

Organiza visualmente as seções do formulário.

```text
src/components/CardSection/
```

---

## 🧠 Gerenciamento de estado

O gerenciamento atual utiliza:

```text
src/context/RegistroContext.jsx
```

Fluxo:

```text
NovoRegistro
     │
     │ adicionarRegistro()
     ▼
RegistroContext
     │
     │ registros[]
     ▼
Relatorios
```

Operações previstas no Context:

```text
adicionarRegistro()
atualizarRegistro()
excluirRegistro()
```

---

## 🔐 Validação

A validação utiliza:

- React Hook Form
- Zod
- `@hookform/resolvers/zod`

Arquivo:

```text
src/schemas/registroSchema.js
```

O schema contempla os campos do formulário, incluindo:

```text
dataSolicitacao
dataInicio
dataConclusao
```

---

## 🔄 Fluxo do cadastro

```text
Usuário
   │
   ▼
Novo Registro
   │
   ▼
DynamicForm
   │
   ▼
React Hook Form
   │
   ▼
Zod
   │
   ├── Inválido → Mensagem de erro
   │
   └── Válido
          │
          ▼
   adicionarRegistro()
          │
          ▼
   RegistroContext
          │
          ▼
      registros[]
```

---

## ✏️ Fluxo de edição

Fluxo atual:

```text
Relatórios
    │
    ▼
[Editar]
    │
    ▼
/novo
    │
    ▼
location.state
    │
    ▼
Registro selecionado
    │
    ▼
reset(registro)
    │
    ▼
Formulário preenchido
    │
    ▼
Salvar Alterações
```

O próximo objetivo é garantir que o registro existente seja atualizado pelo `id`, sem criar uma nova linha.

---

## 📊 Relatórios

A página:

```text
src/pages/Relatorios/Relatorios.jsx
```

é responsável por:

- Exibir registros.
- Mostrar contador.
- Exibir estado vazio.
- Apresentar dados em tabela.
- Formatar datas.
- Permitir acesso à edição.

---

## 💾 Persistência atual

**Importante:** os dados ainda não possuem persistência definitiva.

Atualmente os registros são mantidos em memória pelo React Context.

Uma atualização da página pode apagar os dados armazenados em memória.

Futuramente:

```text
Frontend
   ↓
API REST
   ↓
Backend
   ↓
Banco de dados
```

---

## 📤 Exportação para Excel

Uma das funcionalidades principais será a exportação para:

```text
.xlsx
```

Fluxo planejado:

```text
Relatórios
    │
    ▼
Pesquisa / Filtros
    │
    ▼
Exportar Excel
    │
    ▼
arquivo.xlsx
```

O arquivo deverá conter:

- Patrimônio
- Serial
- Tipo
- Marca
- Modelo
- Data Solicitação
- Solicitado Por
- Tipo Staging
- Escopo
- Local
- Responsável
- Data Início
- Data Conclusão
- Status
- Observação

Também serão planejados:

- Cabeçalho.
- Auto filtro.
- Largura das colunas.
- Formatação das datas.
- Congelamento do cabeçalho.
- Nome da planilha.
- Nome do arquivo baseado na data.

---

# 🗺️ ROADMAP

## FASE 1 — Frontend / CRUD

### Task 1.1 — Estrutura inicial

**Status: ✅ Concluída**

- [x] React + Vite
- [x] Estrutura de diretórios
- [x] React Router
- [x] Layout

### Task 1.2 — Componentes

**Status: ✅ Concluída**

- [x] Input
- [x] Select
- [x] TextArea
- [x] DateInput
- [x] FormField
- [x] DynamicForm
- [x] CardSection

### Task 1.3 — Configuração

**Status: ✅ Concluída**

- [x] `formSections.js`
- [x] `options.js`
- [x] Formulário dinâmico

### Task 1.4 — Validação

**Status: ✅ Concluída**

- [x] React Hook Form
- [x] Zod
- [x] Campos obrigatórios
- [x] Campos de data
- [x] Mensagens de validação

### Task 1.5 — RegistroContext

**Status: 🔄 Em validação**

- [x] Context
- [x] Adicionar registro
- [x] Estrutura de atualização
- [ ] Validar atualização definitiva
- [ ] Excluir registro

### Task 1.6 — Cadastro

**Status: ✅ Concluída**

- [x] Cadastro
- [x] ID
- [x] Data de criação
- [x] Reset do formulário

### Task 1.7 — Relatórios

**Status: ✅ Concluída**

- [x] Listagem
- [x] Contador
- [x] Estado vazio
- [x] Formatação de datas
- [x] Botão Editar

### Task 1.8 — Edição

**Status: 🔄 Em andamento**

- [x] Botão Editar
- [x] Navegação para `/novo`
- [x] Envio do registro
- [x] Carregamento do formulário
- [x] Modo edição
- [x] Botão Salvar Alterações
- [ ] Validar atualização do registro existente
- [ ] Garantir que não seja criado um novo registro

---

## FASE 2 — Gerenciamento

### Task 2.1 — Exclusão

**Status: ⏳ Pendente**

- [ ] Botão Excluir
- [ ] Confirmação
- [ ] `excluirRegistro()`
- [ ] Atualização da tabela

### Task 2.2 — Confirmações

**Status: ⏳ Pendente**

- [ ] Excluir
- [ ] Cancelar edição
- [ ] Limpar formulário

---

## FASE 3 — Pesquisa e filtros

### Task 3.1 — Pesquisa

**Status: ⏳ Pendente**

- [ ] Patrimônio
- [ ] Serial
- [ ] Modelo
- [ ] Marca
- [ ] Responsável

### Task 3.2 — Filtros

**Status: ⏳ Pendente**

- [ ] Tipo
- [ ] Marca
- [ ] Status
- [ ] Responsável
- [ ] Local
- [ ] Tipo de Staging
- [ ] Escopo
- [ ] Período

### Task 3.3 — Ordenação

**Status: ⏳ Pendente**

- [ ] Patrimônio
- [ ] Data
- [ ] Status
- [ ] Responsável

---

## FASE 4 — Dashboard

### Task 4.1 — Indicadores

**Status: ⏳ Pendente**

- [ ] Total de registros
- [ ] Pendentes
- [ ] Em andamento
- [ ] Concluídos

### Task 4.2 — Gráficos

**Status: ⏳ Pendente**

- [ ] Status
- [ ] Tipo
- [ ] Marca
- [ ] Responsável
- [ ] Período

---

## FASE 5 — Excel

### Task 5.1 — Exportação

**Status: ⏳ Pendente**

- [ ] Exportação `.xlsx`

### Task 5.2 — Exportação com filtros

**Status: ⏳ Pendente**

- [ ] Exportar somente registros filtrados

### Task 5.3 — Formatação

**Status: ⏳ Pendente**

- [ ] Cabeçalho
- [ ] Auto filtro
- [ ] Largura das colunas
- [ ] Datas
- [ ] Nome da planilha
- [ ] Nome do arquivo

---

## FASE 6 — Backend

### Task 6.1 — Banco de dados

**Status: ⏳ Pendente**

Avaliar:

- PostgreSQL
- MySQL
- SQL Server

### Task 6.2 — Backend

**Status: ⏳ Pendente**

- [ ] Node.js
- [ ] Express
- [ ] Estrutura de API
- [ ] Controllers
- [ ] Services
- [ ] Models
- [ ] Rotas

### Task 6.3 — API REST

**Status: ⏳ Pendente**

```http
GET    /registros
GET    /registros/:id
POST   /registros
PUT    /registros/:id
DELETE /registros/:id
```

### Task 6.4 — Integração

**Status: ⏳ Pendente**

Substituir:

```text
React
 ↓
RegistroContext
 ↓
useState
```

por:

```text
React
 ↓
RegistroContext
 ↓
API
 ↓
Backend
 ↓
Banco
```

---

## FASE 7 — Autenticação

**Status: ⏳ Pendente**

- [ ] Login
- [ ] Logout
- [ ] Sessão
- [ ] Usuários
- [ ] Perfis
- [ ] Permissões

Perfis previstos:

```text
Administrador
    ↓
Acesso completo

Gestor
    ↓
Visualização + edição

Usuário
    ↓
Operações autorizadas
```

---

## FASE 8 — Configurações

**Status: ⏳ Pendente**

- [ ] Tipos de equipamento
- [ ] Marcas
- [ ] Status
- [ ] Locais
- [ ] Responsáveis
- [ ] Tipos de Staging
- [ ] Escopos

As opções atualmente presentes em `options.js` deverão futuramente ser administradas pelo sistema e armazenadas no banco.

---

## FASE 9 — Auditoria

**Status: ⏳ Pendente**

Registrar:

- [ ] Usuário
- [ ] Data/hora
- [ ] Registro alterado
- [ ] Campo
- [ ] Valor anterior
- [ ] Novo valor

Exemplo:

```text
Usuário: João
Registro: 123456
Campo: Status
Anterior: Pendente
Novo: Concluído
Data: 17/08/2026 15:30
```

---

## FASE 10 — Qualidade

**Status: ⏳ Pendente**

- [ ] Responsividade
- [ ] Error Boundary
- [ ] Loading
- [ ] Tratamento de erros
- [ ] Paginação
- [ ] Performance
- [ ] Testes unitários
- [ ] Testes de componentes
- [ ] Testes de integração
- [ ] Testes de API
- [ ] Testes de exportação

---

## FASE 11 — Deploy

**Status: ⏳ Pendente**

- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Banco de produção
- [ ] HTTPS
- [ ] Variáveis de ambiente
- [ ] CORS
- [ ] CI/CD

Fluxo futuro:

```text
GitHub
   ↓
Push
   ↓
Build
   ↓
Testes
   ↓
Deploy
```

---

# 🏗️ Arquitetura futura

```text
                 ┌──────────────────────┐
                 │      FRONTEND        │
                 │        React         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       API REST       │
                 │    Node + Express    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       DATABASE       │
                 │ PostgreSQL / SQL etc │
                 └──────────────────────┘
```

Módulos planejados:

```text
Sistema de Controle de Staging
│
├── Dashboard
│
├── Novo Registro
│   ├── Cadastro
│   └── Edição
│
├── Relatórios
│   ├── Consulta
│   ├── Pesquisa
│   ├── Filtros
│   ├── Edição
│   ├── Exclusão
│   └── Exportação XLSX
│
├── Configurações
│
├── Usuários
│
└── Auditoria
```

---

# 💻 Como executar

## Pré-requisitos

Instalar:

- Node.js
- npm

Verificar:

```bash
node -v
npm -v
```

## Instalar dependências

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

O Vite normalmente disponibilizará:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

---

# 📋 Padrão de desenvolvimento

Componentes reutilizáveis devem ficar em:

```text
src/components/
```

Preferencialmente cada componente terá sua própria pasta:

```text
components/
└── Input/
    ├── Input.jsx
    ├── Input.css
    └── index.js
```

Páginas:

```text
src/pages/
```

Exemplo:

```text
pages/
└── Relatorios/
    ├── Relatorios.jsx
    └── Relatorios.css
```

Dados estáticos:

```text
src/data/
```

Schemas:

```text
src/schemas/
```

Contextos:

```text
src/context/
```

Hooks:

```text
src/hooks/
```

---

# 🧹 Boas práticas

- Evitar duplicação de componentes.
- Preferir componentes reutilizáveis.
- Manter validações centralizadas no Zod.
- Manter regras de negócio fora dos componentes visuais quando possível.
- Utilizar o Context para o gerenciamento global dos registros enquanto o backend não estiver implementado.
- Não misturar regras de backend com frontend.
- Manter nomes de arquivos e componentes padronizados.
- Atualizar o README ao concluir funcionalidades importantes.
- Testar cada Task antes de iniciar a próxima.
- Evitar alterações grandes em várias partes do sistema simultaneamente.

---

# 📋 Padrão para novas Tasks

Toda nova implementação deverá, preferencialmente, seguir:

```text
TASK X.X — Nome

Status:
⏳ Pendente
🔄 Em andamento
✅ Concluída
❌ Bloqueada

Objetivo:
Descrição da funcionalidade.

Arquivos envolvidos:
- arquivo1
- arquivo2

Implementação:
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

Testes:
- [ ] Teste 1
- [ ] Teste 2

Critérios de conclusão:
Descrição do resultado esperado.
```

Fluxo recomendado:

```text
1. Criar Task
      ↓
2. Definir objetivo
      ↓
3. Identificar arquivos
      ↓
4. Implementar
      ↓
5. Testar
      ↓
6. Corrigir
      ↓
7. Validar
      ↓
8. Atualizar README
      ↓
9. Commit
      ↓
10. Próxima Task
```

---

# 📌 Status atual

**Fase:** Frontend / CRUD

**Task:** `1.8 — Edição de registros`

### Último ponto validado

O fluxo abaixo está funcionando:

```text
Relatórios
    ↓
Editar
    ↓
/novo
    ↓
Registro carregado
    ↓
Formulário preenchido
```

Também foram corrigidos:

- Warning `ClassName` → `className`.
- Divergências entre classes JSX e CSS.
- Inclusão das datas no `registroSchema`.
- Persistência das datas no registro em memória.

### Próxima validação

Concluir:

```text
Editar registro
      ↓
Salvar Alterações
      ↓
Atualizar registro existente
      ↓
Relatórios
```

O registro deverá ser atualizado sem gerar uma nova linha.

---

# 📄 Licença

A licença do projeto deverá ser definida antes de uma eventual distribuição ou utilização externa.

---

## 🔄 Manutenção do README

Este documento deve ser tratado como um documento vivo.

Sempre que uma funcionalidade importante for concluída, uma decisão arquitetural for tomada ou a estrutura do projeto mudar significativamente, o README deverá ser atualizado.

**Última atualização do roadmap: 17/08/2026**

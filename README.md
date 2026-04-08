# API RESTful de Produtos

Projeto simples de API REST usando Node.js e Express para gerenciar uma lista de produtos em memória.

## Tecnologias

- Node.js
- Express

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run dev
```

O servidor roda em:

`http://localhost:8000`

## Estrutura básica

- `server.js`: configuração da aplicação
- `routes/expressRouter.js`: definição das rotas
- `controllers/produtosController.js`: lógica das operações
- `produtos.js`: base de dados em memória

## Endpoints

Base URL: `http://localhost:8000/produtos`

- `GET /produtos` - lista todos os produtos
- `GET /produtos?name=...&category=...&brand=...&precMin=...&precMax=...` - filtra produtos
- `GET /produtos/stats` - retorna estatísticas gerais
- `GET /produtos/:id` - busca produto por ID
- `POST /produtos` - cria novo produto
- `PUT /produtos/:id` - atualiza um produto
- `DELETE /produtos/:id` - remove um produto

## Exemplo de JSON para criação/atualização

```json
{
	"name": "Notebook XYZ",
	"category": "Electronics",
	"price": 3500,
	"stock": 10,
	"brand": "Marca X",
	"active": true
}
```

## Observação

Os dados estão em memória. Ao reiniciar o servidor, as alterações voltam ao estado inicial.

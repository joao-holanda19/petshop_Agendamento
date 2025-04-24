# 🐾 PetShop System

Sistema completo de agendamentos para petshops, com frontend e backend desenvolvidos em HTML, CSS, JavaScript e Node.js com MongoDB.

## 📁 Estrutura do Projeto

```
petshop-system/
│
├── frontend/           # Interface do usuário
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── agendamentos.html
│   ├── style.css
│   └── scripts.js
│
├── backend/            # API e lógica de servidor
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   ├── .env
│   └── package.json
│
├── banco_petshop.sql   # Script SQL
└── README.md
```

## 🚀 Tecnologias Utilizadas

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript Vanilla

- **Backend**
  - Node.js
  - Express
  - MySQL
  - JWT para autenticação
  - Bcrypt para hashing de senhas
  - Multer para upload de imagens

## ⚙️ Instalação

### Pré-requisitos

- Node.js e npm instalados

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/joao-holanda19/petshop-system.git
```

2. Acesse o diretório do backend:

```bash
cd petshop-system/backend
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` com o seguinte conteúdo:

```
PORT=3000
JWT_SECRET=sua_chave_super_segura
```

5. Inicie o servidor:

```bash
npm run dev
```

6. Abra o `frontend/index.html` no navegador para testar a interface.

## 🔐 Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Agendamento de horários para pets com upload de imagem
- Edição e exclusão de agendamentos
- Interface intuitiva com preview de imagens

## 📦 Scripts úteis

```bash
npm start     # Inicia o servidor
npm run dev   # Inicia com Nodemon
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

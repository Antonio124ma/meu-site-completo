# Site Pessoal Completo – React + Node.js (MERN) - Finalidade didática

Site pessoal moderno com:
- Página inicial
- Portfólio de projetos
- Galeria de fotos
- Currículo compartilhável
- Painel administrativo completo (CRUD)

## Estrutura

```
meu-site/
├── backend/          # API Node.js + Express + MongoDB
└── frontend/         # React + Vite + Tailwind CSS v4
```

## Pré-requisitos

- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Conta no [Cloudinary](https://cloudinary.com) (para upload de imagens)

## Configuração do Backend

```bash
cd backend
cp .env.example.txt .env
# Edite o .env com suas credenciais
npm install
npm run dev
```

O servidor sobe em `http://localhost:5000`.

### Variáveis de ambiente importantes

| Variável | Descrição |
|----------|-----------|
| `MONGODB_URI` | Connection string do MongoDB Atlas |
| `JWT_SECRET` | Segredo forte para assinar tokens |
| `CLOUDINARY_*` | Credenciais do Cloudinary |
| `ALLOW_REGISTER` | `true` apenas na primeira vez para criar o admin |

**Primeiro uso:** deixe `ALLOW_REGISTER=true`, faça um POST em `/api/auth/register` e depois mude para `false`.

## Configuração do Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173` e já faz proxy das requisições `/api` para o backend.

## Criar o primeiro administrador

Com o backend rodando:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exemplo.com","password":"sua_senha_forte"}'
```

Ou use o Postman / Insomnia.

## Deploy

- **Backend**: Render, Railway ou Fly.io
- **Frontend**: Vercel ou Netlify
- Configure as variáveis de ambiente nos serviços
- No frontend, defina `VITE_API_URL` apontando para a URL do backend em produção

## Tecnologias

- React 18 + Vite 6
- Tailwind CSS v4
- Framer Motion
- React Router 7
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Cloudinary + Multer (memoryStorage)

## Licença

MIT

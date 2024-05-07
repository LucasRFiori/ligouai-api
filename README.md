# Ligou Ai

Postagem de avaliação de números de telefone, para ajudar a identificar quem está te ligando.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/LucasRFiori/ligouai-api
```

Entre no diretório do projeto

```bash
  cd ligouai-api
```

Instale as dependências

```bash
  cd ligouai-api
  pnpm i
```

Inicie o back

```bash
  /ligouai-api> npx prisma generate

  /ligouai-api> docker-compose up --build -d

  ligouai-api> pnpm run start
```

**OBS**: Criar .env com base no .env.example

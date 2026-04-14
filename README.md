# LigouAI API

REST API for the [LigouAI](https://ligouai.com.br) platform — a community-driven service that allows users to look up and rate phone numbers, helping identify unknown callers.

## Tech Stack

- **Runtime:** Node.js 20 + TypeScript
- **Framework:** Express
- **Database:** MongoDB (replica set via Docker) + Prisma ORM
- **Auth:** JWT
- **Validation:** Zod
- **Package manager:** pnpm

## Features

- Look up phone numbers and retrieve their ratings and community comments
- Submit ratings and comments for a phone number
- Automatic tag aggregation per phone number
- Rate limiting (20 requests / 5 min per IP) on all public routes
- CORS restricted to allowed origins
- Admin-protected routes to list all phones and comments

## API Endpoints

| Method | Route                     | Auth | Description                                      |
| ------ | ------------------------- | ---- | ------------------------------------------------ |
| `GET`  | `/v*/phone/:phone`        | —    | Find a phone number with its rating and comments |
| `POST` | `/v*/phone/create`        | —    | Register a new phone number                      |
| `POST` | `/v*/comment/create`      | —    | Submit a comment and rating for a phone number   |
| `GET`  | `/v*/comment/recent`      | —    | List recent comments                             |
| `GET`  | `/v*/private/phone/all`   | JWT  | List all phone numbers (admin)                   |
| `GET`  | `/v*/private/comment/all` | JWT  | List all comments (admin)                        |

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/LucasRFiori/ligouai-api
cd ligouai-api
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file based on `.env.example`:

```env
PORT=3030
DATABASE_URL=mongodb://admin:password@localhost:27017/db?authSource=admin&replicaSet=rs0&directConnection=true
JWT_SECRET=your_secret_key
ADDITIONAL_ORIGIN=http://localhost:3000   # optional extra CORS origin
```

4. **Start the MongoDB replica set**

```bash
docker-compose up --build -d
```

5. **Generate Prisma client**

```bash
npx prisma generate
```

6. **Start the development server**

```bash
pnpm run start
```

The server will be available at `http://localhost:3030`.

## Scripts

| Command                  | Description                                |
| ------------------------ | ------------------------------------------ |
| `pnpm run start`         | Start dev server with hot-reload (nodemon) |
| `pnpm run start:windows` | Start dev server on Windows (ts-node)      |
| `pnpm run build`         | Compile TypeScript to `src/dist/`          |
| `pnpm run prod`          | Run compiled production build              |
| `pnpm run lint`          | Lint source files with ESLint              |
| `pnpm run format`        | Auto-fix lint issues                       |
| `pnpm test`              | Run tests with Jest                        |

## Project Structure

```
src/
├── server.ts           # Express app setup and entry point
├── routes.ts           # Route definitions
├── config/
│   └── appConfig.ts    # Centralised environment config
├── dto/                # Zod validation schemas (request DTOs)
├── middlewares/        # Auth, CORS, error handler, rate limiter, IP
├── modules/
│   ├── Controllers/    # Request handlers
│   └── Repositories/  # Prisma data-access layer
└── utils/              # Shared helpers and custom exceptions
```

## License

ISC — see [LICENSE](LICENSE) for details.

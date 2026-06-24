# Backend — Train Schedule API

NestJS + Prisma + PostgreSQL REST API providing JWT authentication, role-based access
control and CRUD for trains.

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:migrate     # apply migrations (creates tables)
npm run prisma:seed        # demo admin/user + sample trains
npm run start:dev          # http://localhost:4000/api
```

Requires a running PostgreSQL instance. The repo's root `docker compose up -d` starts one
that matches the default `.env`.

## Environment variables

| Variable         | Description                                  |
| ---------------- | -------------------------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string                 |
| `JWT_SECRET`     | Secret used to sign JWTs                      |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`)                    |
| `PORT`           | API port (default `4000`)                    |
| `CORS_ORIGIN`    | Allowed frontend origin(s), comma-separated  |

## Scripts

| Script                   | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run start:dev`      | Run in watch mode                        |
| `npm run build`          | Compile to `dist/`                       |
| `npm run start:prod`     | Run the compiled build                   |
| `npm run prisma:migrate` | Create/apply a dev migration             |
| `npm run prisma:deploy`  | Apply migrations in production           |
| `npm run prisma:seed`    | Seed demo data                           |
| `npm run prisma:studio`  | Open Prisma Studio                       |
| `npm test`               | Run unit tests                           |

## Structure

```
src/
├── auth/      # register/login, JWT strategy, guards, decorators
├── users/     # user persistence
├── trains/    # trains CRUD, DTOs, validation
├── prisma/    # PrismaService (global module)
└── common/    # shared constants (station list)
prisma/
├── schema.prisma  # User + Train models
└── seed.ts        # demo data
```

## Production build (e.g. Render)

- Build command: `npm install && npm run build && npm run prisma:deploy`
- Start command: `npm run start:prod`
- Set `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN` in the host's environment.

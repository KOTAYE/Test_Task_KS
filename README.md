# 🚆 Train Schedule Application

A full-stack train schedule application where users can register, log in, and manage a
list of trains. Built with **NestJS**, **PostgreSQL** (Prisma) on the backend and
**Next.js** with **Mantine** on the frontend, secured with JWT-based authentication and
role-based access control.

> Test task for the Full Stack Internship position at Kevych Solutions.

## ✨ Features

- 🔐 **Authentication** — register / login with hashed passwords (bcrypt) and JWT tokens
- 👀 **Read-only for guests** — anyone can view the schedule; editing requires a valid JWT
- 🛠️ **Train management** — create, edit and delete train records
- 🧑‍✈️ **Role-based access** — `GUEST` (read-only), `USER` (basic), `ADMIN` (full CRUD)
- 🗓️ **Friendly UX** — station dropdowns for direction and date/time pickers for schedule

## 🧱 Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Language | TypeScript                              |
| Backend  | NestJS, Prisma, PostgreSQL              |
| Auth     | Passport JWT, bcrypt                     |
| Frontend | Next.js (App Router), React, Mantine    |
| Tooling  | Docker Compose (local PostgreSQL)       |

## 📂 Project Structure

```
.
├── backend/            # NestJS API (auth + trains)
├── frontend/           # Next.js web client
├── docker-compose.yml  # Local PostgreSQL instance
└── README.md
```

## 🚀 Getting Started

> Detailed setup instructions for the backend and frontend will be documented here as the
> project takes shape. See `backend/README.md` and `frontend/README.md` for per-app notes.

### Prerequisites

- Node.js 20+
- Docker (for local PostgreSQL) — or any PostgreSQL 14+ instance

### 1. Start the database

```bash
docker compose up -d
```

_More steps to follow._

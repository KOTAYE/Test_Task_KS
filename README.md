# 🚆 Train Schedule Application

A full-stack train schedule application where users can register, log in, and manage a
list of trains. Built with **NestJS** + **PostgreSQL** (Prisma) on the backend and
**Next.js** + **Mantine** on the frontend, secured with JWT authentication and
role-based access control.

> Test task for the Full Stack Internship position at Kevych Solutions.

## 🌍 Live Demo

| Service   | URL                                                  |
| --------- | ---------------------------------------------------- |
| Frontend  | https://test-task-ks.vercel.app                      |
| API       | https://train-schedule-api-ad8o.onrender.com/api     |

> The API is hosted on Render's free tier and may take ~30–60 s to wake up on the first
> request, after which it responds normally.

### 🔑 Demo accounts

| Role  | Email               | Password   | Can                          |
| ----- | ------------------- | ---------- | ---------------------------- |
| Admin | `admin@example.com` | `admin123` | View, create, **edit, delete** |
| User  | `user@example.com`  | `user123`  | View, create                 |
| Guest | — (no login)        | —          | View only                    |

## ✨ Features

- 🔐 **Authentication** — register / login with hashed passwords (bcrypt) and JWT tokens
- 👀 **Read-only for guests** — anyone can view the schedule; editing requires a valid JWT
- 🛠️ **Train management** — create, edit and delete train records
- 🧑‍✈️ **Role-based access** — `GUEST` (read-only), `USER` (create), `ADMIN` (full CRUD)
- 🗓️ **Friendly UX** — station dropdowns for direction and date-time pickers for the schedule
- 📱 **Responsive UI** with light/dark mode, loading/error/empty states and notifications

## 🧱 Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Language | TypeScript                                   |
| Backend  | NestJS, Prisma ORM, PostgreSQL               |
| Auth     | Passport JWT, bcrypt                          |
| Frontend | Next.js (App Router), React, Mantine          |
| Tooling  | Docker Compose (local PostgreSQL)            |

## 📂 Project Structure

```
.
├── backend/            # NestJS API (auth + trains)
├── frontend/           # Next.js web client
├── docker-compose.yml  # Local PostgreSQL instance
└── README.md
```

## 🔌 API Overview

Base URL: `http://localhost:4000/api`

| Method   | Endpoint          | Access            | Description                 |
| -------- | ----------------- | ----------------- | --------------------------- |
| `POST`   | `/auth/register`  | Public            | Register, returns JWT       |
| `POST`   | `/auth/login`     | Public            | Log in, returns JWT         |
| `GET`    | `/auth/me`        | Authenticated     | Current user                |
| `GET`    | `/trains`         | Public            | List all trains             |
| `GET`    | `/trains/:id`     | Public            | Get one train               |
| `POST`   | `/trains`         | USER, ADMIN       | Create a train              |
| `PATCH`  | `/trains/:id`     | ADMIN             | Update a train              |
| `DELETE` | `/trains/:id`     | ADMIN             | Delete a train              |

### Role matrix

| Capability      | Guest | User | Admin |
| --------------- | :---: | :--: | :---: |
| View schedule   |  ✅   |  ✅  |  ✅   |
| Create          |  ❌   |  ✅  |  ✅   |
| Edit / delete   |  ❌   |  ❌  |  ✅   |

## 🚀 Getting Started (local)

### Prerequisites

- **Node.js 20+**
- **Docker** (for local PostgreSQL) — or any PostgreSQL 14+ instance

### 1. Clone & start the database

```bash
git clone <your-repo-url>
cd Test_Task_KS
docker compose up -d        # starts PostgreSQL on localhost:5432
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env         # defaults already match docker-compose
npm run prisma:migrate       # create the database tables
npm run prisma:seed          # seed demo accounts + sample trains
npm run start:dev            # API on http://localhost:4000/api
```

### 3. Frontend (in a second terminal)

```bash
cd frontend
npm install
cp .env.example .env.local   # points at http://localhost:4000/api
npm run dev                  # app on http://localhost:3000
```

Open **http://localhost:3000** 🎉

### 🔑 Demo accounts (created by the seed)

| Role  | Email               | Password   |
| ----- | ------------------- | ---------- |
| Admin | `admin@example.com` | `admin123` |
| User  | `user@example.com`  | `user123`  |

Or register a new account — new users get the `USER` role by default.

## 🧪 A note on the data model

The schedule table shows **Train №**, **Direction** (`from → to`), **Departure**,
**Arrival** and **Station** (the boarding/departure station). A train's direction is set
with two station dropdowns, and the times are chosen with date-time pickers, as required.

## 🌐 Deployment

The project is deployment-ready for free tiers:

- **Database** → Neon / Supabase (managed PostgreSQL)
- **Backend** → Render (build: `npm install && npm run build && npm run prisma:deploy`,
  start: `npm run start:prod`)
- **Frontend** → Vercel (root directory `frontend`, env `NEXT_PUBLIC_API_URL`)

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md)
for per-app details.

This project is deployed with **Neon** (PostgreSQL), **Render** (API) and **Vercel**
(frontend) — see the [Live Demo](#-live-demo) section above.

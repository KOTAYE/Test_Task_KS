# Frontend — Train Schedule

Next.js (App Router) + Mantine client for the Train Schedule API.

## Setup

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
```

The backend API must be running (see [../backend/README.md](../backend/README.md)).

## Environment variables

| Variable              | Description                                      |
| --------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | Base URL of the API, including `/api` (e.g. `http://localhost:4000/api`) |

## Scripts

| Script          | Description                  |
| --------------- | --------------------------- |
| `npm run dev`   | Start the dev server        |
| `npm run build` | Production build            |
| `npm run start` | Serve the production build  |
| `npm run lint`  | Run ESLint                  |

## Structure

```
src/
├── app/                 # routes: / (schedule), /login, /register
├── components/          # header, train table, form modal, auth form
└── lib/                 # API client, auth context, hooks, types, theme
```

## Deployment (Vercel)

- Import the repo and set the **root directory** to `frontend`.
- Add the `NEXT_PUBLIC_API_URL` environment variable pointing at the deployed API.
- Vercel auto-detects Next.js — no extra build configuration needed.

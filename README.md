# Huridocs Health Data

A React + TypeScript SPA built with Vite and Material UI. Displays patient health records from an API with search, pagination, add, and delete functionality.

---

## Prerequisites

Node.js 18+
pnpm 8+
Docker 24+

---

## Option 1 — Run Locally (Development)

# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm dev
```

Open **http://localhost:5173** in your browser.

---

## Option 2 — Run with Docker


# 1. Build the Docker image
docker build -t huridocs .

# 2. Run the container
docker run -p 8080:80 huridocs
```

Open **http://localhost:8080** in your browser.

To stop the container:

```bash
docker ps                        # find the container ID
docker stop <container-id>
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home / welcome page |
| `/health-data` | Fetch, search, add, and delete patient records |
| `/thank-you` | Thank you page |

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build tool
- **Material UI (MUI v7)** — component library
- **React Router v7** — client-side routing
- **Axios** — HTTP requests
- **nginx** — production static file server (Docker only)

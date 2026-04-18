# Web

Hono Server with React SPA.

## Tech Stack

- **Server**: [Hono](https://hono.dev) - Web framework
- **UI**: React 19 + TypeScript
- **Routing**: [TanStack Router](https://tanstack.com/router) - File-based routing
- **Runtime**: [Bun](https://bun.sh)
- **Build**: [Vite](https://vite.dev)

## Project Structure

```
app/
├── client/              # Client-side React app
│   ├── routes/         # TanStack Router route files
│   │   ├── __root.tsx # Root layout
│   │   ├── index.tsx   # Home page (/)
│   │   └── about.tsx   # About page (/about)
│   ├── App.tsx        # Router setup
│   └── index.tsx      # Entry point
└── server/             # Server-side API
```

## Commands

```bash
# Install dependencies
bun install

# Development
bun run dev

# Build
bun run build:client

# Production
bun run start

# Lint
bun run lint

# Type check
bun run check-types
```
# holo

Electron desktop application with React and TypeScript.

## Tech Stack

- **Build**: [electron-vite](https://electron-vite.org)
- **Packaging**: [electron-builder](https://www.electron.build)
- **UI**: React 19 + TypeScript
- **IPC**: Electron IPC for main/renderer communication

## Project Structure

```
src/
├── main/           # Main process
├── preload/        # Preload scripts
└── renderer/      # Renderer process (React app)
```

## Commands

```bash
# Install dependencies
bun install

# Development
bun run dev

# Build
bun run build:win   # Windows
bun run build:mac   # macOS
bun run build:linux # Linux

# Type check
bun run typecheck
```
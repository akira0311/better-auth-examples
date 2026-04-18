# Better Auth Examples

Turborepo + Bun monorepo for better-auth examples.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Monorepo**: [Turborepo](https://turbo.build)
- **Linter/Formatter**: [Biome](https://biomejs.dev)
- **Git Hooks**: [Lefthook](https://lefthook.dev)

## Quick Start

```sh
# Install dependencies
bun install

# Install git hooks
lefthook install
```

## Commands

```sh
# Development
bun run dev          # Run all apps in dev mode
bun run dev --filter=web  # Run specific app

# Build
bun run build        # Build all apps

# Lint & Format
bunx biome check     # Check all files
bunx biome check --write  # Fix automatically

# Type Check
bun run check-types
```

## Project Structure

```
.
├── apps/
│   └── web/          # Web application
├── biome.json        # Biome configuration
├── lefthook.yml      # Git hooks configuration
└── turbo.json       # Turborepo configuration
```

## Code Quality

### Import Organization

Biome organizes imports in this order:

1. Type imports
2. Bun/Node built-ins
3. Vite related
4. Test utilities (vitest, @testing-library, jest)
5. React related
6. External packages
7. Monorepo packages (@repo/\*\*)
8. Aliases and paths
9. CSS imports (last)

### Git Hooks

Pre-commit hooks automatically run Biome on staged files.

```sh
# Manually run pre-commit hooks
lefthook run pre-commit
```

## Notes

- Uses Bun as package manager (set in `.npmrc`: `engine-strict=true`)
- Biome is configured with organize imports enabled
- Use `turbo run <task>` to run tasks across all packages

# Agent Guidelines for better-auth-examples

Turborepo + Bun monorepo containing web and electron applications.

## Tech Stack

- **Package Manager**: Bun (1.3.12)
- **Monorepo**: Turborepo
- **Linter/Formatter**: Biome (2.4.12)
- **Type Check**: TypeScript Native Preview (tsgo) / tsc
- **Git Hooks**: Lefthook

## Build Commands

```sh
# Install dependencies (root)
bun install

# Development
bun run dev                  # All apps
bun run dev --filter=web     # Web app only
bun run dev --filter=holo   # Electron app only

# Build
bun run build              # Build all
bun run build --filter=web # Web app
bun run build --filter=holo
```

## App-Specific Commands

### Web App (`apps/web/`)

```sh
bun run dev --filter=web           # Dev server
bun run build:client --filter=web # Client build
bun run start --filter=web      # Production server
bun run lint --filter=web      # Biome check + format
bun run check-types --filter=web # tsgo type check
```

### Electron App (`apps/electron/` - "holo")

```sh
bun run dev --filter=holo        # Dev
bun run build --filter=holo      # Build all
bun run build:mac --filter=holo  # macOS
bun run build:win --filter=holo   # Windows
bun run build:linux --filter=holo # Linux
bun run typecheck --filter=holo     # tsc type check
```

## Lint & Type Check

```sh
# Root level
bunx biome check              # Check all
bunx biome check --write      # Fix automatically
bunx biome check [glob]       # Specific files
bun run check-types           # Type check all

# Single file
bunx biome check src/file.ts
```

## Testing

No test framework is currently configured. When tests are added:

```sh
bun test                      # All tests
bun test run path/file.test.ts # Single file
```

## Import Organization

Biome (enabled) organizes imports in this order:

1. `type` imports (type-only)
2. `:BUN:`, `:NODE:` (builtins)
3. `vite`, `vite-plugin-*`, `vite/**`
4. `vitest`, `@testing-library`, `jest`
5. `react`, `react-dom`, `react-*`, `@types/react`
6. External packages (third-party)
7. `@repo/**` (monorepo)
8. `:ALIAS:`, `:PATH:`
9. CSS (`*.css`, `*.scss`, `*.less`)

Run `bunx biome check --write` to auto-organize.

## Code Style Guidelines

### Formatting (Biome)

- **Indentation**: 2 spaces, tabs
- **Line width**: 120
- **Line endings**: LF
- **Quotes**: Single (JS/JSX), double (JSON)
- **Trailing commas**: All (es5)
- **Semicolons**: As needed
- **Arrow functions**: Always parens
- **Bracket spacing**: true

### TypeScript

- Use `type` imports ( Biome rule: `useImportType` with `inlineType`)
- Web app: `tsgo` for type checking
- Electron: `tsc`
- Strict mode enabled

### Naming

- **Files**: kebab-case (configs), PascalCase (components), camelCase (utilities)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE (compile-time)
- **Interfaces**: PascalCase, no `I` prefix

### Error Handling

- Explicit error types/messages
- Prefer early returns over nested try-catch
- Use `console.error` for runtime errors
- Consider Result/Either patterns

### React Best Practices

- Functional components with hooks
- Composition over inheritance
- Extract logic into custom hooks
- Single responsibility
- TypeScript for props (no PropTypes)

### Additional Notes

- Uses Bun (enforced via `.npmrc`: `engine-strict=true`)
- Pre-commit hooks run via Lefthook automatically
- Run lint/typecheck before committing
- Run `lefthook run pre-commit` manually if needed
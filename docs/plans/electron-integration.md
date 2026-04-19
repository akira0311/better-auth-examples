# Electron Integration Plan

## Overview

Integrate Better Auth with Electron for secure authentication flows using system browser.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron App                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  Renderer   │───▶│  Preload    │───▶│    Main     │  │
│  │  (React)    │◀───│  (IPC)      │◀───│  (Node)     │  │
│  └─────────────┘    └─────────────┘    └──────┬──────┘  │
└─────────────────────────────────────────────┼──────────┘
                                              │
                              ┌───────────────┴───────────┐
                              │  Storage (conf)         │
                              │  - session data         │
                              │  - cookies               │
                              └───────────────────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Web Server                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │  electron   │    │  electron   │    │   better-  │    │
│  │  plugin     │    │  proxy      │    │   auth     │    │
│  │  (server)   │    │  (client)   │    │   (core)   │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                       │
│  ┌─────────────┐                    ┌─────────────┐         │
│  │  Browser    │◀─── PKCE ────────▶│   Google    │         │
│  │  (OAuth)    │                    │   OAuth    │         │
│  └─────────────┘                    └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

1. User clicks "Sign In" in Electron renderer
2. Electron opens system browser to web sign-in page via deep link
3. User authenticates with Google in browser
4. Browser redirects back to Electron via custom protocol (`com.holo.app://`)
5. Main process receives callback, exchanges code for session
6. Session stored locally via `conf`
7. IPC bridge exposes auth state to renderer

## Configuration

### Protocol Scheme

- **Scheme**: `com.holo.app`
- **Registered in**: `electron-builder.yml`
- **Trusted origin**: `com.holo.app:/` in better-auth config

### URLs

- **Web baseURL**: `http://localhost:3000` (from `BETTER_AUTH_URL`)
- **Sign-in page**: `{BETTER_AUTH_URL}/sign-in`

### Storage

- **Package**: `conf`
- **Location**: Electron's `userData` directory
- **Data stored**: Session, cookies, PKCE verifier

## Implementation Steps

### Step 1: Install Dependencies

```bash
# apps/web
bun add @better-auth/electron

# apps/electron
bun add better-auth @better-auth/electron @better-auth/electron/client @better-auth/electron/storage
```

### Step 2: Configure Web App

| File | Changes |
|------|---------|
| `apps/web/lib/auth.ts` | Add `electron()` to plugins |
| `apps/web/lib/auth.ts` | Add `trustedOrigins: ["com.holo.app:/"]` |
| `apps/web/lib/auth-client.ts` | Add `electronProxyClient({ protocol: { scheme: "com.holo.app" } })` |

### Step 3: Configure Electron App

| File | Changes |
|------|---------|
| Create `apps/electron/src/lib/auth-client.ts` | Initialize `electronClient` |
| `apps/electron/src/main/index.ts` | Add `authClient.setupMain()` before app ready |
| `apps/electron/src/preload/index.ts` | Add `setupRenderer()` |
| `apps/electron/electron-builder.yml` | Add protocol scheme |
| `apps/electron/electron.vite.config.ts` | Externalize `@better-auth/electron` in preload |
| `apps/electron/src/renderer/src/App.tsx` | Add sample auth UI |

### Step 4: Add Sample UI

In Electron renderer:
- Sign in button that calls `window.requestAuth()`
- Sign out button that calls `window.signOut()`
- Session state display
- Auth error handling

## Key Files

### Web Backend

- `apps/web/lib/auth.ts` - Better Auth server config with electron plugin
- `apps/web/lib/auth-client.ts` - Web client with proxy plugin

### Electron

- `apps/electron/src/lib/auth-client.ts` - Electron auth client (new)
- `apps/electron/src/main/index.ts` - Main process with setupMain()
- `apps/electron/src/preload/index.ts` - Preload with setupRenderer()
- `apps/electron/src/renderer/src/App.tsx` - Sample auth UI

### Configs

- `apps/electron/electron-builder.yml` - Protocol scheme registration
- `apps/electron/electron.vite.config.ts` - Preload externals config
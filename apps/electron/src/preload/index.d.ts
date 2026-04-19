import { type ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: unknown
		onAuthenticated: (callback: (user: unknown) => void) => () => void
		onAuthError: (callback: (ctx: { message: string }) => void) => () => void
		onUserUpdated: (callback: (user: unknown) => void) => () => void
		getUser: () => Promise<unknown | null>
		requestAuth: (options?: { provider?: string }) => Promise<void>
		signOut: () => Promise<void>
		authenticate: (options: { token: string }) => Promise<void>
	}
}

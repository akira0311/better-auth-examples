import { type ElectronClientOptions, electronClient } from '@better-auth/electron/client'
import { storage } from '@better-auth/electron/storage'
import { createAuthClient } from 'better-auth/client'

const PROTOCOL_SCHEME = 'com.holo.app'
const BASE_URL = process.env.BETTER_AUTH_URL || process.env.VITE_BETTER_AUTH_URL || 'http://localhost:3000'

const createElectronAuthClient = () => {
	const options: ElectronClientOptions = {
		signInURL: `${BASE_URL}/login`,
		protocol: {
			scheme: PROTOCOL_SCHEME,
		},
		storage: storage(),
	}

	return createAuthClient({
		baseURL: BASE_URL,
		plugins: [electronClient(options)],
	})
}

export const authClient = createElectronAuthClient()

export const { getSession, signOut: electronSignOut } = authClient

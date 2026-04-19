import { createAuthClient } from 'better-auth/react'

function getBaseUrl() {
	return import.meta.env.DEV ? import.meta.env.VITE_BETTER_AUTH_URL : process.env.BETTER_AUTH_URL
}

export const authClient = createAuthClient({
	baseURL: getBaseUrl(),
})

export const { signIn, signUp, useSession, signOut } = authClient

import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'electron-vite'

export default defineConfig({
	main: {},
	preload: {
		build: {
			externalizeDeps: {
				exclude: ['@better-auth/electron'],
			},
		},
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve('src/renderer/src'),
			},
		},
		plugins: [react()],
		server: {
			port: 31415,
		},
	},
})

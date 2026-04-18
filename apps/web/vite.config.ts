import { defineConfig } from 'vite'

import devServer from '@hono/vite-dev-server'
import bunAdapter from '@hono/vite-dev-server/bun'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			plugins: [
				tanstackRouter({
					target: 'react',
					routesDirectory: './app/client/routes',
					generatedRouteTree: './app/client/routeTree.gen.ts',
				}),
				react(),
			],
			build: {
				rollupOptions: {
					input: ['./app/client/index.tsx'],
					output: {
						entryFileNames: 'static/client.js',
						chunkFileNames: 'static/assets/[name]-[hash].js',
						assetFileNames: 'static/assets/[name].[ext]',
					},
				},
				emptyOutDir: false,
				copyPublicDir: false,
			},
		}
	} else {
		return {
			ssr: {
				external: ['react', 'react-dom'],
			},
			plugins: [
				devServer({
					entry: './app/server/index.tsx',
					adapter: bunAdapter(),
				}),
			],
		}
	}
})

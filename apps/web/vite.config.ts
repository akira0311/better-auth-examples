import { defineConfig } from 'vite'

import devServer from '@hono/vite-dev-server'
import bunAdapter from '@hono/vite-dev-server/bun'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			plugins: [
				tsconfigPaths(),
				tanstackRouter({
					target: 'react',
					routesDirectory: './app/client/routes',
					generatedRouteTree: './app/client/routeTree.gen.ts',
				}),
				react(),
				tailwindcss(),
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
				tsconfigPaths(),
				tailwindcss(),
				devServer({
					entry: './app/server/index.tsx',
					adapter: bunAdapter(),
				}),
			],
		}
	}
})

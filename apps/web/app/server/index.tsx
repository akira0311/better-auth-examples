import { type ViteDevServer } from 'vite'

import { reactRenderer } from '@hono/react-renderer'
import * as dotenv from 'dotenv'
import { Hono } from 'hono'

dotenv.config()

const getConnInfo = import.meta.env.DEV
	? (await import('@hono/vite-dev-server/conninfo')).getConnInfo
	: (await import('hono/bun')).getConnInfo

const app = new Hono<{ Bindings: { vite: ViteDevServer } }>()

if (!import.meta.env.DEV) {
	const serveStatic = (await import('hono/bun')).serveStatic
	app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))
	app.get(
		'/static/*',
		serveStatic({
			root: './',
			rewriteRequestPath: (path) => path.replace(/^\/static/, '/dist/static'),
		}),
	)
}

app.get(
	'*',
	reactRenderer(() => {
		return (
			<html lang='en'>
				<head>
					<meta charSet='utf-8' />
					<title>SPA</title>
					{import.meta.env.DEV ? (
						<script type='module' src='/app/client/index.tsx'></script>
					) : (
						<script type='module' src='/static/client.js'></script>
					)}
				</head>
				<body></body>
			</html>
		)
	}),
)

app.get('/', (c) => {
	return c.render(<title>Home</title>)
})

app.get('/about', (c) => {
	return c.render(<title>About</title>)
})

app.get('/conninfo', (c) => {
	const info = getConnInfo(c)
	return c.text(`Your remote address is ${info.remote.address}`)
})

export default app

import { Hono } from 'hono'

const getConnInfo = import.meta.env.DEV
	? (await import('@hono/vite-dev-server/conninfo')).getConnInfo
	: (await import('hono/bun')).getConnInfo

const app = new Hono()

app.get('/', (c) => c.html(<h1>Hello Vite + Hono</h1>))

app.get('/conninfo', (c) => {
	const info = getConnInfo(c) // info is `ConnInfo`
	return c.text(`Your remote address is ${info.remote.address}`)
})

export default app

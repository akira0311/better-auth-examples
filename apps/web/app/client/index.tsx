import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { App } from './App'

document.body.innerHTML = '<div id="root"></div>'

const root = document.getElementById('root')
if (root) {
	createRoot(root).render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}

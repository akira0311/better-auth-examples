import { setupRenderer } from '@better-auth/electron/preload'
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

import { type authClient } from '../lib/auth-client'

declare global {
	type Bridges = typeof authClient.$Infer.Bridges
	interface Window extends Bridges {}
}

setupRenderer()

const api = {}

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error(error)
	}
} else {
	// @ts-expect-error (define in dts)
	window.electron = electronAPI
	// @ts-expect-error (define in dts)
	window.api = api
}

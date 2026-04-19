import { useEffect, useState } from 'react'

import electronLogo from './assets/electron.svg'
import Versions from './components/Versions'

interface User {
	id: string
	name: string
	email: string
	image: string | null
}

function App(): React.JSX.Element {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const unsubscribeAuthenticated = window.onAuthenticated((user) => {
			setUser(user as User)
			setError(null)
		})

		const unsubscribeAuthError = window.onAuthError((ctx) => {
			setError(ctx.message)
		})

		window
			.getUser()
			.then((user) => {
				if (user) {
					setUser(user as User)
				}
			})
			.catch((err) => {
				console.error('Failed to get user:', err)
			})
			.finally(() => {
				setLoading(false)
			})

		return () => {
			unsubscribeAuthenticated()
			unsubscribeAuthError()
		}
	}, [])

	const handleSignIn = (): void => {
		setError(null)
		window.requestAuth().catch((err) => {
			setError(err.message)
		})
	}

	const handleSignInWithGoogle = (): void => {
		setError(null)
		window.requestAuth({ provider: 'google' }).catch((err) => {
			setError(err.message)
		})
	}

	const handleSignOut = (): void => {
		window.signOut()
		setUser(null)
	}

	if (loading) {
		return (
			<div className='container'>
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<>
			<img alt='logo' className='logo' src={electronLogo} />
			<div className='creator'>Powered by electron-vite</div>
			{user ? (
				<div className='user-info'>
					<p>
						Signed in as <strong>{user.name}</strong> ({user.email})
					</p>
					<button type='button' onClick={handleSignOut}>
						Sign Out
					</button>
				</div>
			) : (
				<div className='auth-buttons'>
					<button type='button' onClick={handleSignIn}>
						Sign In with Browser
					</button>
					<button type='button' onClick={handleSignInWithGoogle}>
						Sign In with Google
					</button>
				</div>
			)}
			{error && <p className='error'>Error: {error}</p>}
			<div className='actions'>
				<div className='action'>
					<a href='https://electron-vite.org/' target='_blank' rel='noreferrer'>
						Documentation
					</a>
				</div>
			</div>
			<Versions></Versions>
		</>
	)
}

export default App

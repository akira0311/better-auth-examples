import Login from '@client/components/login'
import { useSession } from '@client/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: LoginPage,
})

function LoginPage() {
	const { data: session } = useSession()
	if (session) {
		return (
			<div className='flex items-center justify-center min-h-dvh'>
				<p>You are already signed in.</p>
			</div>
		)
	}

	return <Login />
}

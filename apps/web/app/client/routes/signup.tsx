import Signup from '@client/components/signup'
import { useSession } from '@client/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
	component: SignupPage,
})

function SignupPage() {
	const { data: session } = useSession()
	if (session) {
		return (
			<div className='flex items-center justify-center min-h-dvh'>
				<p>You are already signed in.</p>
			</div>
		)
	}

	return <Signup />
}

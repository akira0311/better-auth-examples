import Login from '@client/components/login'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
	component: LoginPage,
})

function LoginPage() {
	return (
		<>
			<Login />
			<Outlet />
		</>
	)
}

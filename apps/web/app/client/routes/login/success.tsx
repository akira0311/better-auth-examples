'use client'

import { useEffect } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'

import { ensureElectronRedirect } from '@/lib/auth-client'

export const Route = createFileRoute('/login/success')({
	component: LoginSuccessPage,
})

function LoginSuccessPage() {
	useEffect(() => {
		const id = ensureElectronRedirect()
		return () => {
			clearTimeout(id)
		}
	}, [])

	return (
		<div className='flex items-center justify-center min-h-dvh'>
			<div className='mx-auto w-full max-w-xs space-y-6 text-center'>
				<div className='flex justify-center'>
					<CheckCircle className='h-16 w-16 text-green-500' />
				</div>
				<div className='space-y-2'>
					<h1 className='text-balance text-3xl font-semibold'>Welcome!</h1>
					<p className='text-pretty text-muted-foreground'>You have successfully signed in.</p>
				</div>
				<a href='/' className='text-primary font-medium hover:underline'>
					Go to Home
				</a>
			</div>
		</div>
	)
}

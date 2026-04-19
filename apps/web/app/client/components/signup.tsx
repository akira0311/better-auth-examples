'use client'

import { type JSX, type SVGProps, useState } from 'react'

import { Button } from '@client/components/ui/button'
import { Card, CardContent } from '@client/components/ui/card'
import { Checkbox } from '@client/components/ui/checkbox'
import { Input } from '@client/components/ui/input'
import { Label } from '@client/components/ui/label'
import { authClient } from '@client/lib/auth-client'

const Logo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
	<svg aria-label='Logo' fill='currentColor' height='48' role='img' viewBox='0 0 40 48' width='40' {...props}>
		<clipPath id='b'>
			<path d='m0 0h40v48h-40z' />
		</clipPath>
		<g clipPath='url(#b)'>
			<path d='m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z' />
			<path d='m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z' />
			<path d='m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z' />
			<path d='m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z' />
			<path d='m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z' />
			<path d='m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z' />
		</g>
	</svg>
)

export default function Signup() {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		if (password.length < 8) {
			setError('Password must be at least 8 characters')
			setLoading(false)
			return
		}

		try {
			await authClient.signUp.email({
				email,
				password,
				name,
			})
		} catch {
			setError('Failed to create account. Email may already be in use.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-dvh'>
			<div className='flex flex-1 flex-col justify-center px-4 py-10 lg:px-6'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<Logo aria-hidden className='mx-auto h-10 w-10' />
					<h3 className='text-balance mt-2 text-center text-lg font-bold'>Create new account for workspace</h3>
				</div>

				<Card className='mt-4 shadow-2xs sm:mx-auto sm:w-full sm:max-w-md'>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<Label htmlFor='name' className='text-sm font-medium'>
									Name
								</Label>
								<Input
									type='text'
									id='name'
									autoComplete='name'
									placeholder='Name'
									className='mt-2'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div>
								<Label htmlFor='email' className='text-sm font-medium'>
									Email
								</Label>
								<Input
									type='email'
									id='email'
									autoComplete='email'
									placeholder='ephraim@blocks.so'
									className='mt-2'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<Label htmlFor='password' className='text-sm font-medium'>
									Password
								</Label>
								<Input
									type='password'
									id='password'
									autoComplete='new-password'
									placeholder='Password'
									className='mt-2'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className='flex items-start'>
								<div className='flex h-6 items-center'>
									<Checkbox id='terms' className='size-4' required />
								</div>
								<Label htmlFor='terms' className='ml-3 text-sm leading-6 text-muted-foreground'>
									Agree to <span className='text-primary'>Terms</span> and <span className='text-primary'>Privacy</span>
								</Label>
							</div>

							{error && <p className='text-sm text-red-500'>{error}</p>}

							<Button type='submit' className='mt-4 w-full py-2 font-medium' disabled={loading}>
								Create account
							</Button>
						</form>
					</CardContent>
				</Card>

				<p className='text-pretty mt-6 text-center text-sm text-muted-foreground'>
					Already have an account?{' '}
					<a href='/login' className='font-medium text-primary hover:underline'>
						Sign in
					</a>
				</p>
			</div>
		</div>
	)
}

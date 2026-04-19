'use client'

import { type JSX, type SVGProps, useState } from 'react'

import { Button } from '@client/components/ui/button'
import { Checkbox } from '@client/components/ui/checkbox'
import { Input } from '@client/components/ui/input'
import { Label } from '@client/components/ui/label'
import { authClient } from '@client/lib/auth-client'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'

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
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

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
			<div className='mx-auto w-full max-w-xs space-y-6'>
				<div className='space-y-2 text-center'>
					<Logo aria-hidden className='mx-auto h-16 w-16' />
					<h1 className='text-balance text-3xl font-semibold'>Create an account</h1>
					<p className='text-pretty text-muted-foreground'>Sign up to access your dashboard, settings and projects.</p>
				</div>

				<div className='space-y-5'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<Label htmlFor='name'>Name</Label>
							<div className='relative mt-2.5'>
								<Input
									id='name'
									className='peer ps-9'
									placeholder='John Doe'
									type='text'
									autoComplete='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
									<User aria-hidden size={16} />
								</div>
							</div>
						</div>

						<div>
							<Label htmlFor='email'>Email</Label>
							<div className='relative mt-2.5'>
								<Input
									id='email'
									className='peer ps-9'
									placeholder='ephraim@blocks.so'
									type='email'
									autoComplete='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
									<Mail aria-hidden size={16} />
								</div>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<Label htmlFor='password'>Password</Label>
							</div>
							<div className='relative mt-2.5'>
								<Input
									id='password'
									className='ps-9 pe-9'
									placeholder='Create a password'
									type={isVisible ? 'text' : 'password'}
									autoComplete='new-password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
									<Lock aria-hidden size={16} />
								</div>
								<button
									className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 inset-e-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
									type='button'
									onClick={toggleVisibility}
									aria-label={isVisible ? 'Hide password' : 'Show password'}
									aria-pressed={isVisible}
									aria-controls='password'
								>
									{isVisible ? <EyeOff aria-hidden size={16} /> : <Eye aria-hidden size={16} />}
								</button>
							</div>
						</div>

						<div className='flex items-start'>
							<div className='flex h-6 items-center'>
								<Checkbox id='terms' required />
							</div>
							<Label htmlFor='terms' className='ml-3 text-sm leading-6 text-muted-foreground'>
								Agree to <span className='text-primary'>Terms</span> and <span className='text-primary'>Privacy</span>
							</Label>
						</div>

						{error && <p className='text-sm text-red-500'>{error}</p>}

						<Button type='submit' className='w-full' disabled={loading}>
							Create account
							<ArrowRight aria-hidden className='h-4 w-4' />
						</Button>
					</form>

					<div className='text-center text-sm'>
						Already have an account?{' '}
						<a href='/login' className='text-primary font-medium hover:underline'>
							Sign in
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

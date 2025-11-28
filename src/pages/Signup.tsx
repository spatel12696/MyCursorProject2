import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'
import { useState } from 'react'

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type SignupFormData = z.infer<typeof signupSchema>

interface SignupProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Signup({ setIsAuthenticated }: SignupProps) {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupFormData) => {
    setError('')
    const result = registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    
    if (result.success) {
      setIsAuthenticated(true)
      navigate('/dashboard')
    } else {
      setError(result.error || 'Failed to create account')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-medium/50 to-purple-dark relative overflow-hidden px-4 py-10">
      {/* Background image placeholder */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-purple-light/30 to-purple-dark"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-purple-dark/20 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="bg-black/20 flex items-center justify-center p-4 lg:p-6">
            <img
              src="/loginphoto.png"
              alt="Hands holding a heart with hope engraving"
              className="w-full h-full object-cover rounded-2xl shadow-lg max-h-[620px]"
            />
          </div>

          <div className="px-8 py-10 lg:py-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-white text-7xl font-normal mb-4">HealthEase</h1>
              <h2 className="text-white text-4xl font-normal">Create an account</h2>
            </div>

            <div className="text-center mb-8">
              <span className="text-white text-2xl">Already have an account? </span>
              <Link to="/login" className="text-white text-2xl underline">
                Login
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xl mb-2">First Name</label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className="w-full bg-purple-dark/85 text-white rounded-2xl px-4 py-3 text-xl placeholder-white/70"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white text-xl mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full bg-purple-dark/85 text-white rounded-2xl px-4 py-3 text-xl placeholder-white/70"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white text-xl mb-2">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-purple-dark/85 text-white rounded-2xl px-4 py-3 text-xl placeholder-white/70"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-xl mb-2">Enter your password</label>
                <input
                  type="password"
                  {...register('password')}
                  className="w-full bg-purple-dark/85 text-white rounded-2xl px-4 py-3 text-xl placeholder-white/70"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-xl mb-2">Confirm Password</label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className="w-full bg-purple-dark/85 text-white rounded-2xl px-4 py-3 text-xl placeholder-white/70"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-300 rounded-xl p-4 text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-purple-button/80 text-white rounded-2xl px-6 py-4 text-3xl font-normal hover:bg-purple-button transition-colors"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/auth'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    setError('')
    const result = loginUser(data.email, data.password)
    
    if (result.success && result.user) {
      setIsAuthenticated(true)
      navigate('/dashboard')
    } else {
      setError(result.error || 'Invalid email or password')
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
              <h2 className="text-white text-4xl font-normal">Sign In</h2>
            </div>

            <div className="text-center mb-8">
              <span className="text-white text-2xl">Don't have an account? </span>
              <Link to="/signup" className="text-white text-2xl underline">
                Signup
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="text-right">
                <Link to="/forgot-password" className="text-white text-xl underline">
                  Forgot Password?
                </Link>
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'https://complete-ten-classes-practice-3pt7.vercel.app/api/v1/auth'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.08 4.43a1 1 0 0 1-1.04 0L4.4 8.25A1 1 0 1 1 5.46 6.56L12 10.65l6.54-4.09a1 1 0 1 1 1.06 1.69Z" />
  </svg>
)

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M7.5 14A5.5 5.5 0 1 1 13 8.5 5.5 5.5 0 0 1 7.5 14Zm0-3A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 7.5 11Zm5.25 1.35 2.12-2.12a1 1 0 0 1 .7-.29H21a1 1 0 0 1 1 1v2.1a1 1 0 0 1-1 1h-1.55v1.55a1 1 0 0 1-1 1H16.9v1.55a1 1 0 0 1-1 1h-2.15a1 1 0 0 1-1-1v-5.79Z" />
  </svg>
)

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
    <path d="M9.5 5.3A10.3 10.3 0 0 1 12 5c6 0 9.5 7 9.5 7a13 13 0 0 1-2.1 3" />
    <path d="M6.2 6.7C3.8 8.3 2.5 12 2.5 12s3.5 7 9.5 7a10 10 0 0 0 4.1-.9" />
  </svg>
)

const GoogleLogo = () => (
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt=""
    className="h-5 w-5"
  />
)

const FacebookLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
    alt=""
    className="h-5 w-5"
  />
)

const RoleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.2 6 2.25V11c0 3.9-2.45 7.6-6 8.9-3.55-1.3-6-5-6-8.9V6.45l6-2.25Z" />
  </svg>
)

const SocialButton = ({ children, label }) => (
  <button
    type="button"
    aria-label={label}
    className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl font-bold text-black transition hover:scale-105"
  >
    {children}
  </button>
)

const AuthInput = ({
  icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  showPassword,
  onTogglePassword,
}) => (
  <label className="flex h-12 items-center gap-3 rounded-md bg-[#1f1f22] px-4 text-[#9698a1] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
    <span className="text-[#9b9ca4]">{icon}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#7f8290]"
      required
    />
    {name === 'password' && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="text-[#9b9ca4]"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    )}
  </label>
)

const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (!response.ok || !result.status) {
        setMessage({ type: 'error', text: result.message || 'Login failed' })
        return
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      setMessage({ type: 'success', text: result.message || 'Login successful' })
      navigate(result.user?.role === 'admin' ? '/dashboard' : '/')
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Could not connect to the backend' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-4 py-8 font-sans text-white">
      <div className="w-full max-w-[330px]">
        <div className="mb-5">
          <h1 className="text-[25px] font-extrabold leading-tight tracking-tight sm:text-[28px]">
            Welcome <span className="text-[#ffc414]">Back</span>
          </h1>
          <p className="mt-2 text-sm font-normal text-[#cfd0d5]">Let's continue your journey</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            icon={<MailIcon />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@gmail.com"
          />
          <AuthInput
            icon={<KeyIcon />}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="admin123"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
          />

          <label className="flex h-12 items-center gap-3 rounded-md bg-[#1f1f22] px-4 text-[#9698a1] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <span className="text-[#9b9ca4]">
              <RoleIcon />
            </span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none"
              required
            >
              <option className="bg-[#1f1f22] text-white" value="user">
                User
              </option>
              <option className="bg-[#1f1f22] text-white" value="admin">
                Admin
              </option>
            </select>
          </label>

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs font-bold text-white/90">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-md bg-[#ffc414] text-sm font-bold text-black shadow-[0_14px_28px_rgba(255,196,20,0.16)] transition hover:bg-[#ffd24a]"
          >
            {isLoading ? 'Please wait...' : 'Continue'}
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-3 text-center text-xs font-medium ${
              message.type === 'error' ? 'text-red-500' : 'text-green-400'
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="my-9 flex items-center gap-4 text-[11px] font-normal text-[#c8c8cf]">
          <span className="h-px flex-1 bg-white/30" />
          <span>or login with</span>
          <span className="h-px flex-1 bg-white/30" />
        </div>

        <div className="flex justify-center gap-6">
          <SocialButton label="Continue with Google">
            <GoogleLogo />
          </SocialButton>
          <SocialButton label="Continue with Facebook">
            <FacebookLogo />
          </SocialButton>
        </div>

        <p className="mt-20 text-center text-xs font-normal text-[#c8c8cc]">
          New here?{' '}
          <Link to="/signup" className="font-bold text-white">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignIn

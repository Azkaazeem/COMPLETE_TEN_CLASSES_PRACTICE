import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1/auth'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
  </svg>
)

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

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M9 4a1 1 0 0 0-.8.4L6.7 6.35A1 1 0 0 1 5.9 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1.9a1 1 0 0 1-.8-.4L15.8 4.4A1 1 0 0 0 15 4H9Zm3 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
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

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [profilePic, setProfilePic] = useState(null)
  const [profilePreview, setProfilePreview] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!profilePic) {
      setProfilePreview('')
      return undefined
    }

    const previewUrl = URL.createObjectURL(profilePic)
    setProfilePreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [profilePic])

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })
    setIsLoading(true)

    const body = new FormData()
    body.append('name', formData.name)
    body.append('email', formData.email)
    body.append('password', formData.password)
    if (profilePic) {
      body.append('profilePic', profilePic)
    }

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        body,
      })
      const result = await response.json()

      if (!response.ok || !result.status) {
        setMessage({ type: 'error', text: result.message || 'Signup failed' })
        return
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      setMessage({ type: 'success', text: result.message || 'Account created successfully' })
      navigate('/signin')
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
            Create <span className="text-[#ffc414]">Account</span>
          </h1>
          <p className="mt-2 text-sm font-normal text-[#cfd0d5]">Let's start your journey</p>
        </div>

        <label className="mx-auto mb-5 grid h-20 w-20 cursor-pointer place-items-center overflow-hidden rounded-full bg-[#1f1f22] text-[#ffc414] ring-2 ring-[#c99a00] transition hover:bg-[#242426]">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => setProfilePic(event.target.files?.[0] || null)}
          />
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="Selected profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffc414] text-black">
              <CameraIcon />
            </span>
          )}
          <span className="sr-only">Upload profile picture</span>
        </label>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            icon={<UserIcon />}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Fullname"
          />
          <AuthInput
            icon={<MailIcon />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <AuthInput
            icon={<KeyIcon />}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
          />

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
          <span>or signup with</span>
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

        <p className="mt-16 text-center text-xs font-normal text-[#c8c8cc]">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-white">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignUp

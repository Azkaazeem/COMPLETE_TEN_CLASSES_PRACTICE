import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'

const API_URL = import.meta.env.VITE_API_URL || 'https://complete-ten-classes-practice-3pt7.vercel.app/api/v1/auth'

const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout request failed:', error)
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setShowLogoutModal(false)
    navigate('/signin')
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-4 py-8 font-sans text-white">
      <div className="w-full max-w-[420px] text-center">
        {user?.profilePic && (
          <img
            src={user.profilePic}
            alt={user.name || 'Profile'}
            className="mx-auto mb-5 h-24 w-24 rounded-full object-cover ring-2 ring-[#ffc414]"
          />
        )}

        <h1 className="text-[28px] font-extrabold leading-tight sm:text-[34px]">
          Welcome <span className="text-[#ffc414]">{user?.name || 'Home'}</span>
        </h1>
        <p className="mt-3 text-sm text-[#cfd0d5]">Your account is ready.</p>

        <div className="mt-8 flex justify-center gap-3">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-[#ffc414] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#ffd24a]"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="rounded-md bg-red-500/15 px-5 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500/25"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="rounded-md bg-[#1f1f22] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29292d]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-[#ffc414] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#ffd24a]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <ConfirmModal
          title="Log out?"
          message="You will be signed out from this browser."
          confirmLabel="Logout"
          danger
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </section>
  )
}

export default Home

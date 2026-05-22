import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import SignUp from './authPages/signup'
import SignIn from './authPages/signin'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

const App = () => {
  const location = useLocation()
  const showAuthNav = ['/signin', '/signup'].includes(location.pathname)

  return (
    <main className="min-h-screen bg-black">
      {showAuthNav && (
        <div className="fixed right-4 top-4 z-10 flex rounded-full bg-[#1f1f22] p-1 text-xs font-black text-white shadow-lg">
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 ${isActive ? 'bg-[#ffc414] text-black' : ''}`
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 ${isActive ? 'bg-[#ffc414] text-black' : ''}`
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App

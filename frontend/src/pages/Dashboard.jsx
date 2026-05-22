import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'

const API_URL = import.meta.env.VITE_API_URL || 'https://complete-ten-classes-practice-3pt7.vercel.app/api/v1/auth'
const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'

const formatDate = (date) => {
  if (!date) return 'Not available'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const mapUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: 'Active',
  joined: formatDate(user.createdAt),
  avatar: user.profilePic || FALLBACK_AVATAR,
})

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'settings', label: 'Settings', icon: 'settings', disabled: true },
]

const Icon = ({ name }) => {
  const common = 'h-5 w-5'

  if (name === 'users') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
        <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8.5 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM8 13c-4 0-6.5 2-6.5 4.6V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2.4C14.5 15 12 13 8 13Zm8.5.2c-.55 0-1.08.05-1.58.15 1.03 1 1.58 2.25 1.58 3.75V20c0 .35-.06.69-.18 1H21a1 1 0 0 0 1-1v-2.1c0-2.8-2.15-4.7-5.5-4.7Z" />
      </svg>
    )
  }

  if (name === 'settings') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
        <path d="M19.4 13.5c.08-.49.1-.99.05-1.5l2-1.55-2-3.46-2.47.99a8 8 0 0 0-1.3-.76L15.3 4h-4l-.38 3.22c-.47.2-.9.46-1.3.76l-2.47-.99-2 3.46 2 1.55a7.5 7.5 0 0 0 .05 1.5l-2.05 1.6 2 3.46 2.55-1.02c.37.27.77.5 1.2.68l.4 3.28h4l.4-3.28c.43-.18.83-.41 1.2-.68l2.55 1.02 2-3.46-2.05-1.6ZM13.3 15.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </svg>
    )
  }

  if (name === 'logout') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
        <path d="M5 3h7a2 2 0 0 1 2 2v2h-2V5H5v14h7v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm12.6 5.4L21.2 12l-3.6 3.6-1.4-1.4 1.2-1.2H9v-2h8.4l-1.2-1.2 1.4-1.4Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
    </svg>
  )
}

const StatBox = ({ title, value, meta, tone }) => (
  <div className="rounded-lg border border-white/10 bg-[#16171b] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d93a1]">{title}</p>
        <p className="mt-3 text-3xl font-black text-white">{value}</p>
      </div>
      <span className={`h-3 w-3 rounded-full ${tone}`} />
    </div>
    <p className="mt-4 text-sm text-[#aeb3bf]">{meta}</p>
  </div>
)

const UserTable = ({ users, onDelete, onToggleRole, compact }) => (
  <div className="overflow-hidden rounded-lg border border-white/10 bg-[#15161a]">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.08em] text-[#8d93a1]">
          <tr>
            <th className="px-5 py-4 font-bold">User</th>
            <th className="px-5 py-4 font-bold">Role</th>
            <th className="px-5 py-4 font-bold">Status</th>
            <th className="px-5 py-4 font-bold">Joined</th>
            <th className="px-5 py-4 text-right font-bold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {users.map((user) => (
            <tr key={user.id} className="text-sm text-white">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-[#9ca3af]">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.role === 'admin' ? 'bg-[#ffc414] text-black' : 'bg-white/10 text-white'}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-orange-500/15 text-orange-300'}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-5 py-4 text-[#c8ccd4]">{user.joined}</td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleRole(user)}
                    className="rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/15"
                  >
                    {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(user.id)}
                    className="rounded-md bg-red-500/15 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/25"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan="5" className="px-5 py-10 text-center text-sm text-[#9ca3af]">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {compact && (
      <div className="border-t border-white/10 px-5 py-4 text-xs text-[#9ca3af]">
        Showing latest {users.length} users.
      </div>
    )}
  </div>
)

const Dashboard = () => {
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ users: 0, admins: 0, database: 'Inactive' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)

  const admin = {
    name: storedUser?.name || 'Admin User',
    role: storedUser?.role || 'admin',
    avatar: storedUser?.profilePic || FALLBACK_AVATAR,
  }

  const authFetch = async (path, options = {}) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
    const result = await response.json()

    if (!response.ok || !result.status) {
      throw new Error(result.message || 'Request failed')
    }

    return result
  }

  const loadDashboard = async () => {
    try {
      setIsLoading(true)
      setError('')
      const result = await authFetch('/dashboard')

      setUsers(result.data.users.map(mapUser))
      setStats(result.data.stats)
    } catch (requestError) {
      setError(requestError.message || 'Dashboard data could not be loaded')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return users

    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase().includes(keyword),
    )
  }, [search, users])

  const dashboardUsers = users.slice(0, 5)

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (requestError) {
      console.error('Logout request failed:', requestError)
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setModal(null)
    navigate('/signin')
  }

  const handleDeleteUser = async (id) => {
    try {
      await authFetch(`/users/${id}`, {
        method: 'DELETE',
      })
      setUsers((prev) => prev.filter((user) => user.id !== id))
      setStats((prev) => {
        const deletedUser = users.find((user) => user.id === id)

        return {
          ...prev,
          users: Math.max(prev.users - 1, 0),
          admins: deletedUser?.role === 'admin' ? Math.max(prev.admins - 1, 0) : prev.admins,
        }
      })
      setModal(null)
    } catch (requestError) {
      setError(requestError.message || 'User could not be deleted')
      setModal(null)
    }
  }

  const handleToggleUserRole = async (id) => {
    const selectedUser = users.find((user) => user.id === id)
    if (!selectedUser) return

    const nextRole = selectedUser.role === 'admin' ? 'user' : 'admin'

    try {
      const result = await authFetch(`/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: nextRole }),
      })
      const updatedUser = mapUser(result.data)

      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      setStats((prev) => ({
        ...prev,
        admins: nextRole === 'admin' ? prev.admins + 1 : Math.max(prev.admins - 1, 0),
      }))

      if (updatedUser.id === storedUser?._id && updatedUser.role !== 'admin') {
        localStorage.setItem('user', JSON.stringify(result.data))
        navigate('/')
      }
    } catch (requestError) {
      setError(requestError.message || 'User role could not be updated')
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c0f] font-sans text-white">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#111216] p-5 lg:flex lg:flex-col">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#ffc414] text-lg font-black text-black">
                B
              </div>
              <div>
                <p className="text-lg font-black">Blog Admin</p>
                <p className="text-xs text-[#8d93a1]">Control dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex h-12 w-full items-center gap-3 rounded-lg px-4 text-sm font-bold transition ${
                    activeTab === item.id
                      ? 'bg-[#ffc414] text-black'
                      : 'bg-transparent text-[#cbd0da] hover:bg-white/10'
                  } ${item.disabled ? 'cursor-not-allowed opacity-45 hover:bg-transparent' : ''}`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <img src={admin.avatar} alt={admin.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{admin.name}</p>
                  <p className="text-xs capitalize text-[#ffc414]">{admin.role}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal({ type: 'logout' })}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-red-500/15 text-sm font-black text-red-200 transition hover:bg-red-500/25"
            >
              <Icon name="logout" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 rounded-lg border border-white/10 bg-[#14151a] p-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <img src={admin.avatar} alt={admin.name} className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{admin.name}</p>
                  <p className="text-xs capitalize text-[#ffc414]">{admin.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModal({ type: 'logout' })}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-200"
                aria-label="Logout"
              >
                <Icon name="logout" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-lg text-xs font-bold ${
                    activeTab === item.id ? 'bg-[#ffc414] text-black' : 'bg-white/10 text-white'
                  } ${item.disabled ? 'cursor-not-allowed opacity-45' : ''}`}
                >
                  <Icon name={item.icon} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </header>

          {activeTab === 'dashboard' && (
            <section>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#ffc414]">Dashboard</p>
                  <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Admin Overview</h1>
                </div>
                <p className="max-w-md text-sm text-[#aeb3bf]">
                  Live users and role controls are connected to the backend.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <StatBox title="Users" value={stats.users} meta="Total registered accounts" tone="bg-sky-400" />
                <StatBox title="Admins" value={stats.admins} meta="Users with admin access" tone="bg-[#ffc414]" />
                <StatBox title="Database" value={stats.database} meta="MongoDB connection status" tone={stats.database === 'Active' ? 'bg-emerald-400' : 'bg-red-400'} />
              </div>

              {error && (
                <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
                  {error}
                </div>
              )}

              <div className="mt-6 rounded-lg border border-white/10 bg-[#111216] p-4 sm:p-5">
                <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-black">Recent Users</h2>
                    <p className="text-sm text-[#9ca3af]">Only 5 users show here.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('users')}
                    className="h-10 rounded-md bg-[#ffc414] px-4 text-sm font-black text-black transition hover:bg-[#ffd24a]"
                  >
                    Show More
                  </button>
                </div>

                {isLoading ? (
                  <div className="rounded-lg border border-white/10 bg-[#15161a] px-5 py-10 text-center text-sm font-bold text-[#aeb3bf]">
                    Loading users...
                  </div>
                ) : (
                  <UserTable
                    users={dashboardUsers}
                    onDelete={(id) => setModal({ type: 'delete', userId: id })}
                  onToggleRole={(user) => setModal({ type: 'role', user })}
                  compact
                />
                )}
              </div>
            </section>
          )}

          {activeTab === 'users' && (
            <section>
              <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#ffc414]">Users</p>
                  <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">All Users</h1>
                </div>

                <label className="flex h-12 w-full items-center gap-3 rounded-lg border border-white/10 bg-[#15161a] px-4 text-[#8d93a1] lg:max-w-sm">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.14l3.73 3.73-1.42 1.42-3.73-3.73A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search users..."
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#747b88]"
                  />
                </label>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="rounded-lg border border-white/10 bg-[#15161a] px-5 py-10 text-center text-sm font-bold text-[#aeb3bf]">
                  Loading users...
                </div>
              ) : (
                <UserTable
                users={filteredUsers}
                onDelete={(id) => setModal({ type: 'delete', userId: id })}
                onToggleRole={(user) => setModal({ type: 'role', user })}
              />
              )}
            </section>
          )}
        </main>
      </div>
      {modal?.type === 'logout' && (
        <ConfirmModal
          title="Log out?"
          message="You will leave the admin dashboard and return to the sign in page."
          confirmLabel="Logout"
          danger
          onCancel={() => setModal(null)}
          onConfirm={handleLogout}
        />
      )}

      {modal?.type === 'delete' && (
        <ConfirmModal
          title="Delete user?"
          message="This user will be deleted from the database."
          confirmLabel="Delete User"
          danger
          onCancel={() => setModal(null)}
          onConfirm={() => handleDeleteUser(modal.userId)}
        />
      )}

      {modal?.type === 'role' && (
        <ConfirmModal
          title="Change role?"
          message={`Do you want to make ${modal.user.name} a ${
            modal.user.role === 'admin' ? 'user' : 'admin'
          }?`}
          confirmLabel={modal.user.role === 'admin' ? 'Make User' : 'Make Admin'}
          onCancel={() => setModal(null)}
          onConfirm={() => {
            handleToggleUserRole(modal.user.id)
            setModal(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard

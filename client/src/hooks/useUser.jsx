import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for saved email
    const savedEmail = localStorage.getItem('eventually_email')
    if (savedEmail) {
      login(savedEmail)
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('eventually_email', email)
        setUser({ email })
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Login error:', error)
    }
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('eventually_email')
    setUser(null)
    setEvents([])
  }

  const refreshEvents = async () => {
    if (!user?.email) return
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(user.email)}/events`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error refreshing events:', error)
    }
  }

  return (
    <UserContext.Provider value={{ user, events, loading, login, logout, refreshEvents }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}


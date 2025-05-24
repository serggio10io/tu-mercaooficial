"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  checkSession: () => boolean
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = "oigres"
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = (): boolean => {
    try {
      const sessionData = localStorage.getItem("admin_session")
      if (sessionData) {
        const { timestamp } = JSON.parse(sessionData)
        const now = Date.now()

        if (now - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true)
          return true
        } else {
          // Session expired
          localStorage.removeItem("admin_session")
          setIsAuthenticated(false)
          return false
        }
      } else {
        setIsAuthenticated(false)
        return false
      }
    } catch (error) {
      localStorage.removeItem("admin_session")
      setIsAuthenticated(false)
      return false
    }
  }

  useEffect(() => {
    // Check session on mount
    checkSession()
    setIsLoading(false)
  }, [])

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      const sessionData = {
        timestamp: Date.now(),
        authenticated: true,
      }
      localStorage.setItem("admin_session", JSON.stringify(sessionData))
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_session")
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, checkSession, isLoading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

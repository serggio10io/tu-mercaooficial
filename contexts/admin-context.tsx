"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  checkSession: () => boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = "oigres" // En producción, esto debería estar cifrado
const SESSION_DURATION = 60 * 60 * 1000 // 1 hora en milisegundos

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const sessionData = {
        authenticated: true,
        timestamp: Date.now(),
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

  const checkSession = (): boolean => {
    try {
      const sessionData = localStorage.getItem("admin_session")
      if (!sessionData) {
        setIsAuthenticated(false)
        return false
      }

      const { authenticated, timestamp } = JSON.parse(sessionData)
      const now = Date.now()

      if (authenticated && now - timestamp < SESSION_DURATION) {
        setIsAuthenticated(true)
        return true
      } else {
        logout()
        return false
      }
    } catch {
      logout()
      return false
    }
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, checkSession }}>{children}</AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

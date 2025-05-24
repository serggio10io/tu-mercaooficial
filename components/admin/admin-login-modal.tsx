"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAdmin()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await login(password)

      if (success) {
        toast({
          title: "✅ Acceso concedido",
          description: "Bienvenido al panel de administrador",
        })
        onClose()
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "❌ Acceso denegado",
          description: "Contraseña incorrecta",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Ocurrió un error al intentar acceder",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setPassword("")
    }
  }

  const handleClose = () => {
    setPassword("")
    setShowPassword(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Shield className="h-5 w-5 text-[#2E86C1]" />
            Acceso de Administrador
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Contraseña</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña de administrador"
                className="pr-10"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#2E86C1] hover:bg-[#2E86C1]/90"
              disabled={isSubmitting || !password.trim()}
            >
              {isSubmitting ? "Verificando..." : "Ingresar"}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center mt-4">🔒 Acceso restringido solo para administradores</div>
      </DialogContent>
    </Dialog>
  )
}

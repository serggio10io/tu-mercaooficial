"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ShoppingCart } from "lucide-react"
import { products } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function OrderModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    product: "",
    note: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, product: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar el pedido, por ejemplo a WhatsApp
    const message = `*Nuevo Pedido*%0A
*Producto:* ${formData.product}%0A
*Dirección:* ${formData.address}%0A
*Teléfono:* ${formData.phone}%0A
*Nota:* ${formData.note || "Sin notas adicionales"}%0A`

    // Abrir WhatsApp con el mensaje predefinido
    window.open(`https://wa.me/+58850138?text=${message}`, "_blank")

    // Mostrar confirmación
    setSubmitted(true)

    // Resetear después de 3 segundos
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        phone: "",
        address: "",
        product: "",
        note: "",
      })
      setOpen(false)
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-highlight text-secondary hover:bg-highlight/90 font-montserrat font-semibold text-lg px-6 py-6 shadow-lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Hacer Pedido
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border-highlight">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-montserrat text-gradient">Realizar Pedido</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              className="flex flex-col items-center justify-center py-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Check className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="text-xl font-montserrat font-semibold text-secondary mb-2">¡Pedido Enviado!</h3>
              <p className="text-center text-text">Tu pedido ha sido enviado correctamente. Te contactaremos pronto.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-2">
                <Label htmlFor="product" className="text-secondary">
                  Producto*
                </Label>
                <Select required onValueChange={handleSelectChange} value={formData.product}>
                  <SelectTrigger id="product" className="border-primary/30 focus:ring-highlight">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name} - {product.price} CUP
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-secondary">
                  Número de teléfono*
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+58 123 456 7890"
                  required
                  className="border-primary/30 focus:ring-highlight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-secondary">
                  Dirección de entrega*
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle, número, reparto, ciudad"
                  required
                  className="border-primary/30 focus:ring-highlight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-secondary">
                  Nota adicional (opcional)
                </Label>
                <Textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales, preferencias, etc."
                  rows={3}
                  className="border-primary/30 focus:ring-highlight"
                />
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full bg-highlight text-secondary hover:bg-highlight/90 font-montserrat font-semibold text-lg py-6"
                >
                  Enviar Pedido
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/cart-context"
import { useDelivery } from "@/contexts/delivery-context"
import { Minus, Plus, Trash2, ShoppingBag, Check, ShoppingCart, Truck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import DeliveryModal from "@/components/delivery/delivery-modal"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, dispatch } = useCart()
  const { selectedDelivery, deliveryCost, clearDelivery } = useDelivery()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [orderSent, setOrderSent] = useState(false)
  const [needsDelivery, setNeedsDelivery] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const handleDeliveryCheckbox = (checked: boolean) => {
    setNeedsDelivery(checked)
    if (checked) {
      setShowDeliveryModal(true)
    } else {
      clearDelivery()
    }
  }

  const totalWithDelivery = state.total + (needsDelivery ? deliveryCost : 0)

  const sendWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    const orderDetails = state.items
      .map((item) => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} CUP`)
      .join("%0A")

    const deliveryInfo =
      needsDelivery && selectedDelivery
        ? `%0A*DELIVERY:* ${selectedDelivery.name} (+${selectedDelivery.price} CUP)`
        : ""

    const message = `*NUEVO PEDIDO - tuMercao*%0A%0A*Cliente:* ${customerInfo.name}%0A*Teléfono:* ${customerInfo.phone}%0A*Dirección:* ${customerInfo.address}%0A%0A*PRODUCTOS:*%0A${orderDetails}${deliveryInfo}%0A%0A*TOTAL: ${totalWithDelivery} CUP*%0A%0A*Notas:* ${customerInfo.notes || "Sin notas adicionales"}`

    window.open(`https://wa.me/+58850138?text=${message}`, "_blank")

    setOrderSent(true)
    setTimeout(() => {
      setOrderSent(false)
      clearCart()
      clearDelivery()
      setCustomerInfo({ name: "", phone: "", address: "", notes: "" })
      setNeedsDelivery(false)
      onClose()
    }, 3000)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat text-gradient flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Mi Carrito ({state.itemCount} productos)
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {orderSent ? (
              <motion.div
                className="flex flex-col items-center justify-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div
                  className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <Check className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-2">¡Pedido Enviado!</h3>
                <p className="text-center text-text">
                  Tu pedido ha sido enviado por WhatsApp. Te contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-400">Añade algunos productos para comenzar</p>
                  </div>
                ) : (
                  <>
                    {/* Lista de productos */}
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {state.items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex items-center gap-4 p-4 border rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-secondary">{item.name}</h4>
                            <p className="text-primary font-bold">{item.price} CUP</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <span className="w-8 text-center font-semibold">{item.quantity}</span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-secondary">{item.price * item.quantity} CUP</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">Subtotal:</span>
                        <span className="text-lg font-semibold">{state.total} CUP</span>
                      </div>

                      {needsDelivery && selectedDelivery && (
                        <div className="flex justify-between items-center text-primary">
                          <span className="text-sm flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Delivery ({selectedDelivery.name}):
                          </span>
                          <span className="text-sm font-semibold">+{selectedDelivery.price} CUP</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-primary">{totalWithDelivery} CUP</span>
                      </div>
                    </div>

                    {/* Formulario de cliente */}
                    <div className="space-y-4 border-t pt-4">
                      <h3 className="text-lg font-semibold text-secondary">Información de entrega</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nombre completo *</Label>
                          <Input
                            id="name"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Tu nombre"
                            className="border-primary/30"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Teléfono *</Label>
                          <Input
                            id="phone"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="+58 123 456 7890"
                            className="border-primary/30"
                          />
                        </div>
                      </div>

                      {/* Checkbox de Delivery */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50/50">
                          <Checkbox
                            id="delivery"
                            checked={needsDelivery}
                            onCheckedChange={handleDeliveryCheckbox}
                            className="data-[state=checked]:bg-[#2E86C1] data-[state=checked]:border-[#2E86C1]"
                          />
                          <Label
                            htmlFor="delivery"
                            className="text-sm font-medium cursor-pointer flex items-center gap-2"
                          >
                            <Truck className="h-4 w-4 text-[#2E86C1]" />
                            ¿Necesitas delivery? (+200-500 CUP según ubicación)
                          </Label>
                        </div>

                        {needsDelivery && selectedDelivery && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-3 bg-[#2E86C1]/10 border border-[#2E86C1]/20 rounded-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-[#2E86C1]">{selectedDelivery.name}</p>
                                <p className="text-sm text-gray-600">
                                  {selectedDelivery.zone} • {selectedDelivery.time}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#2E86C1]">{selectedDelivery.price} CUP</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowDeliveryModal(true)}
                                  className="text-xs text-[#2E86C1] hover:text-[#2E86C1]/80"
                                >
                                  Cambiar
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="address">Dirección de entrega *</Label>
                        <Input
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                          placeholder="Calle, número, reparto, ciudad"
                          className="border-primary/30"
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">Notas adicionales</Label>
                        <Textarea
                          id="notes"
                          value={customerInfo.notes}
                          onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                          placeholder="Instrucciones especiales, preferencias, etc."
                          rows={3}
                          className="border-primary/30"
                        />
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={clearCart} className="flex-1">
                        Vaciar carrito
                      </Button>

                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={sendWhatsAppOrder}
                          className="w-full bg-highlight text-secondary hover:bg-highlight/90 font-bold text-lg py-6"
                        >
                          Enviar pedido por WhatsApp
                        </Button>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <DeliveryModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        onConfirm={() => {
          setShowDeliveryModal(false)
          setNeedsDelivery(true)
        }}
        onCancel={() => {
          setShowDeliveryModal(false)
          setNeedsDelivery(false)
          clearDelivery()
        }}
      />
    </>
  )
}

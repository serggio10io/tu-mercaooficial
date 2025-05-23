"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import CartModal from "./cart-modal"
import { motion } from "framer-motion"

export default function CartButton() {
  const { state } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="relative border-primary text-primary hover:bg-primary/10"
        >
          <ShoppingCart className="h-5 w-5" />
          {state.itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent"
            >
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </motion.div>

      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

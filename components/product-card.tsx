"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Crear una copia del producto con la cantidad seleccionada
    const productWithQuantity = {
      ...product,
      quantity: quantity,
    }

    dispatch({ type: "ADD_ITEM", payload: productWithQuantity })
    toast({
      title: "Producto añadido",
      description: `${quantity} ${quantity > 1 ? "unidades" : "unidad"} de ${product.name} se añadió al carrito`,
    })

    // Resetear la cantidad a 1 después de añadir al carrito
    setQuantity(1)
  }

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/productos/${product.id}`}>
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link href={`/productos/${product.id}`}>
          <h3 className="font-montserrat font-semibold text-sm sm:text-base lg:text-lg text-secondary mb-1 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-text/80 text-xs sm:text-sm mb-3 line-clamp-2 h-8 sm:h-10">{product.description}</p>

        <div className="flex justify-between items-center">
          <motion.span
            className="font-montserrat font-bold text-base sm:text-lg lg:text-xl text-primary"
            whileHover={{ scale: 1.1 }}
          >
            {product.price} CUP
          </motion.span>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setQuantity(Math.max(1, quantity - 1))
                }}
                className="px-1 sm:px-2 py-1 bg-gray-100 hover:bg-gray-200 text-secondary"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-1 sm:px-2 py-1 text-xs sm:text-sm font-medium">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setQuantity(quantity + 1)
                }}
                className="px-1 sm:px-2 py-1 bg-gray-100 hover:bg-gray-200 text-secondary"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={addToCart}
                size="sm"
                className="bg-highlight text-secondary hover:bg-highlight/90 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                Añadir
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === params.id) || null
      setProduct(foundProduct)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-montserrat font-semibold text-primary mb-4">Producto no encontrado</h1>
        <Link href="/" className="flex items-center text-secondary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">{product.category}</span>
          <h1 className="font-montserrat font-semibold text-3xl md:text-4xl text-primary mt-2 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-8">
            <span className="font-montserrat font-semibold text-2xl text-secondary">${product.price.toFixed(2)}</span>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 px-6 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Añadir al carrito
            </button>
            <button className="w-full py-3 px-6 border border-primary text-primary font-montserrat font-semibold rounded-lg hover:bg-primary/5 transition-colors">
              Comprar ahora
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-montserrat font-semibold text-primary mb-2">Detalles del producto</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Material de alta calidad</li>
              <li>Diseño exclusivo</li>
              <li>Garantía de 1 año</li>
              <li>Envío rápido disponible</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

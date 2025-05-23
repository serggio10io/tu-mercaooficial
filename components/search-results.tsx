"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { motion } from "framer-motion"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams?.get("q")

  if (!query) return null

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.location.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <motion.h2
        className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center text-gradient"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Resultados para "{query}"
      </motion.h2>
      {filteredProducts.length === 0 ? (
        <motion.p
          className="text-center text-base sm:text-lg mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No se encontraron productos. Intenta con otra búsqueda.
        </motion.p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

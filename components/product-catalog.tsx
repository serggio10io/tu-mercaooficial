"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/types"
import { motion } from "framer-motion"

interface ProductCatalogProps {
  products: Product[]
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [category, setCategory] = useState<string>("all")

  const categories = ["all", ...new Set(products.map((product) => product.category))]

  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors ${
              category === cat ? "bg-primary text-secondary font-semibold" : "bg-gray-100 text-text hover:bg-gray-200"
            }`}
          >
            {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

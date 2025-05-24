"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { products as initialProducts } from "@/lib/data"
import type { Product } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface ProductWithStock extends Product {
  stock: number
}

interface ProductsContextType {
  products: ProductWithStock[]
  addProduct: (product: Omit<ProductWithStock, "id">) => void
  removeProduct: (id: string) => void
  updateStock: (id: string, stock: number) => void
  saveStockChanges: () => void
  getStockStatus: (stock: number) => { status: string; color: string }
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductWithStock[]>([])

  useEffect(() => {
    // Cargar productos desde localStorage o usar datos iniciales
    const savedProducts = localStorage.getItem("admin_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Convertir productos iniciales añadiendo stock aleatorio
      const productsWithStock = initialProducts.map((product) => ({
        ...product,
        stock: Math.floor(Math.random() * 20) + 1, // Stock aleatorio entre 1-20
      }))
      setProducts(productsWithStock)
      localStorage.setItem("admin_products", JSON.stringify(productsWithStock))
    }
  }, [])

  const addProduct = (productData: Omit<ProductWithStock, "id">) => {
    const newProduct: ProductWithStock = {
      ...productData,
      id: Date.now().toString(),
    }
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem("admin_products", JSON.stringify(updatedProducts))
    toast({
      title: "✅ Producto añadido",
      description: "El producto se ha añadido correctamente",
    })
  }

  const removeProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem("admin_products", JSON.stringify(updatedProducts))
    toast({
      title: "🗑️ Producto eliminado",
      description: "El producto se ha eliminado correctamente",
    })
  }

  const updateStock = (id: string, stock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock } : p)))
  }

  const saveStockChanges = () => {
    localStorage.setItem("admin_products", JSON.stringify(products))
    toast({
      title: "✅ Stock actualizado",
      description: "Los cambios de stock se han guardado correctamente",
    })
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { status: "Agotado", color: "text-red-600" }
    } else if (stock <= 2) {
      return { status: `Solo quedan ${stock}`, color: "text-orange-600" }
    } else {
      return { status: "Disponible", color: "text-green-600" }
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateStock,
        saveStockChanges,
        getStockStatus,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}

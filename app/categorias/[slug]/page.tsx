"use client"

import type React from "react"

import { useState } from "react"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import AddProductButton from "@/components/add-product-button"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const categorySlug = params.slug

  // Filtrar productos por categoría
  let categoryProducts = products.filter((product) => product.category === categorySlug)

  // Aplicar filtro de búsqueda si existe
  if (searchQuery) {
    categoryProducts = categoryProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const getCategoryName = (slug: string) => {
    const categoryMap: Record<string, string> = {
      frutas: "Frutas y Vegetales",
      artesanias: "Artesanías",
      ropa: "Ropa",
      electronica: "Electrónica",
      alimentos: "Alimentos",
      carnes: "Carnes",
      limpieza: "Limpieza",
    }
    return categoryMap[slug] || slug
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <main className="container px-4 py-8 mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/productos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Productos
        </Link>
      </Button>

      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{getCategoryName(categorySlug)}</h1>

      <form onSubmit={handleSearch} className="flex flex-col mb-8 sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Buscar en ${getCategoryName(categorySlug)}...`}
            className="pl-10 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="text-lg font-bold">
          Buscar
        </Button>
      </form>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No se encontraron productos</h2>
          <p className="text-muted-foreground mb-6">
            No hay productos disponibles en esta categoría o con los términos de búsqueda.
          </p>
          {searchQuery && <Button onClick={() => setSearchQuery("")}>Limpiar búsqueda</Button>}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <AddProductButton />
    </main>
  )
}

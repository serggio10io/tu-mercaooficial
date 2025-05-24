"use client"

import type React from "react"

import { useState } from "react"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [locationFilter, setLocationFilter] = useState("todos")
  const [sortOrder, setSortOrder] = useState("recientes")

  // Obtener categorías únicas
  const categories = ["todos", ...Array.from(new Set(products.map((p) => p.category)))]

  // Obtener ubicaciones únicas
  const locations = ["todos", ...Array.from(new Set(products.map((p) => p.location)))]

  // Filtrar productos
  let filteredProducts = [...products]

  // Aplicar filtro de búsqueda
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Aplicar filtro de categoría
  if (categoryFilter !== "todos") {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  // Aplicar filtro de ubicación
  if (locationFilter !== "todos") {
    filteredProducts = filteredProducts.filter((product) => product.location === locationFilter)
  }

  // Aplicar ordenamiento
  if (sortOrder === "recientes") {
    // Asumiendo que los IDs más altos son los más recientes
    filteredProducts.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
  } else if (sortOrder === "precio-bajo") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortOrder === "precio-alto") {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const getCategoryName = (slug: string) => {
    const categoryMap: Record<string, string> = {
      alimentos: "Alimentos",
      carnes: "Carnes",
      limpieza: "Limpieza",
      todos: "Todas las categorías",
    }
    return categoryMap[slug] || slug
  }

  return (
    <main className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-gradient">Todos los Productos</h1>

      <form onSubmit={handleSearch} className="flex flex-col mb-8 sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-10 text-lg border-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="text-lg font-bold bg-highlight text-secondary hover:bg-highlight/90">
          Buscar
        </Button>
      </form>

      <div className="mb-8">
        <Tabs defaultValue="filtros" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filtros">Filtros</TabsTrigger>
            <TabsTrigger value="ordenar">Ordenar</TabsTrigger>
          </TabsList>
          <TabsContent value="filtros" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Categoría</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {getCategoryName(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Ubicación</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las ubicaciones" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location === "todos" ? "Todas las ubicaciones" : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ordenar" className="pt-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Ordenar por</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Más recientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  <SelectItem value="precio-bajo">Precio: de menor a mayor</SelectItem>
                  <SelectItem value="precio-alto">Precio: de mayor a menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No se encontraron productos</h2>
          <p className="text-muted-foreground mb-6">Intenta con otros filtros o términos de búsqueda</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("todos")
              setLocationFilter("todos")
            }}
            className="bg-highlight text-secondary hover:bg-highlight/90"
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

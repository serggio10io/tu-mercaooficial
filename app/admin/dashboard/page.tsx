"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { useProducts } from "@/contexts/products-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddProductModal } from "@/components/admin/add-product-modal"
import { LogOut, Plus, Trash2, Package, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function AdminDashboard() {
  const { isAuthenticated, logout, checkSession, isLoading } = useAdmin()
  const { products, removeProduct, updateStock, saveStockChanges, getStockStatus } = useProducts()
  const router = useRouter()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [stockChanges, setStockChanges] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    if (!isLoading) {
      const sessionValid = checkSession()
      if (!sessionValid) {
        router.push("/")
      }
    }
  }, [isLoading, checkSession, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E86C1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleStockChange = (productId: string, newStock: number) => {
    setStockChanges((prev) => ({ ...prev, [productId]: newStock }))
    updateStock(productId, newStock)
  }

  const handleSaveStock = () => {
    saveStockChanges()
    setStockChanges({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
              <span className="ml-3 text-sm text-gray-500">tuMercao</span>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-[#2E86C1]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter((p) => p.stock > 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trash2 className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Agotados</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter((p) => p.stock === 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Gestionar Tarjetas</TabsTrigger>
            <TabsTrigger value="stock">Control de Stock</TabsTrigger>
          </TabsList>

          {/* Gestionar Tarjetas */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestionar Tarjetas de Productos</CardTitle>
                  <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#2E86C1] hover:bg-[#2574A9]">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir Tarjeta
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 relative">
                      <Button
                        onClick={() => removeProduct(product.id)}
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 w-8 h-8 p-0"
                      >
                        🗑️
                      </Button>
                      <div className="aspect-square relative mb-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-2 pr-8">{product.name}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold text-[#2E86C1]">${product.price} CUP</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Control de Stock */}
          <TabsContent value="stock">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Control de Stock</CardTitle>
                  <Button
                    onClick={handleSaveStock}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={Object.keys(stockChanges).length === 0}
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Producto</th>
                        <th className="text-left p-3 font-semibold">Stock</th>
                        <th className="text-left p-3 font-semibold">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const stockStatus = getStockStatus(product.stock)
                        return (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center">
                                <div className="w-12 h-12 relative mr-3">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">${product.price} CUP</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                min="0"
                                value={product.stock}
                                onChange={(e) => handleStockChange(product.id, Number.parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </td>
                            <td className="p-3">
                              <span className={`font-medium ${stockStatus.color}`}>{stockStatus.status}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

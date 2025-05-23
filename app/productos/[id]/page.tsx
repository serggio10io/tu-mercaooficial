"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, ArrowLeft, MapPin, Calendar } from "lucide-react"
import { products } from "@/lib/data"
import Link from "next/link"
import ProductCard from "@/components/product-card"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === params.id) || products[0]
      setProduct(foundProduct)

      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3)
      setRelatedProducts(related)

      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Button variant="ghost" asChild className="mt-4">
          <Link href="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Link>
        </Button>
      </div>
    )
  }

  const handleContactClick = () => {
    if (product.contactType === "whatsapp") {
      window.open(`https://wa.me/${product.contactNumber}`, "_blank")
    } else if (product.contactType === "telegram") {
      window.open(`https://t.me/${product.contactUsername}`, "_blank")
    }
  }

  return (
    <main className="container px-4 py-8 mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/productos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Productos
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-bold text-lg">
              -{product.discount}%
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-amber-600">{product.price} CUP</p>

          <div className="flex items-center mt-4 text-gray-600">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{product.location}</span>
          </div>

          <div className="flex items-center mt-2 text-gray-600">
            <Calendar className="mr-2 h-5 w-5" />
            <span>Publicado: {product.publishDate}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Descripción</h2>
            <p className="text-lg">{product.description}</p>
          </div>

          <div className="mt-8">
            <Button size="lg" className="w-full text-lg font-bold" onClick={handleContactClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Contactar por {product.contactType === "whatsapp" ? "WhatsApp" : "Telegram"}
            </Button>
          </div>

          <Card className="mt-6 p-4">
            <h2 className="text-lg font-bold mb-2">Vendedor</h2>
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={product.sellerAvatar || "/placeholder.svg"}
                  alt={product.sellerName}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-bold">{product.sellerName}</p>
                <p className="text-sm text-gray-600">Miembro desde {product.sellerMemberSince}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}

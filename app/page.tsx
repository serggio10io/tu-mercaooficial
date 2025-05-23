"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import HeroSection from "@/components/hero-section"
import { products } from "@/lib/data"
import SloganCarousel from "@/components/slogan-carousel"
import OffersBanner from "@/components/offers-banner"
import { motion } from "framer-motion"
import SearchResults from "@/components/search-results"
import PaymentInfo from "@/components/payment-info"

function HomeContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SloganCarousel />

      <section className="container px-4 py-8 mx-auto">
        <Suspense fallback={<div>Cargando...</div>}>
          <SearchResults />
        </Suspense>
      </section>

      <section className="container px-4 py-8 mx-auto">
        <motion.h2
          className="mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Productos Disponibles
        </motion.h2>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="text-base sm:text-lg font-bold bg-highlight text-secondary hover:bg-highlight/90 px-6 sm:px-8 py-4 sm:py-6"
          >
            <Link href="/productos">Ver Todos los Productos</Link>
          </Button>
        </motion.div>
      </section>

      <section className="container px-4 py-8 sm:py-16 mx-auto">
        <motion.h2
          className="mb-6 sm:mb-10 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Categorías Populares
        </motion.h2>
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Alimentos",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alimentos-dY87Th6o1W7Qd54vtNJAvfU0Uo9pS7.webp",
              slug: "alimentos",
            },
            {
              name: "Carnes",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carnes-jmM6t3YD5JYY4fC9ujC4W2uGyUrDox.webp",
              slug: "carnes",
            },
            {
              name: "Limpieza",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limpieza-pOPKogQncyFmd7B5arynFuPCxJ7nrw.webp",
              slug: "limpieza",
            },
            {
              name: "Ofertas",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ofertas-BBdinVYnAF50fVzmpTTScY9iLuTHjl.webp",
              slug: "ofertas",
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link href={`/categorias/${category.slug}`}>
                <Card className="overflow-hidden transition-all hover:shadow-xl border-none">
                  <div className="relative h-32 sm:h-40 md:h-56 group">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6">
                      <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <PaymentInfo />
      <OffersBanner />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <HomeContent />
    </Suspense>
  )
}

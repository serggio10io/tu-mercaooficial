"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/camaguey-hero-YeXDTyZgwtEFpDQHoHD2lHL63Dyddh.webp"
          alt="Calles de Camagüey"
          fill
          sizes="100vw"
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 to-primary/70"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] px-4 py-8 sm:py-16 text-center text-white">
        <motion.h1
          className="max-w-3xl mb-4 sm:mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tu mercado digital en Camagüey
        </motion.h1>

        <motion.p
          className="max-w-2xl mb-6 sm:mb-8 text-base sm:text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Productos locales de todos los repartos - Calidad que se lleva a casa
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          className="flex flex-col w-full max-w-md gap-3 sm:gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8 sm:pl-10 text-sm sm:text-lg h-10 sm:h-12 bg-white/90 backdrop-blur-sm border-highlight"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="text-sm sm:text-lg font-bold h-10 sm:h-12 bg-highlight hover:bg-highlight/90 text-secondary shadow-lg px-4 sm:px-6"
          >
            Buscar
          </Button>
        </motion.form>

        <motion.div
          className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

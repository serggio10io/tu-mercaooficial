"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import CartButton from "./cart-button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white py-3 sm:py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-montserrat font-bold text-xl sm:text-2xl lg:text-3xl text-gradient">
          tuMercao
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {["Inicio", "Productos", "Contacto"].map((item) => (
            <Link
              key={item}
              href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
              className="font-montserrat text-sm lg:text-base text-text hover:text-secondary transition-colors relative group"
            >
              {item}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </Link>
          ))}
          <CartButton />
        </nav>

        {/* Mobile menu button and cart */}
        <div className="md:hidden flex items-center space-x-3 sm:space-x-4">
          <CartButton />
          <button
            className="text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 pt-16 sm:pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col items-center space-y-4 sm:space-y-6 p-4">
              {["Inicio", "Productos", "Contacto"].map((item) => (
                <Link
                  key={item}
                  href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                  className="font-montserrat text-lg sm:text-xl text-primary hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}

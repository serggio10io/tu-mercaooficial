"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function PaymentInfo() {
  return (
    <motion.section
      className="bg-gray-50 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Pagos Seguros y Confiables</h3>
            <p className="text-gray-600 text-lg mb-4">
              Aceptamos múltiples formas de pago para tu comodidad. Transacciones seguras y rápidas.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-highlight rounded-full mr-3"></span>
                Efectivo en CUP
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-highlight rounded-full mr-3"></span>
                Transferencias bancarias
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-highlight rounded-full mr-3"></span>
                Pago contra entrega
              </li>
            </ul>
          </div>
          <div className="relative h-64 md:h-80">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comercio_cubano-dJJiWiEkuClHfauVWCbk9UvygM82e3.webp"
              alt="Comercio cubano - Pagos seguros"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

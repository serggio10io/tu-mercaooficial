"use client"

import { motion } from "framer-motion"

export default function OffersBanner() {
  return (
    <motion.div
      className="bg-gradient-animate py-6 text-white text-center shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="font-montserrat text-xl md:text-2xl font-bold"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Envíos gratis en pedidos <span className="text-white font-bold">+$1000 CUP</span>
      </motion.p>
      <p className="text-sm mt-2 text-white/80">Contacta por WhatsApp al +58850138</p>
    </motion.div>
  )
}

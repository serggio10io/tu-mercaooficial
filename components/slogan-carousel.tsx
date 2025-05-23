"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function SloganCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)
  const controls = useAnimation()

  const slogans = ["CALIDAD QUE SE LLEVA A CASA", "COMPRAMOS YA", "GRACIAS POR SU VISITA"]

  // Duplicate slogans for seamless loop
  const displaySlogans = [...slogans, ...slogans]

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: "-50%",
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        },
      })
    }
  }, [isInView, controls])

  return (
    <div ref={containerRef} className="bg-gradient-animate py-6 overflow-hidden border-y border-highlight/30 shadow-md">
      <div className="relative w-full">
        <motion.div className="whitespace-nowrap" animate={controls} initial={{ x: 0 }}>
          {displaySlogans.map((slogan, index) => (
            <span
              key={index}
              className="inline-block mx-8 text-white font-montserrat font-bold tracking-wider text-xl md:text-2xl"
            >
              {slogan} <span className="mx-2 text-accent">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

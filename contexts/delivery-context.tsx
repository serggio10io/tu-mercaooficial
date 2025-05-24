"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface DeliveryZone {
  id: string
  name: string
  price: number
  zone: string
  time: string
  emoji: string
}

interface DeliveryState {
  selectedDelivery: DeliveryZone | null
  deliveryCost: number
}

interface DeliveryContextType extends DeliveryState {
  setSelectedDelivery: (delivery: DeliveryZone | null) => void
  clearDelivery: () => void
  deliveryZones: DeliveryZone[]
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined)

export const deliveryZones: DeliveryZone[] = [
  // REPARTOS CERCANOS (200 CUP)
  { id: "la-rubia", name: "La Rubia", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "palomino", name: "Palomino", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "el-modelo", name: "El Modelo", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "el-porvenir", name: "El Porvenir", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "simoni", name: "Simoni", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "agramonte", name: "Agramonte", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },
  { id: "previsora", name: "Previsora", price: 200, zone: "Cercanos", time: "10-15 min", emoji: "📍" },

  // REPARTOS MEDIO CERCA (300 CUP)
  { id: "centro-pueblo", name: "Centro del Pueblo", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "la-vigia", name: "La Vigía", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "la-caridad", name: "La Caridad", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "vista-hermosa", name: "Vista Hermosa", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "torre-blanca", name: "Torre Blanca Garrido", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "saratoga", name: "Saratoga", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },
  { id: "la-guernica", name: "La Guernica", price: 300, zone: "Medio Cerca", time: "15-25 min", emoji: "🚗" },

  // REPARTOS LEJOS (350-400 CUP)
  { id: "puerto-principe", name: "Puerto Príncipe", price: 350, zone: "Lejos", time: "25-40 min", emoji: "📦" },
  { id: "nitrogeno", name: "Nitrógeno", price: 350, zone: "Lejos", time: "25-40 min", emoji: "📦" },
  { id: "amalia-eden", name: "Amalia Eden", price: 350, zone: "Lejos", time: "25-40 min", emoji: "📦" },
  { id: "plaza-mendez", name: "Plaza de Méndez", price: 350, zone: "Lejos", time: "25-40 min", emoji: "📦" },
  { id: "los-coquitos", name: "Los Coquitos", price: 400, zone: "Lejos", time: "25-40 min", emoji: "📦" },

  // REPARTOS SUPER LEJOS (450-500 CUP)
  { id: "lenin", name: "Lenin", price: 450, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "albaiza", name: "Albaiza", price: 450, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "juruquey", name: "Juruquey", price: 450, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "bella-vista", name: "Bella Vista", price: 450, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "el-corojo", name: "El Corojo", price: 500, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "monte-carlos", name: "Monte Carlos", price: 500, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "villa-mariana", name: "Villa Mariana", price: 500, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
  { id: "jayama", name: "Jayamá", price: 500, zone: "Super Lejos", time: "40+ min", emoji: "🚛" },
]

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryZone | null>(null)
  const [deliveryCost, setDeliveryCost] = useState(0)

  useEffect(() => {
    setDeliveryCost(selectedDelivery?.price || 0)
  }, [selectedDelivery])

  const clearDelivery = () => {
    setSelectedDelivery(null)
    setDeliveryCost(0)
  }

  const value: DeliveryContextType = {
    selectedDelivery,
    deliveryCost,
    setSelectedDelivery,
    clearDelivery,
    deliveryZones,
  }

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
}

export function useDelivery() {
  const context = useContext(DeliveryContext)
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider")
  }
  return context
}

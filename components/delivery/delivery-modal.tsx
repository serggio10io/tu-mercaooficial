"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDelivery, deliveryZones, type DeliveryZone } from "@/contexts/delivery-context"
import { motion } from "framer-motion"
import { Truck, MapPin, Clock } from "lucide-react"

interface DeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}

export default function DeliveryModal({ isOpen, onClose, onConfirm, onCancel }: DeliveryModalProps) {
  const { setSelectedDelivery } = useDelivery()
  const [tempSelection, setTempSelection] = useState<DeliveryZone | null>(null)

  const groupedZones = deliveryZones.reduce(
    (acc, zone) => {
      if (!acc[zone.zone]) {
        acc[zone.zone] = []
      }
      acc[zone.zone].push(zone)
      return acc
    },
    {} as Record<string, DeliveryZone[]>,
  )

  const handleConfirm = () => {
    if (tempSelection) {
      setSelectedDelivery(tempSelection)
      onConfirm()
    }
  }

  const handleCancel = () => {
    setTempSelection(null)
    onCancel()
  }

  const zoneOrder = ["Cercanos", "Medio Cerca", "Lejos", "Super Lejos"]
  const zoneColors = {
    Cercanos: "text-green-600",
    "Medio Cerca": "text-blue-600",
    Lejos: "text-orange-600",
    "Super Lejos": "text-red-600",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-[#2E86C1] flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Selecciona tu reparto en Camagüey
          </DialogTitle>
        </DialogHeader>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <Select
              onValueChange={(value) => {
                const zone = deliveryZones.find((z) => z.id === value)
                setTempSelection(zone || null)
              }}
            >
              <SelectTrigger className="w-full border-[#2E86C1]/30 focus:border-[#2E86C1] focus:ring-[#2E86C1]">
                <SelectValue placeholder="Selecciona tu reparto..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {zoneOrder.map((zoneName) => (
                  <div key={zoneName}>
                    <div
                      className={`px-2 py-1 text-sm font-semibold ${zoneColors[zoneName as keyof typeof zoneColors]} bg-gray-50`}
                    >
                      {groupedZones[zoneName]?.[0]?.emoji} {zoneName.toUpperCase()}
                    </div>
                    {groupedZones[zoneName]?.map((zone) => (
                      <SelectItem
                        key={zone.id}
                        value={zone.id}
                        className="hover:bg-[#AED6F1] focus:bg-[#AED6F1] cursor-pointer"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{zone.name}</span>
                          <span className="font-semibold text-[#2E86C1]">{zone.price} CUP</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>

            {tempSelection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-[#2E86C1]/10 border border-[#2E86C1]/20 rounded-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#2E86C1] text-lg">{tempSelection.name}</h4>
                    <span className="font-bold text-[#2E86C1] text-xl">{tempSelection.price} CUP</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tempSelection.zone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tempSelection.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              Cancelar
            </Button>

            <Button
              onClick={handleConfirm}
              disabled={!tempSelection}
              className="flex-1 bg-[#2E86C1] hover:bg-[#2E86C1]/90 text-white"
            >
              Confirmar
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Los precios incluyen el costo de transporte según la distancia
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface AddProductFormProps {
  onSuccess: () => void
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    location: "",
    contactType: "whatsapp",
    contactNumber: "",
    contactUsername: "",
    image: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      // Simulamos un retraso para mostrar el estado de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Producto añadido",
        description: "Tu producto ha sido publicado exitosamente.",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al publicar tu producto. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const repartos = [
    "Centro Histórico, Camagüey",
    "Reparto Garrido, Camagüey",
    "Reparto La Vigía, Camagüey",
    "Reparto Julio Antonio Mella, Camagüey",
    "Reparto Florat, Camagüey",
    "Reparto Puerto Príncipe, Camagüey",
    "Reparto Lenin, Camagüey",
    "Reparto Jayamá, Camagüey",
    "Reparto Montecarlo, Camagüey",
    "Reparto Previsora, Camagüey",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del producto *</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Piña Fresca de Camagüey"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe tu producto, incluye detalles importantes..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (CUP) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            required
            min="1"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ej: 150"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría *</Label>
          <Select required onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frutas">Frutas y Vegetales</SelectItem>
              <SelectItem value="artesanias">Artesanías</SelectItem>
              <SelectItem value="ropa">Ropa</SelectItem>
              <SelectItem value="electronica">Electrónica</SelectItem>
              <SelectItem value="alimentos">Alimentos</SelectItem>
              <SelectItem value="hogar">Hogar</SelectItem>
              <SelectItem value="servicios">Servicios</SelectItem>
              <SelectItem value="otros">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Ubicación *</Label>
        <Select required onValueChange={(value) => handleSelectChange("location", value)}>
          <SelectTrigger id="location">
            <SelectValue placeholder="Selecciona tu reparto" />
          </SelectTrigger>
          <SelectContent>
            {repartos.map((reparto) => (
              <SelectItem key={reparto} value={reparto}>
                {reparto}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Método de contacto preferido *</Label>
        <RadioGroup
          defaultValue="whatsapp"
          onValueChange={(value) => handleSelectChange("contactType", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp" id="whatsapp" />
            <Label htmlFor="whatsapp">WhatsApp</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="telegram" id="telegram" />
            <Label htmlFor="telegram">Telegram</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.contactType === "whatsapp" ? (
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Número de WhatsApp *</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Ej: +5358850138"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="contactUsername">Usuario de Telegram *</Label>
          <Input
            id="contactUsername"
            name="contactUsername"
            required
            value={formData.contactUsername}
            onChange={handleChange}
            placeholder="Ej: tumercao"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="image">Imagen del producto *</Label>
        <Input id="image" type="file" accept="image/*" required onChange={handleFileChange} />
        <p className="text-sm text-muted-foreground">Sube una imagen clara de tu producto. Tamaño máximo: 5MB.</p>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publicando...
          </>
        ) : (
          "Publicar producto"
        )}
      </Button>
    </form>
  )
}

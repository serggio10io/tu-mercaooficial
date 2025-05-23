"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddProductForm from "@/components/add-product-form"

export default function AddProductButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" size="icon">
            <Plus className="h-6 w-6" />
            <span className="sr-only">Añadir producto</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Añadir nuevo producto</DialogTitle>
            <DialogDescription>Completa el formulario para publicar tu producto en TUMERCAO</DialogDescription>
          </DialogHeader>
          <AddProductForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

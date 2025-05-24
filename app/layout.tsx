import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"
import { ProductsProvider } from "@/contexts/products-context"
import { DeliveryProvider } from "@/contexts/delivery-context"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "tuMercao | Tu mercado digital en Camagüey",
  description: "Productos locales de todos los repartos de Camagüey. Calidad que se lleva a casa.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${openSans.variable} font-sans bg-background text-text`}>
        <AdminProvider>
          <ProductsProvider>
            <DeliveryProvider>
              <CartProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
              </CartProvider>
            </DeliveryProvider>
          </ProductsProvider>
        </AdminProvider>
      </body>
    </html>
  )
}

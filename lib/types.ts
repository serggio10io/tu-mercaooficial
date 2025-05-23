export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  image: string
  category: string
  location: string
  publishDate: string
  contactType: "whatsapp" | "telegram"
  contactNumber?: string
  contactUsername?: string
  sellerName: string
  sellerAvatar: string
  sellerMemberSince: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  memberSince: string
  location: string
  contactNumber: string
  contactUsername: string
  preferredContactMethod: "whatsapp" | "telegram"
}

interface Image {
  url: string
  height: number
  width: number
}

export interface Meta {
  title: string
  keywords?: string
  description?: string
}

export interface Photo {
  photo: Image
}

export interface Product {
  title: string
  photos: Array<Photo>
}

export interface PricingItem {
  title: string
  image?: Image
  body: string
}

export interface Pricings {
  pricings: Array<PricingItem>
  note?: string
}

export interface SnsLink {
  type: 'instagram' | 'twitter' | 'line'
  account?: string
  url: string
}

export interface Profile {
  icon: string
  name: string
  body?: string
  snsLinks?: Array<SnsLink>
}

export interface Site {
  mainVisuals: Array<Photo>
  products: Array<Product>
  pricings: Pricings
  profile: Profile
  meta: Meta
  publishedAt: string
  revisedAt: string
  updatedAt: string
  createdAt: string
}
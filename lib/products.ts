export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const DONATION_PRODUCTS: Product[] = [
  {
    id: "skills-program",
    name: "Skills Training Program",
    description: "Support vocational skills training for our boys",
    priceInCents: 5000,
  },
  {
    id: "education-program",
    name: "Education Program",
    description: "Help provide educational resources and tutoring",
    priceInCents: 5000,
  },
  {
    id: "sports-program",
    name: "Sports Program",
    description: "Support athletics and team building activities",
    priceInCents: 5000,
  },
]

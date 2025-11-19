export interface Cause {
  id: string
  title: string
  description: string
  image: string
  goal: number
  raised: number
  category: string
}

export interface Volunteer {
  id: string
  name: string
  title: string
  image: string
  bio?: string
}

export interface Testimonial {
  id: string
  name: string
  title: string
  quote: string
  image?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

export interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  category: string
}

export interface Donation {
  _id?: string
  id: string
  name: string
  email: string | null
  program: "skills" | "education" | "sports"
  amount: number
  currency: "USD" | "NGN"
  paymentMethod: "stripe" | "paystack"
  transactionId?: string
  message?: string
  donationMode: "anonymous" | "known"
  status: "pending" | "completed" | "failed"
  createdAt: string
  updatedAt?: string
}

export interface Volunteer {
  _id?: string
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  profession?: string
  skills: string
  category: "professional" | "helper"
  experience?: string
  availability: string
  motivation?: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt?: string
}

export interface Boy {
  _id?: string
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  email?: string
  phone?: string
  guardianName: string
  guardianPhone: string
  guardianEmail: string
  programs: string[]
  skillsLevel: number
  educationScore: number
  athleticAbility: number
  totalScore: number
  sponsor?: {
    id: string
    name: string
  } | null
  joinedDate: string
  lastUpdated: string
  achievements?: string[]
  growthHistory?: Array<{
    date: string
    skillsLevel?: number
    educationScore?: number
    athleticAbility?: number
  }>
}

export interface Sponsorship {
  _id?: string
  id: string
  sponsorName: string
  sponsorEmail: string
  sponsorPhone: string
  company?: string
  commitmentLevel: "basic" | "standard" | "premium"
  amount: number
  currency: "USD" | "NGN"
  boyId?: string
  items?: string[]
  status: "pending" | "active" | "completed"
  createdAt: string
  updatedAt?: string
}

export interface PaystackTransaction {
  _id?: string
  id: string
  reference: string
  amount: number
  currency: string
  email: string
  type: "donation" | "sponsorship"
  donationId?: string
  sponsorshipId?: string
  status: "pending" | "success" | "failed"
  createdAt: string
  verifiedAt?: string
}

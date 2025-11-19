// Authentication utility functions for admin system
const ADMIN_TOKEN_KEY = "admin_token"
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

interface AdminCredentials {
  email: string
  password: string
}

const VALID_CREDENTIALS: AdminCredentials = {
  email: "admin@taetae.org",
  password: "TaeTae2025",
}

export function validateCredentials(email: string, password: string): boolean {
  return email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password
}

export function createAuthToken(): string {
  return `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function setAuthCookie(token: string): void {
  const expiryDate = new Date()
  expiryDate.setTime(expiryDate.getTime() + TOKEN_EXPIRY)
  document.cookie = `${ADMIN_TOKEN_KEY}=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`
}

export function clearAuthCookie(): void {
  document.cookie = `${ADMIN_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=")
    if (key === ADMIN_TOKEN_KEY) {
      return value
    }
  }
  return null
}

export function isAuthTokenValid(): boolean {
  return getAuthToken() !== null && getAuthToken() !== ""
}

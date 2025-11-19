"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, Lock } from "lucide-react"
import { validateCredentials, setAuthCookie, createAuthToken } from "@/lib/auth"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (validateCredentials(email, password)) {
        const token = createAuthToken()
        setAuthCookie(token)
        router.push("/admin/dashboard")
      } else {
        setError("Invalid credentials. Demo: admin@taetae.org / TaeTae2025")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        

        {/* Login Card */}
        <div className="bg-card border dark:bg-gray-900 border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            Admin
          </h1>
          <p className="text-muted-foreground mb-8">Secure access for administrators</p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@taetae.org"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            {/* <p className="text-sm text-muted-foreground text-center mb-4">Demo Credentials:</p>
            <div className="bg-secondary p-4 rounded-lg text-sm space-y-2">
              <p>
                <span className="font-semibold text-foreground">Email:</span>
                <span className="text-muted-foreground ml-2">admin@taetae.org</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Password:</span>
                <span className="text-muted-foreground ml-2">TaeTae2025</span>
              </p>
            </div> */}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

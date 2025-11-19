"use client"

import type React from "react"
import { useState } from "react"

export default function AdminPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)
    // In production, this would validate against your backend
    if (credentials.username === "admin" && credentials.password === "taetae123") {
      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard"
    } else {
      alert("Invalid credentials")
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Admin</h1>
        <p className="text-center text-muted-foreground mb-8">Sign in to manage the foundation</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-foreground font-semibold mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isAuthenticating ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">Demo: username: admin, password: taetae123</p>
      </div>
    </div>
  )
}

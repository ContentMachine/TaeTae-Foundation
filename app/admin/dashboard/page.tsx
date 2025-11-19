"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, BarChart3, Heart, Users, Zap, Handshake } from "lucide-react"
import { clearAuthCookie } from "@/lib/auth"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalDonations: 0,
    donationCount: 0,
    totalVolunteers: 0,
    totalSponsors: 0,
    donationsByProgram: { skills: 0, education: 0, sports: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats")
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleLogout = () => {
    clearAuthCookie()
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Welcome back. Here's your organization overview.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition"
          >
            <LogOut className="w-3 h-3" />
            Logout
          </button>
        </div>

        {/* Stats Section */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading stats...</div>
        ) : (
          <>
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              {[
                {
                  label: "Total Donations",
                  value: `$${stats.totalDonations.toLocaleString()}`,
                  icon: <Heart className="w-8 h-8 text-primary/30" />,
                },
                {
                  label: "Total Volunteers",
                  value: stats.totalVolunteers,
                  icon: <Users className="w-8 h-8 text-primary/30" />,
                },
                {
                  label: "Total Sponsors",
                  value: stats.totalSponsors,
                  icon: <Handshake className="w-8 h-8 text-primary/30" />,
                },
                {
                  label: "Donations Count",
                  value: stats.donationCount,
                  icon: <Zap className="w-8 h-8 text-primary/30" />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
                      <p className="text-3xl font-bold text-primary">{item.value}</p>
                    </div>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Donations by Program */}
            <div className="bg-card border border-border rounded-xl p-6 mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Donations by Program</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Skills", amount: stats.donationsByProgram.skills },
                  { name: "Education", amount: stats.donationsByProgram.education },
                  { name: "Sports", amount: stats.donationsByProgram.sports },
                ].map((prog) => (
                  <div
                    key={prog.name}
                    className="text-center p-5 bg-secondary/40 rounded-lg border border-border hover:border-primary transition"
                  >
                    <p className="text-2xl font-bold text-primary">${prog.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{prog.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Routes (Clickable Buttons) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {[
                {
                  href: "/admin/donations",
                  icon: <Heart className="w-6 h-6 text-primary" />,
                  title: "Manage Donations",
                  desc: "View and export donation records",
                },
                {
                  href: "/admin/volunteers",
                  icon: <Users className="w-6 h-6 text-primary" />,
                  title: "Manage Volunteers",
                  desc: "Track volunteer activities",
                },
                {
                  href: "/admin/boys",
                  icon: <Users className="w-6 h-6 text-primary" />,
                  title: "Manage Boys",
                  desc: "Update growth metrics and track progress",
                },
                {
                  href: "/admin/sponsors",
                  icon: <Handshake className="w-6 h-6 text-primary" />,
                  title: "Manage Sponsors",
                  desc: "View, add, and edit sponsors",
                },
                {
                  href: "/admin/analytics",
                  icon: <BarChart3 className="w-6 h-6 text-primary" />,
                  title: "View Analytics",
                  desc: "Track performance and impact metrics",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group bg-card border border-border rounded-xl p-6 flex flex-col items-start hover:bg-primary/10 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20">
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/admin/donations")
        if (res.ok) {
          const data = await res.json()
          setDonations(data.donations)
          console.log(" Donations loaded:", data.donations)
        }
      } catch (error) {
        console.error(" Error fetching donations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  const exportCSV = () => {
    const headers = ["Name", "Email", "Program", "Amount", "Date"]
    const rows = donations.map((d) => [
      d.name,
      d.email || "N/A",
      d.program,
      `$${d.amount}`,
      new Date(d.createdAt).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "donations.csv"
    a.click()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this donation?")) {
      try {
        const res = await fetch(`/api/admin/donations?id=${id}`, { method: "DELETE" })
        if (res.ok) {
          setDonations(donations.filter((d) => d.id !== id))
          console.log(" Donation deleted:", id)
        }
      } catch (error) {
        console.error(" Error deleting donation:", error)
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className=" items-center mb-8">
        <Link href="/admin/dashboard" className="text-primary hover:underline">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-primary">Manage Donations</h1>
      </div>

      <div className="mb-4">
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Export to CSV
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary dark:bg-gray-900 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Program</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Amount</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                    No donations yet
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="border-b border-border hover:bg-gray-400  transition">
                    <td className="px-6 py-4 text-foreground">{donation.name}</td>
                    <td className="px-6 py-4 text-foreground">{donation.email || "N/A"}</td>
                    <td className="px-6 py-4 text-foreground capitalize">{donation.program}</td>
                    <td className="px-6 py-4 font-semibold text-primary">${donation.amount}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(donation.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

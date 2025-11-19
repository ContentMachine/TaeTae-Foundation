"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("/api/admin/volunteers")
        if (res.ok) {
          const data = await res.json()
          setVolunteers(data.volunteers)
          console.log(" Volunteers loaded:", data.volunteers)
        }
      } catch (error) {
        console.error(" Error fetching volunteers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVolunteers()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this volunteer record?")) {
      try {
        const res = await fetch(`/api/admin/volunteers?id=${id}`, { method: "DELETE" })
        if (res.ok) {
          setVolunteers(volunteers.filter((v) => v.id !== id))
          console.log(" Volunteer deleted:", id)
        }
      } catch (error) {
        console.error(" Error deleting volunteer:", error)
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Manage Volunteers</h1>
        <Link href="/admin/dashboard" className="text-primary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteers.length === 0 ? (
            <p className="text-muted-foreground">No volunteers yet</p>
          ) : (
            volunteers.map((volunteer) => (
              <div key={volunteer.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-primary">{volunteer.name}</h3>
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold capitalize">
                    {volunteer.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{volunteer.email}</p>
                <p className="text-sm text-foreground mb-2">{volunteer.phone}</p>
                {volunteer.occupation && (
                  <p className="text-sm text-foreground mb-2">Expertise: {volunteer.occupation}</p>
                )}
                <p className="text-sm text-foreground mb-2">Location: {volunteer.location}</p>
                <p className="text-sm text-foreground mb-2">Availability: {volunteer.availability}</p>
                <p className="text-sm text-muted-foreground italic mt-4">{volunteer.bio}</p>
                <button
                  onClick={() => handleDelete(volunteer.id)}
                  className="mt-4 text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  Delete Record
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

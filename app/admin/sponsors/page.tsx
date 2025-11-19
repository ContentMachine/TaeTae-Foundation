"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, User, Mail, Phone, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Sponsor {
  _id?: string
  fullName: string
  email: string
  phone: string
  organization?: string
  address?: string
  createdAt?: string
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [form, setForm] = useState<Partial<Sponsor>>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    address: "",
  })

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      const res = await fetch("/api/sponsorships")
      const data = await res.json()
      if (res.ok) setSponsors(data.sponsorships || [])
      else console.error(data.error)
    } catch (error) {
      console.error("Error fetching sponsors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      const method = editingSponsor ? "PUT" : "POST"
      const url = editingSponsor ? `/api/sponsorships/${editingSponsor._id}` : `/api/sponsorships`
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to save sponsor")

      await fetchSponsors()
      setOpen(false)
      setEditingSponsor(null)
      setForm({ fullName: "", email: "", phone: "", organization: "", address: "" })
    } catch (error) {
      console.error("Error saving sponsor:", error)
    }
  }

  const handleEdit = (s: Sponsor) => {
    setEditingSponsor(s)
    setForm(s)
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return
    try {
      const res = await fetch(`/api/sponsorships/${id}`, { method: "DELETE" })
      if (res.ok) fetchSponsors()
    } catch (error) {
      console.error("Error deleting sponsor:", error)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading sponsors...
      </div>
    )

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <User className="w-8 h-8" />
            Sponsors Management
          </h1>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Sponsor
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <Card key={sponsor._id} className="border border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{sponsor.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  {sponsor.email || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  {sponsor.phone || "N/A"}
                </p>
                {sponsor.organization && (
                  <p className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-primary" />
                    {sponsor.organization}
                  </p>
                )}
                <div className="flex justify-between pt-3">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(sponsor)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(sponsor._id!)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {sponsors.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
              No sponsors found.
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={form.fullName || ""}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Organization"
                value={form.organization || ""}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
              />
              <Input
                placeholder="Address"
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>{editingSponsor ? "Update" : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Eye, Trash2, TrendingUp, X } from "lucide-react"

interface Boy {
  id: string
  fullName: string
  age: number
  program: string
  email: string
  phone: string
  background: string
  goals: string
  growthMetrics: {
    skillsLevel: number
    educationScore: number
    athleticAbility: number
    totalScore: number
  }
  sponsor?: string | null
  createdAt: string
}

export default function AdminBoysPage() {
  const [boys, setBoys] = useState<Boy[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBoy, setEditingBoy] = useState<Boy | null>(null)

  useEffect(() => {
    fetchBoys()
  }, [])

  const fetchBoys = async () => {
    try {
      const res = await fetch("/api/boys")
      if (res.ok) {
        const data = await res.json()
        setBoys(data)
      }
    } catch (error) {
      console.error("Error fetching boys:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this boy’s profile?")) return
    try {
      const res = await fetch(`/api/boys/${id}`, { method: "DELETE" })
      if (res.ok) fetchBoys()
    } catch (error) {
      console.error("Error deleting boy:", error)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <main className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-8 flex items-center gap-3">
          <TrendingUp className="w-10 h-10" /> Manage Boys
        </h1>

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          {boys.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No boys onboarded yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Age</th>
                    <th className="px-4 py-3 text-left font-semibold">Program</th>
                    <th className="px-4 py-3 text-left font-semibold">Growth</th>
                    <th className="px-4 py-3 text-left font-semibold">Sponsor</th>
                    <th className="px-4 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boys.map((boy) => (
                    <tr
                      key={boy.id}
                      className="border-b border-border hover:bg-secondary/30 transition"
                    >
                      <td className="px-4 py-3 font-semibold">{boy.fullName}</td>
                      <td className="px-4 py-3">{boy.age}</td>
                      <td className="px-4 py-3 capitalize">{boy.program}</td>
                      <td className="px-4 py-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {boy.growthMetrics.totalScore}/10
                        </span>
                      </td>
                      <td className="px-4 py-3">{boy.sponsor || "-"}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <Link
                          href={`/admin/boys/boy/${boy.id}`}
                          className="p-2 rounded-lg hover:bg-primary/10 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </Link>
                        <button
                          onClick={() => setEditingBoy(boy)}
                          className="p-2 hover:bg-primary/10 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDelete(boy.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ---------- EDIT MODAL ---------- */}
        {editingBoy && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <EditBoyModal
              boy={editingBoy}
              onClose={() => setEditingBoy(null)}
              onSaved={() => {
                setEditingBoy(null)
                fetchBoys()
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
}

/* ------------------ EDIT MODAL COMPONENT ------------------ */

function EditBoyModal({
  boy,
  onClose,
  onSaved,
}: {
  boy: Boy
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(boy)
  const [saving, setSaving] = useState(false)
  const [sponsors, setSponsors] = useState<any[]>([])

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch("/api/sponsorships")
        if (res.ok) {
          const data = await res.json()
          setSponsors(data.sponsorships || [])
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error)
      }
    }
    fetchSponsors()
  }, [])

  const handleChange = (field: keyof Boy, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleMetricChange = (
    field: keyof Boy["growthMetrics"],
    value: number
  ) => {
    const updatedMetrics = {
      ...form.growthMetrics,
      [field]: value,
    }

    updatedMetrics.totalScore = Math.round(
      (updatedMetrics.skillsLevel +
        updatedMetrics.educationScore +
        updatedMetrics.athleticAbility) /
        3
    )

    setForm({ ...form, growthMetrics: updatedMetrics })
  }

  const getMetricColor = (value: number) => {
    if (value >= 8) return "text-green-500"
    if (value >= 4) return "text-yellow-500"
    return "text-red-500"
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/boys/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) onSaved()
      else console.error("Error updating boy:", await res.text())
    } catch (error) {
      console.error("Error saving:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-bold text-primary mb-6">
        Edit Boy Profile
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block text-foreground/80 mb-1">Full Name</label>
          <input
            disabled
            value={form.fullName}
            className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-muted-foreground"
          />
        </div>

        <div>
          <label className="block text-foreground/80 mb-1">Email</label>
          <input
            disabled
            value={form.email}
            className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-muted-foreground"
          />
        </div>

        <div>
          <label className="block text-foreground/80 mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>

        <div>
          <label className="block text-foreground/80 mb-1">Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => handleChange("age", Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>

        <div>
          <label className="block text-foreground/80 mb-1">Program</label>
          <select
            value={form.program}
            onChange={(e) => handleChange("program", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="skills">Skills</option>
            <option value="education">Education</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div>
          <label className="block text-foreground/80 mb-1">Sponsor</label>
          <select
            value={form.sponsor || ""}
            onChange={(e) => handleChange("sponsor", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">No Sponsor</option>
            {sponsors.map((s) => (
              <option key={s._id} value={s.name || s.sponsorName}>
                {s.name || s.sponsorName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-foreground/80 mb-1">Background</label>
          <textarea
            value={form.background || ""}
            onChange={(e) => handleChange("background", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-foreground/80 mb-1">Goals</label>
          <textarea
            value={form.goals || ""}
            onChange={(e) => handleChange("goals", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background h-20"
          />
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
          Growth Metrics
          <span className="text-sm text-muted-foreground font-normal">
            (Visual Progress Indicators)
          </span>
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {(["skillsLevel", "educationScore", "athleticAbility"] as const).map((field) => {
            const value = form.growthMetrics?.[field] ?? 1
            const label = field.replace(/([A-Z])/g, " $1").trim()
            const colorClass = getMetricColor(value)

            return (
              <div
                key={field}
                className="p-4 border border-border rounded-xl bg-secondary/40 hover:bg-secondary/60 transition"
              >
                <label className="block text-foreground font-medium mb-2">
                  {label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) =>
                      handleMetricChange(field, Number(e.target.value))
                    }
                    className="w-20 px-2 py-2 border border-border rounded-lg bg-background text-center font-semibold"
                  />
                  <span className={`font-semibold text-xs ${colorClass}`}>
                    {value <= 3 && "🔴 Needs Work"}
                    {value > 3 && value < 8 && "🟡 Developing"}
                    {value >= 8 && "🟢 Excellent"}
                  </span>
                </div>

                <div className="w-full bg-border rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      value >= 8
                        ? "bg-green-500"
                        : value >= 4
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 text-right">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Total Score:</span>{" "}
            <span className="font-bold text-foreground">
              {form.growthMetrics.totalScore}/10
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-secondary/40 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

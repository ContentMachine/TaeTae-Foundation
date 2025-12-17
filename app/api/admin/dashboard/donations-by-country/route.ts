import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const donations = await getRecords("donations")
    const sponsorships = await getRecords("sponsorships")

    const countryExtractor = (email: string | null) => {
      if (!email) return "Unknown"
      const domain = email.split("@")[1]?.toLowerCase()
      if (domain?.endsWith(".ng")) return "Nigeria"
      if (domain?.endsWith(".uk") || domain?.endsWith(".co.uk")) return "United Kingdom"
      if (domain?.endsWith(".us")) return "United States"
      return "Others"
    }

    const countryMap = new Map()

    donations.filter((d: any) => d.status === "completed").forEach((donation: any) => {
      const country = countryExtractor(donation.email)
      if (!countryMap.has(country)) {
        countryMap.set(country, { country, amount: 0, count: 0 })
      }
      const data = countryMap.get(country)
      data.amount += donation.currency === "NGN" ? donation.amount / 1500 : donation.amount
      data.count += 1
    })

    sponsorships.filter((s: any) => s.status === "active").forEach((sponsorship: any) => {
      const country = countryExtractor(sponsorship.sponsorEmail)
      if (!countryMap.has(country)) {
        countryMap.set(country, { country, amount: 0, count: 0 })
      }
      const data = countryMap.get(country)
      data.amount += sponsorship.currency === "NGN" ? sponsorship.amount / 1500 : sponsorship.amount
      data.count += 1
    })

    const byCountry = Array.from(countryMap.values()).sort((a, b) => b.amount - a.amount)

    return NextResponse.json({ success: true, byCountry })
  } catch (error) {
    console.error("Error fetching donations by country:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const donations = await getRecords("donations")
    const sponsorships = await getRecords("sponsorships")

    const completedDonations = donations.filter((d: any) => d.status === "completed" && d.donationMode !== "anonymous")
    const activeSponsors = sponsorships.filter((s: any) => s.status === "active")

    const topDonors = completedDonations
      .map((d: any) => ({
        name: d.name,
        email: d.email,
        totalAmount: d.currency === "NGN" ? d.amount / 1500 : d.amount,
        currency: "USD",
        type: "donor"
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 10)

    const topSponsors = activeSponsors
      .map((s: any) => ({
        name: s.sponsorName,
        email: s.sponsorEmail,
        totalAmount: s.currency === "NGN" ? s.amount / 1500 : s.amount,
        currency: "USD",
        type: "sponsor"
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 10)

    return NextResponse.json({ 
      success: true, 
      hallOfFame: {
        topDonors,
        topSponsors
      }
    })
  } catch (error) {
    console.error("Error fetching hall of fame:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
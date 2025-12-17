import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const donations = await getRecords("donations")
    const filteredDonations = donations.filter((d: any) => d.status === "completed")

    const byPillar = {
      skills: {
        amount: filteredDonations.filter((d: any) => d.program === "skills")
          .reduce((sum: number, d: any) => sum + d.amount, 0),
        count: filteredDonations.filter((d: any) => d.program === "skills").length,
      },
      education: {
        amount: filteredDonations.filter((d: any) => d.program === "education")
          .reduce((sum: number, d: any) => sum + d.amount, 0),
        count: filteredDonations.filter((d: any) => d.program === "education").length,
      },
      sports: {
        amount: filteredDonations.filter((d: any) => d.program === "sports")
          .reduce((sum: number, d: any) => sum + d.amount, 0),
        count: filteredDonations.filter((d: any) => d.program === "sports").length,
      },
    }

    return NextResponse.json({ success: true, byPillar })
  } catch (error) {
    console.error("Error fetching donations by pillar:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get("dateRange") || "all"
    const pillar = searchParams.get("pillar")

    const donations = await getRecords("donations")
    const sponsorships = await getRecords("sponsorships")

    let allTransactions = [
      ...donations.map((d: any) => ({ ...d, type: "donation" })),
      ...sponsorships.map((s: any) => ({ ...s, type: "sponsorship", program: "mixed" }))
    ]

    if (pillar && pillar !== "all") {
      allTransactions = allTransactions.filter((t: any) => t.program === pillar)
    }

    const completedTransactions = allTransactions.filter((t: any) => 
      t.status === "completed" || t.status === "active"
    )

    const totalAmount = completedTransactions.reduce((sum: number, t: any) => {
      const amountInUSD = t.currency === "NGN" ? t.amount / 1500 : t.amount
      return sum + amountInUSD
    }, 0)

    const byPillar = {
      skills: completedTransactions.filter((t: any) => t.program === "skills")
        .reduce((sum: number, t: any) => sum + (t.currency === "NGN" ? t.amount / 1500 : t.amount), 0),
      education: completedTransactions.filter((t: any) => t.program === "education")
        .reduce((sum: number, t: any) => sum + (t.currency === "NGN" ? t.amount / 1500 : t.amount), 0),
      sports: completedTransactions.filter((t: any) => t.program === "sports")
        .reduce((sum: number, t: any) => sum + (t.currency === "NGN" ? t.amount / 1500 : t.amount), 0),
    }

    const summary = {
      totalAmount,
      totalDonations: completedTransactions.filter((t: any) => t.type === "donation").length,
      totalSponsorships: completedTransactions.filter((t: any) => t.type === "sponsorship").length,
      byPillar,
    }

    return NextResponse.json({ success: true, summary })
  } catch (error) {
    console.error("Error fetching dashboard summary:", error)
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"
import { sendEmail, sendSponsorMatchEmail, sendSponsorshipEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.name || !data.email || !data.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const sponsorshipId = `SPO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const sponsorship = await addRecord("sponsorships", {
      id: sponsorshipId,
      sponsorName: data.name,
      sponsorEmail: data.email,
      sponsorPhone: data.sponsorPhone,
      company: data.company,
      amount: data.totalAmount,
      currency: data.currency,
      paymentMethod:data.paymentMethod,
      boyId: data.boyId,
      rateUsed: data.rateUsed,
      items: data.items ?? [],
      status: data.status || "pending",
      createdAt: new Date().toISOString(),
    })

    console.log("🤝 Sponsorship received:", sponsorship)

    // If boy is assigned, send match email
    if (data.boyId && data.status === "active") {
      const boys = await getRecords("boys", { id: data.boyId })
      if (boys && boys.length > 0) {
        await sendSponsorMatchEmail(sponsorship, boys[0])
      }
    } else {
      // Send thank you email
      await sendSponsorshipEmail( sponsorship, data.email)
    }

    return NextResponse.json({ success: true, sponsorship, sponsorshipId })
  } catch (error) {
    console.error("❌ Sponsorship error:", error)
    return NextResponse.json({ error: "Failed to process sponsorship" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const commitmentLevel = searchParams.get("commitmentLevel")

    let sponsorships = await getRecords("sponsorships")

    if (status) sponsorships = sponsorships.filter((s: any) => s.status === status)
    if (commitmentLevel) sponsorships = sponsorships.filter((s: any) => s.commitmentLevel === commitmentLevel)

    return NextResponse.json({ sponsorships, count: sponsorships.length })
  } catch (error) {
    console.error("Error fetching sponsorships:", error)
    return NextResponse.json({ error: "Failed to fetch sponsorships" }, { status: 500 })
  }
}
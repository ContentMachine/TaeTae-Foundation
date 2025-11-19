import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // ✅ Validate required fields
    if (!data.name || !data.email || !data.program || !data.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ✅ Create sponsorship record
    const sponsorship = await addRecord("sponsorships", {
      ...data,
      createdAt: new Date().toISOString(),
      status: "pending",
    })

    console.log("🎉 Sponsorship created:", sponsorship)

    // ✅ Send thank-you email to sponsor
    if (data.email) {
      await sendEmail(
        data.email,
        "Thank You for Sponsoring a Child 💖",
        `
          <h2>Hello ${data.name},</h2>
          <p>Thank you for your generous sponsorship with <b>Tae tae Foundation</b>!</p>
          <p>You have chosen to support our <b>${data.program}</b> program with an amount of <b>${data.currency || "USD"} ${data.amount}</b>.</p>
          <p>Our team will review and confirm your sponsorship shortly.</p>
          <br/>
          <p>We deeply appreciate your compassion and support in empowering lives.</p>
          <br/>
          <p>Warm regards,</p>
          <p><b>The Tae tae Foundation Team</b></p>
        `
      )
    }

    // ✅ Notify admin (optional)
    if (process.env.ADMIN_EMAIL) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "🎉 New Sponsorship Received",
        `
          <h2>New Sponsorship Alert</h2>
          <p><b>${data.name}</b> has sponsored the <b>${data.program}</b> program.</p>
          <ul>
            <li><b>Email:</b> ${data.email}</li>
            <li><b>Amount:</b> ${data.currency || "USD"} ${data.amount}</li>
            <li><b>Message:</b> ${data.message || "—"}</li>
          </ul>
          <br/>
          <p>Check your admin dashboard for details.</p>
        `
      )
    }

    return NextResponse.json({ success: true, sponsorship })
  } catch (error) {
    console.error("❌ Sponsorship error:", error)
    return NextResponse.json({ error: "Failed to process sponsorship" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sponsorships = await getRecords("sponsorships")
    return NextResponse.json({ sponsorships, count: sponsorships.length })
  } catch (error) {
    console.error(" Error fetching sponsorships:", error)
    return NextResponse.json({ error: "Failed to fetch sponsorships" }, { status: 500 })
  }
}

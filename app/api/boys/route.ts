import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function GET() {
  try {
    const boys = await getRecords("boys")
    return NextResponse.json(boys)
  } catch (error) {
    console.error(" Error fetching boys:", error)
    return NextResponse.json({ error: "Failed to fetch boys" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const boy = await addRecord("boys", {
      ...data,
      growthMetrics: {
        skillsLevel: 1,
        educationScore: 0,
        athleticAbility: 0,
        totalScore: 1,
      },
      sponsor: null,
      joinedDate: new Date().toISOString(),
    })

    // ✅ Send notification email
    if (boy.email) {
      await sendEmail(
        boy.email,
        "Welcome to Tae tae Foundation Program",
        `
          <h2>Hello ${boy.fullName},</h2>
          <p>Welcome to the Tae tae Foundation! 🎉</p>
          <p>We’re excited to have you in the <b>${boy.program}</b> program.</p>
          <p>Your journey toward growth and success starts now.</p>
          <br/>
          <p>Warm regards,</p>
          <p><b>The Tae tae Foundation Team</b></p>
        `
      )
    }

    return NextResponse.json(boy)
  } catch (error) {
    console.error(" Error creating boy profile:", error)
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
  }
}

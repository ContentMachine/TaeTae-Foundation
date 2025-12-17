import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.boy_id || !data.session_date || !data.hours || !data.topic || !data.attendance_status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const boys = await getRecords("boys", { id: data.boy_id })
    if (!boys || boys.length === 0) {
      return NextResponse.json({ error: "Boy not found" }, { status: 404 })
    }

    const sessionId = `SS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const session = await addRecord("skill_sessions", {
      id: sessionId,
      boy_id: data.boy_id,
      skill_id: data.skill_id,
      session_date: data.session_date,
      hours: data.hours,
      topic: data.topic,
      attendance_status: data.attendance_status,
      performance_rating: data.performance_rating,
      mentor_comment: data.mentor_comment,
      conducted_by: data.conducted_by,
      media_urls: data.media_urls || [],
      createdAt: new Date().toISOString(),
    })

    console.log("📝 Session recorded:", session)

    return NextResponse.json({ success: true, session, sessionId })
  } catch (error) {
    console.error("❌ Session recording error:", error)
    return NextResponse.json({ error: "Failed to record session" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const boyId = searchParams.get("boyId")
    const skillId = searchParams.get("skillId")
    const attendance = searchParams.get("attendance")

    let sessions = await getRecords("skill_sessions")

    if (boyId) sessions = sessions.filter((s: any) => s.boy_id === boyId)
    if (skillId) sessions = sessions.filter((s: any) => s.skill_id === skillId)
    if (attendance) sessions = sessions.filter((s: any) => s.attendance_status === attendance)

    sessions.sort((a: any, b: any) => 
      new Date(b.session_date).getTime() - new Date(a.session_date).getTime()
    )

    return NextResponse.json({ sessions, count: sessions.length })
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}
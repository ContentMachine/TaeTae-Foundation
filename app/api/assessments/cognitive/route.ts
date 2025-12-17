import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.boy_id || !data.assessment_date || !data.assessment_source) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const boys = await getRecords("boys", { id: data.boy_id })
    if (!boys || boys.length === 0) {
      return NextResponse.json({ error: "Boy not found" }, { status: 404 })
    }

    const assessmentId = `CA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const assessment = await addRecord("cognitive_assessments", {
      id: assessmentId,
      boy_id: data.boy_id,
      assessment_date: data.assessment_date,
      reading_level: data.reading_level,
      numeracy_level: data.numeracy_level,
      attention_focus_score: data.attention_focus_score,
      memory_score: data.memory_score,
      problem_solving_score: data.problem_solving_score,
      school_exam_average: data.school_exam_average,
      teacher_comment: data.teacher_comment,
      assessment_source: data.assessment_source,
      assessed_by: data.assessed_by,
      media_urls: data.media_urls || [],
      createdAt: new Date().toISOString(),
    })

    console.log("🧠 Cognitive assessment recorded:", assessment)

    return NextResponse.json({ success: true, assessment, assessmentId })
  } catch (error) {
    console.error("❌ Cognitive assessment error:", error)
    return NextResponse.json({ error: "Failed to record assessment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const boyId = searchParams.get("boyId")

    let assessments = await getRecords("cognitive_assessments")

    if (boyId) {
      assessments = assessments.filter((a: any) => a.boy_id === boyId)
      assessments.sort((a: any, b: any) => 
        new Date(b.assessment_date).getTime() - new Date(a.assessment_date).getTime()
      )
    }

    return NextResponse.json({ assessments, count: assessments.length })
  } catch (error) {
    console.error("Error fetching cognitive assessments:", error)
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 })
  }
}

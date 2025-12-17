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

    const assessmentId = `PA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    let bmi = data.bmi
    if (!bmi && data.height_cm && data.weight_kg) {
      const heightInMeters = data.height_cm / 100
      bmi = data.weight_kg / (heightInMeters * heightInMeters)
      bmi = Math.round(bmi * 10) / 10
    }

    const assessment = await addRecord("physical_assessments", {
      id: assessmentId,
      boy_id: data.boy_id,
      assessment_date: data.assessment_date,
      height_cm: data.height_cm,
      weight_kg: data.weight_kg,
      bmi,
      resting_heart_rate: data.resting_heart_rate,
      pushups_count: data.pushups_count,
      situps_count: data.situps_count,
      shuttle_run_time: data.shuttle_run_time,
      coach_comment: data.coach_comment,
      assessment_source: data.assessment_source,
      assessed_by: data.assessed_by,
      media_urls: data.media_urls || [],
      createdAt: new Date().toISOString(),
    })

    console.log("📊 Physical assessment recorded:", assessment)

    return NextResponse.json({ success: true, assessment, assessmentId })
  } catch (error) {
    console.error("❌ Physical assessment error:", error)
    return NextResponse.json({ error: "Failed to record assessment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const boyId = searchParams.get("boyId")

    let assessments = await getRecords("physical_assessments")

    if (boyId) {
      assessments = assessments.filter((a: any) => a.boy_id === boyId)
      assessments.sort((a: any, b: any) => 
        new Date(b.assessment_date).getTime() - new Date(a.assessment_date).getTime()
      )
    }

    return NextResponse.json({ assessments, count: assessments.length })
  } catch (error) {
    console.error("Error fetching physical assessments:", error)
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 })
  }
}
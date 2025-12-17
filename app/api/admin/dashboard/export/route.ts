import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"

    let data: any = {}

    if (type === "all" || type === "donations") {
      data.donations = await getRecords("donations")
    }

    if (type === "all" || type === "sponsorships") {
      data.sponsorships = await getRecords("sponsorships")
    }

    if (type === "all" || type === "boys") {
      data.boys = await getRecords("boys")
    }

    if (type === "all" || type === "assessments") {
      data.physicalAssessments = await getRecords("physical_assessments")
      data.cognitiveAssessments = await getRecords("cognitive_assessments")
    }

    if (type === "all" || type === "sessions") {
      data.sessions = await getRecords("skill_sessions")
    }

    const filename = `taetae-export-${type}-${new Date().toISOString().split('T')[0]}.json`

    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error exporting data:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
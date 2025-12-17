import { type NextRequest, NextResponse } from "next/server"
import { addRecord, getRecords } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.name || !data.pillar) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const skillId = `SK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const skill = await addRecord("skills", {
      id: skillId,
      name: data.name,
      pillar: data.pillar,
      description: data.description,
      level_structure: data.level_structure,
      createdAt: new Date().toISOString(),
    })

    console.log("🎯 Skill created:", skill)

    return NextResponse.json({ success: true, skill, skillId })
  } catch (error) {
    console.error("❌ Skill creation error:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pillar = searchParams.get("pillar")

    let skills = await getRecords("skills")

    if (pillar) skills = skills.filter((s: any) => s.pillar === pillar)

    return NextResponse.json({ skills, count: skills.length })
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

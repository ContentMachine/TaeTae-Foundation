import { type NextRequest, NextResponse } from "next/server"
import { getRecords } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const boyId = searchParams.get("boyId")
    const uploadType = searchParams.get("uploadType")
    const uploadedBy = searchParams.get("uploadedBy")

    let media = await getRecords("media")

    if (boyId) media = media.filter((m: any) => m.boyId === boyId)
    if (uploadType) media = media.filter((m: any) => m.uploadType === uploadType)
    if (uploadedBy) media = media.filter((m: any) => m.uploadedBy === uploadedBy)

    media.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ 
      success: true, 
      media, 
      count: media.length 
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

